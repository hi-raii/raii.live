import {useBreakpointValue} from "@chakra-ui/react";

export function useIsMobileViewport(){
  return useBreakpointValue({base: true, md: false})
}