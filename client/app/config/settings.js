import Constants from "expo-constants";
const settings = {
  dev: {
    AXIOS_URL: "http://localhost:4000/api",
  },
  staging: {
    AXIOS_URL: "http://localhost:4000/api",
  },
  production: {
    AXIOS_URL: "http://localhost:4000/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.production;
};

export default getCurrentSettings();
