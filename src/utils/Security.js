'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function EncryptAES(data, key, iv, algorithm = 'aes-128-cbc') {
    var cipher = null;
    if (iv)
        cipher = crypto.createCipheriv(algorithm, key, iv);
    else
        cipher = crypto.createCipher(algorithm, key);
    var encoded = cipher.update(data, 'utf8', 'base64');
    encoded += cipher.final('base64');
    return encoded;
}
exports.EncryptAES = EncryptAES;
function DecryptAES(data, key, iv, algorithm = 'aes-128-cbc') {
    var decipher = null;
    if (iv)
        decipher = crypto.createDecipheriv(algorithm, key, iv);
    else
        decipher = crypto.createDecipher(algorithm, key);
    var decoded = decipher.update(data, 'base64', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
}
exports.DecryptAES = DecryptAES;
//# sourceMappingURL=Security.js.map