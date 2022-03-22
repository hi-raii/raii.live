import React from 'react'
import {LinkProps, Link as ChakraLink} from "@chakra-ui/react";

type Props = React.PropsWithChildren<LinkProps>

export default function ChakraExternalLink(props: Props): JSX.Element {
  return (
    <ChakraLink {...props} isExternal variant={"raii.external"}>
      {props.children}
    </ChakraLink>
  );
}