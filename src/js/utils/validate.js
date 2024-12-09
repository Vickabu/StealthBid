const validations = {
  name: {
    pattern: /^[\w]+$/,
    maxLength: 20,
    errorMessage: "Please enter a username using only letters and numbers",
  },
  email: {
    pattern: /^[\w\-.]+@(stud\.)?noroff\.no$/,
    errorMessage: "Please enter a valid noroff.no or stud.noroff.no address",
  },
  password: {
    minLength: 8,
    errorMessage: "Password must be at least 8 characters long.",
  },
  confirmPassword: {
    matches: "password",
    errorMessage: "Passwords must match",
  },

  title: {
    minLength: 1,
    maxLength: 280,
    errorMessage: "Title must be between 1 and 280 characters.",
  },
  description: {
    maxLength: 280,
    errorMessage: "Description cannot be longer than 280 characters.",
  },
  tags: {
    maxLength: 8,
    maxTagLength: 24,
    errorMessage:
      "Tags cannot exceed 8 items, and each tag must be less than 24 characters.",
  },
  media: {
    maxLength: 8,
    errorMessage: "You cannot have more than 8 media items.",
  },
};

export function validateField(value, type, referenceValue) {
  const validationRules = validations[type];
  if (!validationRules) {
    throw new Error(`Unknown field type: ${type}`);
  }

  if (validationRules.pattern && !validationRules.pattern.test(value)) {
    throw new Error(validationRules.errorMessage);
  }

  if (validationRules.minLength && value.length < validationRules.minLength) {
    throw new Error(validationRules.errorMessage);
  }

  if (validationRules.maxLength && value.length > validationRules.maxLength) {
    throw new Error(validationRules.errorMessage);
  }

  if (validationRules.maxTagLength && Array.isArray(value)) {
    if (value.some((tag) => tag.length > validationRules.maxTagLength)) {
      throw new Error(validationRules.errorMessage);
    }
  }

  if (validationRules.matches && value !== referenceValue) {
    throw new Error(validationRules.errorMessage);
  }

  if (type === "media" && Array.isArray(value)) {
    if (value.length > validationRules.maxLength) {
      throw new Error(validationRules.errorMessage);
    }
    value.forEach((item, index) => {
      if (!item.url || !item.alt) {
        throw new Error(
          `Each media item (at index ${index}) must have both a url and alt text.`
        );
      }
    });
  }
}
