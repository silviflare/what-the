import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#7087f7",
    },
    secondary: {
      main: "#FFA552",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          paddingLeft: 20,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          legend: {
            marginLeft: 18,
          },
          borderRadius: 30,
          paddingLeft: 18,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 40,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          background: "#fafafa",
        },
      },
    },
  },
});
