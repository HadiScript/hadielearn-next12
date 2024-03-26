export const SlugToTitle = (slug) => {
  const words = slug?.split("-");

  const title = words?.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return title;
};
