export const inputValidator = (inputType, input) => {
  if (inputType === "phone_number") {
    return parseInt(input);
  }

  if (inputType === "email") {
    if (input.length > 50) {
      return false;
    }
    if (!input.includes("@") || !input.includes(".")) {
      return false;
    }
    return true;
  }

  if (inputType === "password") {
    if (input.length < 4 || input.length > 16) {
      return false;
    }
    return true;
  }

  if (inputType === "text") {
    return true;
  }

  return false;
};

export const keyValidator = (object, keysArray) => {
  const validatedObject = {};
  for (const key of keysArray) {
    if (key in object && object[key] !== "" && object[key] !== undefined) {
      validatedObject[key] = object[key];
    }
  }
  return validatedObject;
};
