import type {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from 'next'
import {getLocaleServerSide, useLocale} from '@lib/locale';
import useViewPortHeight from '@lib/utils/useViewPortHeight';
import {Box, Center, Flex, Icon, Text} from '@chakra-ui/react';
import raiiPngCloseMouthImg from "@assets/img/raii_close_mouth.png"
import MotionImage from "@components/MotionImage";
import MotionBox from "@components/MotionBox";
import {useCallback, useEffect, useRef, useState} from "react";
import initialPngAnimation from "@animations/intial_png_animation.json"
import AnimationItem from "../types/AnimationItem";
import {motion} from "framer-motion"
import {vh} from "style-value-types";
import {useIsMobileViewport} from "@lib/utils/useIsMobile";
import {IoBalloonOutline} from "react-icons/io5";
import emojis from "@lib/emojis.json"
import {debounce} from "@lib/utils/debounce";
import {FormattedMessage, IntlProvider} from "react-intl";

const lastValidEmoji = 1530;

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({messages}) => {
  const vh = useViewPortHeight();
  const locale = useLocale();
  const [currentAnimation, setCurrentAnimation] = useState(-1);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Box position={"relative"} h={`calc(${vh(100)} - ${12 * 4}px)`} overflow={"hidden"}>
        <AnimatedPng animationCallback={(idx: number) => {
          setCurrentAnimation(idx)
        }}/>
        <AnimatedText currentAnimation={currentAnimation}/>
      </Box>
    </IntlProvider>
  )
}

function AnimatedPng({animationCallback}: { animationCallback: Function }) {
  delete raiiPngCloseMouthImg.blurDataURL;
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [hoverStarted, setHoverStarted] = useState<number>(Date.now);
  const [hoverEnded, setHoverEnded] = useState<number>(Date.now);
  const [animate, setAnimate] = useState({})
  const [randomEmoji, setRandomEmoji] = useState(null)
  const animationEndedRef = useRef(false);
  const clearEmojiDelayed = useCallback(debounce(() => setRandomEmoji(null), 2000), [])

  function jump() {
    if (!animationEndedRef.current) {
      return;
    }
    setRandomEmojiTemporary()
    setAnimate({translateY: 0})
    setTimeout(() => setAnimate({translateY: 50}), 200)
  }

  function setRandomEmojiTemporary() {
    // @ts-ignore
    setRandomEmoji(emojis[Math.ceil(Math.random() * lastValidEmoji + 1)])
    clearEmojiDelayed();
  }

  function startAnimation() {
    if (!animationEndedRef.current) {
      // @ts-ignore
      runAnimation(initialPngAnimation, 0)
    }
  }

  function runAnimation(animation: AnimationItem[], idx: number) {
    if (animation[idx]) {
      const currentAnimationItem = animation[idx];
      setTimeout(() => {
        animationCallback(idx)
        setAnimate(currentAnimationItem.animate);
        runAnimation(animation, idx + 1)
      }, currentAnimationItem.delay)
    } else {
      animationEndedRef.current = true;
    }
  }

  useEffect(() => {
    if (hoverStarted <= Date.now() && hoverEnded < hoverStarted) {
      jump()
    }
  }, [hoverStarted, hoverEnded])

  useEffect(() => {
    if (!loaded && imageRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      startAnimation()
    }
  }, [loaded])

  return (
    <Box
      pos={"absolute"}
      h={500}
      w={500}
      bottom={0}
    >
      <MotionImage
        ref={imageRef}
        onLoad={(a) => setLoaded(true)}
        {...raiiPngCloseMouthImg}
        onClick={jump}
        w={500}
        h={500}
        maxH={"100%"}
        objectFit={"cover"}
        pos={"absolute"}
        initial={{
          translateY: 50,
          scaleX: -1
        }}
        animate={animate}
        onHoverStart={() => setHoverStarted(Date.now)}
        onHoverEnd={() => setHoverEnded(Date.now)}
      />
      {randomEmoji && (
        <MotionBox
          key={randomEmoji}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          pos={"absolute"}
          right={20}
          top={20}
        >
          <Box pos={"relative"}>
            <Icon
              as={IoBalloonOutline}
              color={"raii.green"}
              transform={"scaleX(-1)"}
              w={12}
              h={12}
            />
            <Center pos={"absolute"} top={0} w={"100%"} fontSize={20}>
              {randomEmoji}
            </Center>
          </Box>
        </MotionBox>
      )}
    </Box>
  )
}

function AnimatedText({currentAnimation}: { currentAnimation: number }) {
  const vh = useViewPortHeight()
  const isMobileViewport = useIsMobileViewport()


  return (
    <Flex
      h={vh(50)}
      p={2}
      alignItems={isMobileViewport ? "top" : "center"}
      justifyContent={isMobileViewport ? "center" : "end"}
    >
      <Text
        color={"raii.green"}
        fontSize={20}
        variant={"raii.bungee"}
        align={"center"}
      >
        <motion.span
          initial={{
            opacity: 0
          }}
          animate={currentAnimation >= 0 && {
            opacity: 1
          }}
        >
          <FormattedMessage id={"hi"} defaultMessage={"Hi,"}/>
        </motion.span>
        <motion.span
          initial={{
            opacity: 0
          }}
          animate={currentAnimation >= 3 && {
            opacity: 1
          }}
        >
          <FormattedMessage id={"my_name_is_raii"} defaultMessage={" call me Raii!"}/>
        </motion.span>
        <br/>

        <motion.span
          initial={{
            opacity: 0
          }}
          animate={currentAnimation >= 6 && {
            opacity: 1
          }}
        >
          <FormattedMessage id={"im_a_vtuber"} defaultMessage={"I'm a VTuber"}/>
        </motion.span>
        <motion.span
          initial={{
            opacity: 0
          }}
          animate={currentAnimation >= 8 && {
            opacity: 1
          }}
        >
          <FormattedMessage id={"who_does_live"} defaultMessage={" who does live"}/>
        </motion.span>
        <motion.span
          initial={{
            opacity: 0
          }}
          animate={currentAnimation >= 10 && {
            opacity: 1
          }}
        >
          <FormattedMessage id={"on_twitch"} defaultMessage={" on Twitch"}/>
        </motion.span>
        <br/>
        <motion.span
          initial={{
            opacity: 0
          }}
          animate={currentAnimation >= 12 && {
            opacity: 1
          }}
        >
          <FormattedMessage id={"welcome"} defaultMessage={"Welcome"}/>
        </motion.span>

        <motion.span
          initial={{
            opacity: 0
          }}
          animate={currentAnimation >= 14 && {
            opacity: 1
          }}
        >
          <FormattedMessage id={"to_my_website"} defaultMessage={" to my website!"}/>
        </motion.span>
      </Text>
    </Flex>
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
      "hi": "Olá,",
      "my_name_is_raii": " meu nome é Raii!",
      "im_a_vtuber": "Sou um VTuber",
      "who_does_live": " que faz live",
      "on_twitch": " no site roxo.",
      "welcome": "Bem vindo(a)",
      "to_my_website": " ao meu website!"
    }
    ,
    en: {
      'page_title':
        'Raii VTuber',
    }
  }


