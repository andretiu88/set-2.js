/**
 * Set 2
 *
 * This assignment will develop your proficiency with JS's control flows.
 */

/**
 * Shift letter
 *
 * Shift a letter right by the given number.
 * Wrap the letter around if it reaches the end of the alphabet.
 *
 * Examples
 * shiftLetter('A', 0) -> 'A'
 * shiftLetter('A', 2) -> 'C'
 * shiftLetter('Z', 1) -> 'A'
 * shiftLetter('X', 5) -> 'C'
 * shiftLetter(' ', _) -> ' '
 *
 * Note: we use the underscore `_` to denote the presence of a value that is present but irrelevant.
 *
 * @param {string} letter A single uppercase English letter, or a space
 * @param {Number} shift The number by which to shift the letter
 * @returns {string} The letter, shifted appropriately, if a letter, otherwise a space.
 */
function shiftLetter(letter, shift) {
    if (letter === ' ') {
        return ' ';
    }

    // Get the position of the letter in the alphabet (A = 0, B = 1, ..., Z = 25)
    let position = letter.charCodeAt(0) - 65;

    // Shift the position by the given number
    let newPosition = (position + shift) % 26;

    // Convert the new position back to a letter
    let newLetter = String.fromCharCode(newPosition + 65);

    return newLetter;
}


/**
 * Caesar cipher
 *
 * Apply a shift number to a string of uppercase English letters and spaces.
 *
 * @param {string} message A string of uppercase English letters and/or spaces
 * @param {Number} shift The number by which to shift the letters
 * @returns {string} The message, shifted appropriately.
 */
function caesarCipher(message, shift) {
    let result = "";
  
    for (let i = 0; i < message.length; i++) {
      let char = message[i];
  
      if (char === " ") {
        result += char;
      } else {
        let charCode = char.charCodeAt(0);
        let newCharCode = ((charCode - 65 + shift) % 26) + 65;
        result += String.fromCharCode(newCharCode);
      }
    }
  
    return result;
  }
   

/**
 * Shift by letter
 *
 * Shift a letter to the right using the number equivalent of another letter.
 * The shift letter is any letter from A to Z, where A represents 0, B represents 1, ..., Z represents 25.
 *
 * Examples
 * shiftByLetter('A', 'A') -> 'A'
 * shiftByLetter('A', 'C') -> 'C'
 * shiftByLetter('B', 'K') -> 'L'
 * shiftByLetter(' ', _) -> ' '
 *
 * @param {string} letter A single uppercase English letter, or a space
 * @param {string} letterShift A single uppercase English letter
 * @returns {string} The letter, shifted appropriately
 */
function shiftByLetter(letter, letterShift) {

     
        if (letter === ' ') return ' ';
        
        const letterCode = letter.charCodeAt(0) - 65;
        const shiftCode = letterShift.charCodeAt(0) - 65;
        const newCode = (letterCode + shiftCode) % 26;
        
        return String.fromCharCode(newCode + 65);
    }

/**
 * Vigenere cipher
 *
 * Encrypt a message using a keyphrase instead of a static number.
 * Every letter in the message is shifted by the number represented by the respective letter in the key.
 * Spaces are ignored.
 *
 * Example
 * vigenereCipher('A C', 'KEY') -> 'K A'
 *
 * If needed, the keyphrase is extended to match the length of the key.
 * If the key is 'KEY' and the message is 'LONGTEXT', the key will be extended to 'KEYKEYKE'.
 *
 * @param {string} message A string of uppercase English letters and/or spaces
 * @param {string} key A string of uppercase English letters, no spaces. Will not exceed the length of the message.
 * @returns {string} The message, shifted appropriately
 */

function vigenereCipher(message, key) {
    let encryptedMessage = "";
    let keyIndex = 0;
    let alphabetStart = 'A'.charCodeAt(0);
  
    message = message.toUpperCase();
    key = key.toUpperCase();
  
    for (let i = 0; i < message.length; i++) {
      let currentChar = message[i];
  
      if (currentChar >= 'A' && currentChar <= 'Z') {
        let keyChar = key[keyIndex % key.length];
        let shiftAmount = keyChar.charCodeAt(0) - alphabetStart;
  
        let messageCharValue = currentChar.charCodeAt(0) - alphabetStart;
        let newCharValue = (messageCharValue + shiftAmount) % 26;
        let encryptedChar = String.fromCharCode(newCharValue + alphabetStart);
  
        encryptedMessage += encryptedChar;
        keyIndex++;
      } else {
        encryptedMessage += currentChar;
      }
    }
  
    return encryptedMessage;
  }

/**
 * Scytale cipher
 *
 * Encrypts a message by simulating a scytale cipher.
 *
 * A scytale is a cylinder around which you can wrap a long strip of
 *      parchment that contained a string of apparent gibberish. The parchment,
 *      when read using the scytale, would reveal a message due to every nth
 *      letter now appearing next to each other, revealing a proper message.
 * This encryption method is obsolete and should never be used to encrypt
 *      data in production settings.
 *
 * You may read more about the method here:
 *      https://en.wikipedia.org/wiki/Scytale
 *
 * You may follow this algorithm to implement a scytale-style cipher:
 * 1. Take a message to be encoded and a "shift" number.
 *      For this example, we will use "INFORMATION_AGE" as
 *      the message and 3 as the shift.
 * 2. Check if the length of the message is a multiple of
 *      the shift. If it is not, add additional underscores
 *      to the end of the message until it is.
 *      In this example, "INFORMATION_AGE" is already a multiple of 3,
 *      so we will leave it alone.
 * 3. This is the tricky part. Construct the encoded message.
 *      For each index i in the encoded message, use the character at the index
 *      (i // shift) + (len(message) // shift) * (i % shift) of the raw message.
 *      If this number doesn't make sense, you can play around with the cipher at
 *       https://dencode.com/en/cipher/scytale to try to understand it.
 * 4. Return the encoded message. In this case,
 *      the output should be "IMNNA_FTAOIGROE".
 *
 * Example
 * scytaleCipher('INFORMATION_AGE', 3) -> 'IMNNA_FTAOIGROE'
 * scytaleCipher('INFORMATION_AGE', 4) -> 'IRIANMOGFANEOT__'
 * scytaleCipher('ALGORITHMS_ARE_IMPORTANT', 8) -> 'AOTSRIOALRH_EMRNGIMA_PTT'
 *
 * @param {string} message A string of uppercase English letters and underscores. Underscores represent spaces.
 * @param {number} shift A positive integer that does not exceed the length of the message
 */
function scytaleCipher(message, shift) {
    let length = message.length;
    if (length % shift !== 0) {
        let extraChars = shift - (length % shift);
        message += '_'.repeat(extraChars);
    }

    let encodedMessage = '';

    let numRows = message.length / shift;

    for (let i = 0; i < message.length; i++) {
        let rowIndex = parseInt(i / shift);
        let colIndex = i % shift;
        let newIndex = rowIndex + numRows * colIndex;
        encodedMessage += message[newIndex];
    }

    return encodedMessage;
}

/**
 * Scytale decipher
 *
 * Decrypts a message that was originally encrypted with the `scytaleCipher` function above.
 *
 * Example:
 * scytaleDecipher('IMNNA_FTAOIGROE', 3) -> 'INFORMATION_AGE'
 * scytaleDecipher('AOTSRIOALRH_EMRNGIMA_PTT', 8) -> 'ALGORITHMS_ARE_IMPORTANT'
 * scytaleDecipher('IRIANMOGFANEOT__', 4) -> 'INFORMATION_AGE_'
 *
 * @param {string} message A string of uppercase English letters and underscores. Underscores represent spaces.
 * @param {Number} shift A positive integer that does not exceed the length of the message
 */
function scytaleDecipher(message, shift) {
    const numRows = Math.floor(message.length / shift);
    let result = Array(message.length).fill('');

    for (let index = 0; index < message.length; index++) {
        const column = index % shift;
        const row = Math.floor(index / shift);

        const newIndex = column * numRows + row;
        result[newIndex] = message[index];
    }

    return result.join('');
}
