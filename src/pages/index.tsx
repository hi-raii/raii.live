import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from 'next'
import {getLocaleServerSide} from '@lib/locale';
import useViewPortHeight from '@lib/utils/useViewPortHeight';
import {Box} from '@chakra-ui/react';
import raiiPngCloseMouthImg from "@assets/img/raii_close_mouth.png"
import MotionImage from "../components/motion-image";
import {useEffect, useState} from "react";

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({messages}) => {
  const vh = useViewPortHeight();

  return (
    <Box position={"relative"} h={`calc(${vh(100)} - ${12 * 4}px)`} overflow={"hidden"}>
      <AnimatedPng/>
    </Box>
  )
}

function AnimatedPng() {
  const [hoverStarted, setHoverStarted] = useState<number>(Date.now);
  const [hoverEnded, setHoverEnded] = useState<number>(Date.now);
  const isHover = Date.now() >= hoverStarted && hoverEnded < hoverStarted
  const [isJumping, setIsJumping] = useState<boolean>()

  function jump() {
    setIsJumping(true)
    setTimeout(() => setIsJumping(false), 200)
  }

  useEffect(() => {
    if (hoverStarted <= Date.now() && hoverEnded < hoverStarted) {
      jump()
    }
  }, [hoverStarted, hoverEnded])
  return (
    <MotionImage
      {...raiiPngCloseMouthImg}
      onClick={jump}
      w={500}
      h={500}
      maxH={"calc(100% + 50px)"}
      objectFit={"cover"}
      pos={"absolute"}
      bottom={0}
      initial={{
        translateY: "50px",
        scaleX: "-1"
      }}
      animate={{
        translateY: isJumping ? "0px" : "50px",
      }}
      onHoverStart={() => setHoverStarted(Date.now)}
      onHoverEnd={() => setHoverEnded(Date.now)}
    />
  )
}

export default Home

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const messages = messagesPerLocale[getLocaleServerSide(context)] || messagesPerLocale.en
  return {
    props: {messages}, // will be passed to the page component as props
  }
}


const messagesPerLocale:
  {
    [locale
      :
      string
      ]:
      any
  }
  =
  {
    pt: {
      'page_title':
        'VTuber Raii',
      'welcome_message':
        'Bem vindo ao {anchor}'
    }
    ,
    en: {
      'page_title':
        'Raii VTuber',
      'welcome_message':
        'Welcome to {anchor}'
    }
  }


