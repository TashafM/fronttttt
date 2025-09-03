import moment from 'moment';

/**
 * Convert UTC datetime string to IST formatted string
 * @param {string} utcDate - UTC date string (e.g., "2025-08-03T11:35:21.417Z")
 * @returns {string} - IST formatted string (e.g., "2025-08-03 05:05:21 PM")
 */
export default function convertToIST(utcDate) {
  return moment(utcDate).utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss A");
}
