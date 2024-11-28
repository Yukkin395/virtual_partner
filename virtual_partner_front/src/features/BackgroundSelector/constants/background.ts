const imageModules = import.meta.glob("/public/background/*.{jpg,jpeg,png}", {
  eager: true,
  as: "url",
});

export const backgrounds = Object.values(imageModules).map((url) => ({
  path: url.replace("/public", ""),
  alt: "背景",
}));
