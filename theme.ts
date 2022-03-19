import {extendTheme} from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    // heading: 'Pixer, sans-serif',
    // body: 'Pixer, sans-serif',
  },
  config: {
    initialColorMode: 'dark',
  },
  colors: {
    "raii.darkpurple": "#493b6e",
    "raii.purple": "#8c74d2",
    "raii.green": "#008864",
    "raii.lightgreen": "#00b989",
    "raii.black": "#1b1c1e"
  },
  components: {
    Text: {
      variants:{
        "raii":{
          fontFamily: "Pixer, sans-serif"
        }
      }
    },
    Button: {
      baseStyle: {
        _focus: {
          // boxShadow: "0 0 0 3px var(--chakra-colors-raii-green)",
          boxShadow: "none",
        }
      },
      variants: {
        "raii": {
          // color: "raii.green"
          _hover: {
            color: "raii.darkpurple"
          },
        }
      }
    },
    Link: {
      variants: {
        "reset":{
          _focus: {
            boxShadow: "none"
          }
        },
        "raii": {
          _hover: {
            textDecoration: "!important none",
          }
        },
        "raii.external": {
          color: "raii.lightgreen",
        }
      }
    }
  }
})


export default theme