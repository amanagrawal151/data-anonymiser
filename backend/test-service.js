const { encryptFile, decryptFile, convertToCSV, convertFromCSV } = require('./services/cryptService');

(async () => {
  try {
    const result = await decryptFile('C:\\Users\\vsharma061324\\Desktop\\projects\\data-anonymiser\\backend\\files\\mtcars_encrypted.parquet');
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();