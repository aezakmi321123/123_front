import { i18n } from '../main.js';
export const cardInput = value => {
  // Remove non-numeric characters
  const numericOnly = value.replace(/\D/g, '');

  // Group the numeric value into sets of 4 characters
  const groupedValue = numericOnly.match(/.{1,4}/g);

  // Create the "#### #### #### ####" format
  const formatted = groupedValue ? groupedValue.join(' ') : '';

  // Check if the input matches the required format
  if (formatted.length >= 19) {
    // If it matches, do not allow further input
    return formatted.substring(0, 19);
  }

  return formatted;
};

export const parseCard = value => {
  return value.replace(/\D/g, '');
};

export const validateInput = (rule, value, callback) => {
  // Convert the number value to a string
  const stringValue = String(value);

  // Remove non-numeric characters
  const numericOnly = stringValue.replace(/\D/g, '');

  // Group the numeric value into sets of 4 characters
  const groupedValue = numericOnly.match(/.{1,4}/g);

  // Create the "#### #### #### ####" format
  const formatted = groupedValue ? groupedValue.join(' ') : '';

  // Check if the input matches the required format
  if (
    formatted.length === 19 &&
    /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/.test(formatted)
  ) {
    callback();
  } else {
    callback(new Error(i18n.t('errors.format')));
  }
};

export const validateCryptoAddress = (rule, value) => {
  return new Promise((resolve, reject) => {
    // Convert the value to a string
    const stringValue = String(value).trim();

    // Example: Regular expression for a generic cryptocurrency address
    // This regex allows alphanumeric characters, hyphens, and underscores
    // It assumes a minimum length of 25 and a maximum length of 50 (modify as needed)
    const cryptoAddressRegex = /^[a-zA-Z0-9-_]{25,50}$/;

    if (cryptoAddressRegex.test(stringValue)) {
      resolve();
    } else {
      reject(new Error('Invalid cryptocurrency address'));
    }
  });
};
