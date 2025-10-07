import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        base: "96px",
        menu: "66px",
      },
      borderWidth: {
        profile: "4px",
      },
      colors: {
        background: {
          secondary: "#fff",
          primary2: "#F2F2F2",
          primary: "#E5E5E5",
          tertiary: "#D7D6D6",
          main: "#F5AC22",
          main0: "#0d0026",
          main2: "#0b0239",
          main3: "#201269",

          danger: "#F00000",

          shadow: "#021b707d",

          ERROR: "#D32F2F",
          NEW: "#F5AC22",
          ACTIVE: "#388E3C",
          BLOQUED: "#D32F2F",
          NOTFOUND: "#A9A9A9",
          USER: "#bc6600bf",
          ADMIN: "#0d0026",

          hover: {
            main: "#f5ac225c",
            secondary: "#f5f5f5",
          },
        },
        color: {
          main: "#F5AC22",
          primary: "#000",
          secondary: "#0006",
          secondary2: "#0009",
          reverse: "#fff",
          danger: "#F00000",
        },
        border: {
          main: "#F5AC22",
          main2: "#0b0239",
          main3: "#201269",
          primary: "#000",
          secondary: "#0006",
          tertiary: "#D7D6D6",
          reverse: "#fff",
          shadow: "#021b707d",

          danger: "#F00000",
        },
      },
    },
  },
  plugins: [],
};
export default config;
