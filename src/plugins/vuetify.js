import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md",
  },
  theme: {
    themes: {
      light: {
        primary: "#3D405B",
        secondary: "#EFEFEF",
        accent: "#D62828",

        redTask: "#FF4F3F",
        greenTask: "#23BE9F",
        yellowTask: "#ECD27E",
        blueTask: "#4EADBC",
        greyTask: "#484D59",
        purpleTask: "#513B56",
        orangeTask: "#FF9F1C"
      },
    },
  },
});
