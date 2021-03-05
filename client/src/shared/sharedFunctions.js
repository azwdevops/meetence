// check if any field in an object is empty
export const ifEmpty = (object) => {
  for (const i in object) {
    if (`${object[i]}` === "") {
      return true;
    }
  }
  return false;
};

// function to reset form values to blank
export const resetFormValues = (object) => {
  for (const i in object) {
    object[i] = "";
  }
};
