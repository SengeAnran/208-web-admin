const proConfig = {
  apiHost: "",
  routerBase: "/",
  isLogin: true,
};

const devConfig = {
  apiHost: "",
  routerBase: "/",
  isLogin: false,
};

const config = process.env.VUE_APP_ENV === "production" ? proConfig : devConfig;

export default config;
