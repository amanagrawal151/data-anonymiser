const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = process.env.CRYPTO_SECRET_KEY || 'default_secret_key_32byteslong!';
const IV_LENGTH = 16;


const encrypt = (text) => {
  console.log('[cryptService] Encrypting text:', text ? text.substring(0, 20) + '...' : '');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'utf8'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const result = iv.toString('hex') + ':' + encrypted;
  console.log('[cryptService] Encryption complete.');
  return result;
};


const decrypt = (encrypted) => {
  console.log('[cryptService] Decrypting string:', encrypted ? encrypted.substring(0, 20) + '...' : '');
  const [ivHex, encryptedText] = encrypted.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'utf8'), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  console.log('[cryptService] Decryption complete.');
  return decrypted;
};

module.exports = { encrypt, decrypt };
