// Assignment Code
let generateBtn = document.querySelector("#generate");

let passwordRules = {
  minPasswordLength: 8,
  maxPasswordLength: 128,
  passwordLength: 0,
  isLowercase: true,
  isUppercase: true, 
  isNumeric: true, 
  isSpecialCharacters: true,

  validateLength: function() {
    if (this.passwordLength<this.minPasswordLength || this.passwordLength>this.maxPasswordLength){
      return false;
    }
    return true;
  },

  validateCharType: function() {
    return (this.isLowercase || this.isUppercase || this.isNumeric || this.isSpecialCharacters); 
  }
}

let passwordChars = ["0123456789","!#$%&'()*+,-./:;<=>?@[\]^_`{|}~","abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  if (password!=null && password.length>=passwordRules.minPasswordLength){
    passwordText.value = password;
  }

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Selects the character type random from the available types
function getCharType () {
  let charType = Math.floor(Math.random() * 4);

  if (charType === 0 && !passwordRules.isNumeric){
    return getCharType();
  } else if (charType === 1 && !passwordRules.isSpecialCharacters){
    return getCharType();
  } else if (charType === 2 && !passwordRules.isLowercase){
    return getCharType();
  } else if (charType === 3 && !passwordRules.isUppercase){
    return getCharType();
  }
  return charType;
}

// Generated a password applying the rules
function generatePassword() {
  let password = "";
  let puserChoice = prompt("Please specify the password length"); 
  let numbers = /^[0-9]+$/;
  if (puserChoice==null || !puserChoice.match(numbers)){
    alert("Wrong entry! Please enter a numeric value.");
    return "";
  } 
  passwordRules.passwordLength = parseInt(puserChoice);
  if (!passwordRules.validateLength()) {
    alert("Wrong entry! Please enter a number between 8 and 128.");
    return "";
  }
  passwordRules.isLowercase = confirm("Will the password contain lowercase letters?");
  passwordRules.isUppercase = confirm("Will the password contain uppercase letters?");
  passwordRules.isNumeric = confirm("Will the password contain numbers?");
  passwordRules.isSpecialCharacters = confirm("Will the password contain special characters?");

  if (!passwordRules.validateCharType()){
    alert("Wrong entry! At least one character thype should be selected.");
    return "";
  }

  while (password.length<passwordRules.passwordLength) {
    let charType = getCharType();
    password = password + passwordChars[charType][Math.floor(Math.random(0) * passwordChars[charType].length)];
  } 

  return password;
}


