import Constants from "expo-constants";
const settings = {
  dev: {
    AXIOS_URL: "https://congenial-resell-backend.onrender.com/api",
  },
  staging: {
    AXIOS_URL: "https://congenial-resell-backend.onrender.com/api",
  },
  production: {
    AXIOS_URL: "https://congenial-resell-backend.onrender.com/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.production;
};

export default getCurrentSettings();
