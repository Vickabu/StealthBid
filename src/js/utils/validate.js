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
    maxLength: 100,
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
  endsAt: {
    validate: (value) => {
      const now = new Date();
      const deadline = new Date(value);
      return deadline > now;
    },
    errorMessage: "Deadline must be a valid future date.",
  },
  media: {
    maxLength: 8,
    errorMessage: "You cannot have more than 8 media items.",
  },
};

/**
 * Validates a field's value against predefined rules based on its type.
 * Checks for pattern matching, length constraints, reference value matching,
 * and custom validation. Returns an error message if validation fails, or `null` if valid.
 *
 * @param {string|Array} value - The value to validate, either a string or array (for tags/media).
 * @param {string} type - The field type (e.g., "email", "password", "tags", "media").
 * @param {string} [referenceValue] - (Optional) A reference value for comparison (e.g., "confirmPassword").
 *
 * @returns {string|null} - Error message or `null` if valid.
 *
 * @example
 * const error = validateField("myemail@example.com", "email");
 * if (error) console.log("Validation failed:", error);
 */

export function validateField(value, type, referenceValue) {
  const validationRules = validations[type];
  if (!validationRules) {
    return `Unknown field type: ${type}`;
  }

  if (validationRules.pattern && !validationRules.pattern.test(value)) {
    return validationRules.errorMessage;
  }

  if (validationRules.minLength && value.length < validationRules.minLength) {
    return validationRules.errorMessage;
  }

  if (validationRules.maxLength && value.length > validationRules.maxLength) {
    return validationRules.errorMessage;
  }

  if (validationRules.maxTagLength && Array.isArray(value)) {
    if (value.some((tag) => tag.length > validationRules.maxTagLength)) {
      return validationRules.errorMessage;
    }
  }

  if (validationRules.matches && value !== referenceValue) {
    return validationRules.errorMessage;
  }

  if (validationRules.validate && !validationRules.validate(value)) {
    return validationRules.errorMessage;
  }

  if (type === "media" && Array.isArray(value)) {
    if (value.length > validationRules.maxLength) {
      return validationRules.errorMessage;
    }
    value.forEach((item, index) => {
      if (!item.url || !item.alt) {
        return `Each media item (at index ${index}) must have both a url and alt text.`;
      }
    });
  }

  return null;
}
