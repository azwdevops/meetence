// special characters
const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// function to validate password
exports.validatePassword = (password) => {
  // return message and status
  if (password.length < 8) {
    //password length
    return ["Password must be at least 8 characters", false];
  } else if (!/\d/.test(password)) {
    // password must contain a number
    return ["Password must contain a number", false];
  } else if (!specialCharacters.test(password)) {
    // password must contain a special character
    return ["Password must contain a special character", false];
  } else if (!/[A-Z]/.test(password)) {
    // password must contain an uppercase letter
    return ["Password must contain an uppercase letter", false];
  } else {
    // if it passes all tests
    return ["", true];
  }
};
