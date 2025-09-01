const { encryptFile, decryptFile, convertToCSV, convertFromCSV } = require('./services/cryptService');

(async () => {
  try {
    const result = await encryptFile('C:\\Users\\vsharma061324\\Desktop\\projects\\data-anonymiser\\backend\\tmp\\sample-data.parquet');
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();