export const toImageUrl = (filePath) => {
  // const baseUrl = "https://api.hadielearning.com";
  const baseUrl = "http://localhost:5000";
  // https://api.hadielearning.com/
  return `${baseUrl}/${filePath.replace(/\\/g, "/")}`;
};
