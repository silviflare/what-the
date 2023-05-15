import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ff9100",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 40,
          paddingRight: 40,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          paddingLeft: 24,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          legend: {
            marginLeft: 20,
          },
          borderRadius: 30,
          paddingLeft: 18,
        },
      },
    },
    /* MuiMenu: {
      styleOverrides: {
        root: {
          left: -18,
        },
      },
    }, */
  },
});
