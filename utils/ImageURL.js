export const toImageUrl = (filePath) => {
  const baseUrl = "http://localhost:5000"; // Replace with your backend server URL
  return `${baseUrl}/${filePath.replace(/\\/g, "/")}`;
};
