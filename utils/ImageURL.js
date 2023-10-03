export const toImageUrl = (filePath) => {
  const baseUrl = "https://api.hadielearning.com"; // Replace with your backend server URL
  // https://api.hadielearning.com/
  return `${baseUrl}/${filePath.replace(/\\/g, "/")}`;
};
