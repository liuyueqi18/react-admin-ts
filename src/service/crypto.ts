import CryptoJS from "crypto-js";

const secret = "lyq22cyt";

/**
 * 加密
 * @param word
 * @returns
 */
export const cryptoEncrypt = (word: string) => {
  var key = CryptoJS.enc.Utf8.parse(secret);
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/**
 * 解密
 * @param word
 * @returns
 */
export const cryptoDecrypt = (word: string) => {
  var key = CryptoJS.enc.Utf8.parse(secret);
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};
