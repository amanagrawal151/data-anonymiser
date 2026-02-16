const { encryptFile, decryptFile, convertToCSV, convertFromCSV } = require('./services/cryptService');

(async () => {
  try {
    const filePath = 'C:\\Users\\vsharma061324\\OneDrive - GROUP DIGITAL WORKPLACE\\Desktop\\projects\\data-anonymiser\\backend\\tmp\\sample-data.parquet';
    const columns = ["birthdate", "gender"];
    const result = await encryptFile(filePath, columns);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();