import Constants from "expo-constants";
const settings = {
  dev: {
    AXIOS_URL: "http://localhost:4000/api",
  },
  staging: {
    AXIOS_URL: "https://congenial-resell-backend.onrender.com",
  },
  production: {
    AXIOS_URL: "https://congenial-resell-backend.onrender.com",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.production;
};

export default getCurrentSettings();
