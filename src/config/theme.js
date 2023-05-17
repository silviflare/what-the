import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      // main: "#548cfa",
      main: "#000",
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
    MuiListItem: {
      styleOverrides: {
        root: {
          marginBottom: 4,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          background: "#fafafa",
        },
      },
    },
  },
});
