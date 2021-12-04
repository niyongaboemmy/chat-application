import CryptoJS from "crypto-js";

// export const encrypt_message = (text: string) => {
//   return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
// };

// export const decrypt_message = (data: string) => {
//   return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
// };

export const encrypt_message = (text: string) => {
  const passphrase = "123";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

export const decrypt_message = (ciphertext: string) => {
  const passphrase = "123";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
