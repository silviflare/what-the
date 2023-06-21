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
  typography: {
    fontSize: "1rem",
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
          cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='44' height='44' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>💥</text></svg>")
          16 0,
        auto`,
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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
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
          // paddingLeft: 18,
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
