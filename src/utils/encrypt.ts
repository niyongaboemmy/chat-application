export const encrypt_message = (originalText: string) => {
  let inputString = originalText;
  let outputString: string = "";
  let asciiArr = new Array();
  let atozArr = new Array();
  let encryptedString = new Array();
  if (inputString.length != 0) {
    outputString = "";
    for (let i = 0; i < inputString.length; i++) {
      asciiArr[i] = inputString[i].charCodeAt(0);
    }
    for (let i = 0, code = 65; i < 26; i++, code++) {
      atozArr[i] = String.fromCharCode(code);
    }
    let position = randomIndexFromInterval(0, atozArr.length - 1);
    let positionAscii = atozArr[position].charCodeAt(0);
    for (let i = 0; i < inputString.length; i++) {
      encryptedString[i] =
        parseInt(asciiArr[i]) + parseInt(atozArr[position].charCodeAt(0));
    }
    encryptedString[asciiArr.length] = positionAscii;
    for (let i = 0; i < encryptedString.length; i++) {
      outputString = outputString + String.fromCharCode(encryptedString[i]);
    }
    return outputString;
  } else {
    return "";
  }
};

export const decrypt_message = (cypherText: string) => {
  var plainText: string = "";
  if (cypherText.length != 0) {
    var key = cypherText[cypherText.length - 1];
    var decryptedString = new Array();
    for (let i = 0; i < cypherText.length - 1; i++) {
      decryptedString[i] = cypherText[i].charCodeAt(0) - key.charCodeAt(0);
    }
    for (let i = 0; i < decryptedString.length; i++) {
      plainText = plainText + String.fromCharCode(decryptedString[i]);
    }
    return plainText;
  } else {
    return "";
  }
};

const randomIndexFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
