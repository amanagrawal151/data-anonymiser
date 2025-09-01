const Cryptr = require("cryptr");
const path = require("path");
const fs = require("fs");
const parquet = require("parquets");
const XLSX = require("xlsx");
const axios = require("axios");
const { parse } = require("csv-parse/sync");
const FormData = require("form-data");

const SECRET_KEY =
  process.env.CRYPTO_SECRET_KEY || "default_secret_key_32byteslong!";
const cryptr = new Cryptr(SECRET_KEY);

const encrypt = (text) => {
  return cryptr.encrypt(text);
};

const decrypt = (encrypted) => {
  return cryptr.decrypt(encrypted);
};

const encryptFile = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const conversionPath = await convertToCSV(filePath);

  const csvContent = fs.readFileSync(conversionPath, "utf8");
  const records = parse(csvContent, { skip_empty_lines: true });

  // Extract header and first 10 data rows
  const header = records[0];
  const dataRows = records.slice(1, 11);

  // Build column-wise key-value pairs with Excel-style keys
  const columnData = {};
  header.forEach((_, colIdx) => {
    const colName = getExcelColumnName(colIdx);
    columnData[colName] = dataRows.map((row) => row[colIdx]);
  });

  // Send to FastAPI endpoint
  const payload = columnData;
  try {
    const response = await axios.post(
      "http://localhost:8000/detect-pii",
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // Process the response to get columns with count >= 9
    const colResult = [];
    const data = response.data;
    for (const [col, arr] of Object.entries(data)) {
      if (Array.isArray(arr) && arr.length === 2 && arr[1].count >= 9) {
        colResult.push(col);
      }
    }

    // Encrypt values in columns listed in colResult (except header)
    colResult.forEach((colName) => {
      const colIdx = header.findIndex(
        (_, idx) => getExcelColumnName(idx) === colName
      );
      if (colIdx === -1) return;

      // Encrypt the header text
      const encryptedHeaderMarker = encrypt(SECRET_KEY);
      header[colIdx] = `${encryptedHeaderMarker}:${encrypt(header[colIdx])}`;

      // Encrypt the SECRET_KEY for this column
      const encryptedSecretKey = encrypt(SECRET_KEY);

      // Encrypt each value in that column for all data rows and prefix with encryptedSecretKey
      for (let i = 1; i < records.length; i++) {
        if (records[i][colIdx]) {
          const encryptedValue = encrypt(records[i][colIdx]);
          records[i][colIdx] = `${encryptedSecretKey}:${encryptedValue}`;
        }
      }
    });

    // write the modified records back to a new CSV file
    const newCsvContent = [
      header.join(","),
      ...records.slice(1).map((row) => row.join(",")),
    ].join("\n");
    const encryptedCsvPath = conversionPath.replace(
      /\.csv$/i,
      "_encrypted.csv"
    );
    fs.writeFileSync(encryptedCsvPath, newCsvContent, "utf8");

    const finalEncryptedPath = await convertFromCSV(encryptedCsvPath, ext);

    return {
      colResult,
      encryptedFilePath: finalEncryptedPath,
    };
  } catch (err) {
    throw new Error("Error calling /detect-pii: " + err.message);
  }
};

const convertToCSV = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".parquet") {
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    const response = await axios.post(
      "http://localhost:8000/parquet-to-csv",
      form,
      { responseType: "stream", headers: form.getHeaders() }
    );
    const csvPath = path.join(__dirname, "..", "tmp", `${path.basename(filePath, ".parquet")}.csv`);
    const writer = fs.createWriteStream(csvPath);
    await new Promise((resolve, reject) => {
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    return csvPath;
  }

  if (ext === ".xlsx" || ext === ".xlsm") {
    const csvPath = filePath.replace(/\.(xlsx|xlsm)$/i, ".csv");
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
    fs.writeFileSync(csvPath, csvData, "utf8");
    return csvPath;
  }

  return filePath; // No conversion performed
};

const convertFromCSV = async (filePath, ext) => {
  const csvContent = fs.readFileSync(filePath, "utf8");
  const records = parse(csvContent, { skip_empty_lines: false });
  const header = records[0];
  const dataRows = records.slice(1);

  // Convert to Parquet
  if (ext === ".parquet") {
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    const response = await axios.post(
      "http://localhost:8000/csv-to-parquet",
      form,
      { responseType: "stream", headers: form.getHeaders() }
    );
    const parquetPath = path.join(__dirname, "..", "tmp", `${path.basename(filePath, ".csv")}.parquet`);
    const writer = fs.createWriteStream(parquetPath);
    await new Promise((resolve, reject) => {
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    return parquetPath;
  }

  // Convert to XLSX or XLSM
  if (ext === ".xlsx" || ext === ".xlsm") {
    const xlsxPath = filePath.replace(/\.csv$/i, ext);
    const worksheetData = [header, ...dataRows];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, xlsxPath);
    return xlsxPath;
  }

  // If ext is not supported, return original file path
  return filePath;
};

function getExcelColumnName(n) {
  let name = "";
  while (n >= 0) {
    name = String.fromCharCode((n % 26) + 97) + name;
    n = Math.floor(n / 26) - 1;
  }
  return name.toUpperCase();
}

const decryptFile = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const conversionPath = await convertToCSV(filePath);

  const delimiter = ext === ".tsv" ? "\t" : ",";
  const content = fs.readFileSync(conversionPath, "utf8");
  const records = parse(content, { skip_empty_lines: false, delimiter });

  const header = records[0];
  const result = [];
  const detectedColIndices = [];

  // Detect encrypted columns and decrypt header
  header.forEach((colHeader, idx) => {
    const sepIdx = colHeader.indexOf(":");
    if (sepIdx !== -1) {
      const encryptedKey = colHeader.substring(0, sepIdx);
      const encryptedValue = colHeader.substring(sepIdx + 1);

      let decryptedKey;
      try {
        decryptedKey = decrypt(encryptedKey);
      } catch (e) {
        decryptedKey = null;
      }

      if (decryptedKey === SECRET_KEY) {
        let decryptedValue;
        try {
          decryptedValue = decrypt(encryptedValue);
        } catch (e) {
          decryptedValue = "[DECRYPTION_ERROR]";
        }
        result.push(decryptedValue);
        detectedColIndices.push(idx);
      }
    }
  });

  // Replace encrypted header with decrypted value
  detectedColIndices.forEach((colIdx, i) => {
    header[colIdx] = result[i];
  });

  // Decrypt all values in detected columns (except header)
  for (let i = 1; i < records.length; i++) {
    detectedColIndices.forEach((colIdx) => {
      const cell = records[i][colIdx];
      if (cell && cell.includes(":")) {
        const [encryptedKey, encryptedValue] = cell.split(":");
        let decryptedKey;
        try {
          decryptedKey = decrypt(encryptedKey);
        } catch (e) {
          decryptedKey = null;
        }
        if (decryptedKey === SECRET_KEY) {
          try {
            records[i][colIdx] = decrypt(encryptedValue);
          } catch (e) {
            records[i][colIdx] = "[DECRYPTION_ERROR]";
          }
        }
      }
    });
  }

  // Write the modified records back to a new CSV file
  const newCsvContent = [
    header.join(delimiter),
    ...records.slice(1).map((row) => row.join(delimiter)),
  ].join("\n");
  const decryptedCsvPath = conversionPath
    .replace("_encrypted", "")
    .replace(/(\.csv|\.tsv)$/i, "_decrypted$1");
  fs.writeFileSync(decryptedCsvPath, newCsvContent, "utf8");

  // Convert decrypted CSV back to original format
  const finalDecryptedPath = await convertFromCSV(decryptedCsvPath, ext);

  return {
    decryptedFilePath: finalDecryptedPath,
    decryptedColumns: result,
  };
};

module.exports = {
  encrypt,
  decrypt,
  encryptFile,
  decryptFile,
  convertFromCSV,
  convertToCSV,
};
