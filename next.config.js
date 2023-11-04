module.exports = {
  experimental: {
    optimizeCss: false,
  },
  images: {
    domains: ["api.hadielearning.com"],
  },

  env: {
    JWT_SECRET: "codehaibhaicodehai",
    AWS_SES_USER: "<AWS USER>",
    AWS_SES_PASSWORD: "<AWS SES PASSWORD>",
    CLOUD_NAME: "dvfpbqemp",
    UPLOAD_PRESETS: "yeepthf4",

    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dvfpbqemp/image/upload",
    CLOUDINARY_VIDEO_URL: "https://api.cloudinary.com/v1_1/dvfpbqemp/video/upload",
    CLOUDINARY_ZIP_URL: "https://api.cloudinary.com/v1_1/dvfpbqemp/raw/upload",
    STRIPE_SECRET_KEY: "<STRIPE SECRET KEY>",
    STRIPE_PUBLISHABLE_KEY: "<STRIPE PUBLISHABLE KEY>",
  },
};
