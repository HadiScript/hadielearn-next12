export const validateDates = (fromDateStr, toDateStr, isCurrent) => {
  const currentDate = new Date();
  const fromDate = new Date(fromDateStr);
  const toDate = toDateStr ? new Date(toDateStr) : null;

  const errors = {};

  if (!fromDateStr) {
    errors.from = "";
  }
  if (!isCurrent && !toDateStr) {
    errors.to = ``;
  }

  if (fromDate > currentDate) {
    errors.from = "From date cannot be in the future";
  }
  if (toDate > currentDate) {
    errors.to = "To date cannot be in the future";
  }
  if (toDate && toDate > currentDate) {
    errors.to = "To date cannot be in the future";;
  }
  if (toDate && fromDate > toDate) {
    errors.from = "From date cannot be after To date";
  }

  return errors;
};
