module.exports = {
  expo: {
    name: "Demo",
    slug: "Demo",
    privacy: "public",
    sdkVersion: "34.0.0",
    platforms: ["ios", "android"],
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    extra: {
      apiUrl: process.env.API_URL || "",
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || "",
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || ""
    }
  }
};
