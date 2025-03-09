// Validation utility functions

/**
 * Validate an email address
 * @param email Email to validate
 * @returns True if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a password
 * @param password Password to validate
 * @returns True if the password is valid (at least 8 characters, with at least one letter and one number)
 */
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate a phone number
 * @param phone Phone number to validate
 * @returns True if the phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  // Simple validation for US phone numbers
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

/**
 * Validate a zip code
 * @param zipCode Zip code to validate
 * @returns True if the zip code is valid
 */
export const isValidZipCode = (zipCode: string): boolean => {
  // US zip code validation
  const zipCodeRegex = /^\d{5}(-\d{4})?$/;
  return zipCodeRegex.test(zipCode);
};

/**
 * Validate a credit card number
 * @param cardNumber Credit card number to validate
 * @returns True if the credit card number is valid
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  // Remove spaces and dashes
  const sanitized = cardNumber.replace(/[\s-]/g, '');

  // Check if it contains only digits and has a valid length
  if (
    !/^\d+$/.test(sanitized) ||
    sanitized.length < 13 ||
    sanitized.length > 19
  ) {
    return false;
  }

  // Luhn algorithm (mod 10)
  let sum = 0;
  let double = false;

  // Start from the right
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i));

    if (double) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    double = !double;
  }

  return sum % 10 === 0;
};

/**
 * Validate a CVV
 * @param cvv CVV to validate
 * @returns True if the CVV is valid
 */
export const isValidCVV = (cvv: string): boolean => {
  // 3 or 4 digits
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};

/**
 * Validate a name
 * @param name Name to validate
 * @returns True if the name is valid
 */
export const isValidName = (name: string): boolean => {
  // At least 2 characters, letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[A-Za-z\s'-]{2,}$/;
  return nameRegex.test(name);
};

/**
 * Validate required fields
 * @param fields Object with field values
 * @returns Object with field validation errors
 */
export const validateRequiredFields = (
  fields: Record<string, string>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.entries(fields).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      errors[key] = 'This field is required';
    }
  });

  return errors;
};
