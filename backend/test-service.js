const { encryptFile, decryptFile, convertToCSV, convertFromCSV } = require('./services/cryptService');

(async () => {
  try {
    const result = await decryptFile('C:\\Users\\vsharma061324\\Desktop\\projects\\data-anonymiser\\backend\\tmp\\1756758358585_sample-data_encrypted.csv');
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();