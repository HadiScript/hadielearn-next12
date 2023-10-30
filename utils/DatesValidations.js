export const validateDates = (fromDateStr, toDateStr, isCurrent) => {
  const currentDate = new Date();
  const fromDate = new Date(fromDateStr);
  const toDate = toDateStr ? new Date(toDateStr) : null;

  if (!fromDateStr) {
    return "From date is required";
  }

  if (!isCurrent && !toDateStr) {
    return "To date is required if not current";
  }

  if (fromDate > currentDate) {
    return "From date cannot be in the future";
  }

  if (toDate && toDate > currentDate) {
    return "To date cannot be in the future";
  }

  if (toDate && fromDate > toDate) {
    return "From date cannot be after To date";
  }

  return null;
};
