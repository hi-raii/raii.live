import React, {useEffect} from 'react'
import {
  Box,
  Drawer, DrawerBody,
  DrawerCloseButton,
  DrawerContent, DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useBreakpointValue,
  useDisclosure,
  Link as ChakraLink
} from "@chakra-ui/react";
import {HiMenu} from "react-icons/hi";
import NextLink from "next/link";
import {BsDiscord, BsGithub, BsInstagram, BsTwitch, BsTwitter} from "react-icons/bs";
import {FormattedMessage} from "react-intl";
import useViewPortHeight from "@lib/utils/useViewPortHeight";
import MotionButton from "@components/motion-button";
import {useRouter} from "next/router";
import {useIsMobileViewport} from "@lib/utils/useIsMobile";

type Props = React.PropsWithChildren<{}>

export default function Layout({children}: Props): JSX.Element {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const vh = useViewPortHeight();
  const isMobileViewport = useIsMobileViewport()
  const router = useRouter()

  function routeChangeStart(){
    console.log("sd")
    onClose();
  }

  useEffect(()=>{
    router.events.on("routeChangeStart", routeChangeStart)
    return ()=>router.events.off("routeChangeStart", routeChangeStart)
  },[])
  return (
    <>
      <Box h={vh(100)} bg={'raii.black'} overflowY={"hidden"}>
        <Flex as={'nav'} h={12} bg={'raii.purple'} p={1}>
          <Flex align={'center'} flex={1} px={1}>
            {isMobileViewport && (
              <IconButton aria-label={"menu"} icon={<HiMenu/>} variant={"raii"} onClick={onOpen}/>
            )}
            <NextLink href={'/'}>
              <a>
                <Text variant={'raii'} d={'inline'} fontSize={18} px={1}>Raii</Text>
              </a>
            </NextLink>
            <Spacer/>
            {!isMobileViewport && (
              <MenuButtons/>
            )}
            <Spacer/>
            <HStack px={1}>
              <ChakraLink isExternal href={'https://twitch.tv/hi_raii'}>
                <IconButton aria-label={'twitch'} icon={<BsTwitch size={20}/>} variant={'raii'} size={'xs'}
                            borderRadius={'full'}/>
              </ChakraLink>
              <ChakraLink isExternal href={'https://twitter.com/_hi_raii'}>
                <IconButton aria-label={'twitter'} icon={<BsTwitter size={20}/>} variant={'raii'} size={'xs'}
                            borderRadius={'full'}/>
              </ChakraLink>
              <ChakraLink isExternal href={'https://instagram.com/_hi_raii'}>
                <IconButton aria-label={'instagram'} icon={<BsInstagram size={20}/>} variant={'raii'} size={'xs'}
                            borderRadius={'full'}/>
              </ChakraLink>
              <ChakraLink isExternal href={'https://github.com/hi-raii'}>
                <IconButton aria-label={'github'} icon={<BsGithub size={20}/>} variant={'raii'} size={'xs'}
                            borderRadius={'full'}/>
              </ChakraLink>
            </HStack>
          </Flex>
        </Flex>{/*nav*/}
        <Box overflow={"auto"} h={`calc(${vh(100)} - 12px * 4)`}>
          {children}
        </Box>
      </Box>


      {/*IS MOBILE*/}
      {isMobileViewport && (
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          // finalFocusRef={btnRef}
        >
          <DrawerOverlay/>
          <DrawerContent
            bg={"raii.purple"} maxW={"fit-content"}>
            <DrawerCloseButton/>
            <DrawerHeader><FormattedMessage id={"raiis_menu"} defaultMessage={"Raii's menu"}/> </DrawerHeader>

            <DrawerBody>
              <MenuButtons/>
            </DrawerBody>

          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}


function MenuButtons() {
  return (
    <>
      <NextLink href={'/arts'}>
        <a>
          <MotionButton size={'sm'} variant={'raii'} whileHover={{scale: 1.1}}>
            <FormattedMessage id={'fan_arts_and_commissions'} defaultMessage={'Fan Arts and commissions'}/>
          </MotionButton>
        </a>
      </NextLink>
      <Spacer/>
      <ChakraLink isExternal href={"https://www.buymeacoffee.com/hi.raii"} variant={'raii'}>
        <MotionButton size={'sm'} variant={'raii'} whileHover={{scale: 1.1}}>
          <FormattedMessage id={'buy_me_a_coffe'} defaultMessage={'Buy me a coffee'}/>
        </MotionButton>
      </ChakraLink>
      <Spacer/>
      <ChakraLink isExternal href={'https://discord.gg/faT2yTXnnX'} variant={'raii'}>
        <MotionButton size={'sm'} variant={'raii'} whileHover={{scale: 1.1}} leftIcon={<BsDiscord/>}>
          Discord Server
        </MotionButton>
      </ChakraLink>
    </>
  )
}