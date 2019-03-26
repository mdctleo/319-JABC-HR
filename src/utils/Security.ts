'use strict';

import * as crypto from 'crypto';

/**
 * Encrypt data with the provided key and iv (Initialization vector)
 * The default algorithm is 'aes-128-cbc'
 *
 * @param {string} data Data to be encrypted
 * @param {string} key Key to encrypt the data
 * @param {string} iv Initialization vector of the algorithm
 * @param {string} [algorithm='aes-128-cbc'] Algorithm to process the data
 * @returns
 */
export function EncryptAES(data: string, key: string, iv?: string, algorithm='aes-128-cbc'){
    var cipher = null
    if(iv)
        cipher = crypto.createCipheriv(algorithm, key, iv)
    else
        cipher = crypto.createCipher(algorithm, key)
    var encoded = cipher.update(data,'utf8','base64')
    encoded += cipher.final('base64')
    return encoded
}

/**
 * Decrypt data with the provided key and iv (Initialization vector)
 * The default algorithm is 'aes-128-cbc'
 *
 * @param {string} data Data to be decrypted
 * @param {string} key Key to decrypt the data
 * @param {string} iv Initialization vector of the algorithm
 * @param {string} [algorithm='aes-128-cbc'] Algorithm to process the data
 * @returns
 */
export function DecryptAES(data: string, key: string, iv?: string, algorithm='aes-128-cbc'){
    var decipher = null;
    if(iv)
        decipher = crypto.createDecipheriv(algorithm, key, iv)
    else
        decipher = crypto.createDecipher(algorithm, key)
    var decoded = decipher.update(data,'base64','utf8')
    decoded += decipher.final('utf8')
    return decoded
}