const { grey } = require("@mui/material/colors");




const getDesignTokens = (mode) => ({
  palette: {
    // @ts-ignore
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          ali: {
            main: grey[500],
          },

          favColor: {
            main: grey[300],
          },
        }
      : {
          // palette values for dark mode
          ali: {
            main: "teal",
          },

          favColor: {
            main: grey[600],
          },
        }),
  },
});


export default getDesignTokens;
