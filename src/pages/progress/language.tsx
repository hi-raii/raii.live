import React, { PropsWithChildren, useState} from 'react'
import Airtable, { FieldSet, Record} from "airtable";
import AttachmentDto from "../../types/AttachmentDto";
import {
  Box,
  BoxProps,
  Button,
  Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalOverlay,
  SimpleGrid,
  useBreakpointValue, useDisclosure,
  useToken,
  Link as ChakraLink, HStack, Center,  Stack, Text
} from "@chakra-ui/react";
import ReactMarkdown from 'react-markdown'
import MotionBox from '@components/MotionBox';
import NextImage, {ImageProps} from "next/image"
import ChakraExternalLink from "@components/ChakraExternalLink";
import useViewPortHeight from "@lib/utils/useViewPortHeight";

type Props = React.PropsWithChildren<{
  languages: LanguageItem[]
}>

const startOfUrl = "https://purecatamphetamine.github.io/country-flag-icons/3x2/";

export default function Progress({languages}: Props): JSX.Element {
  // console.log(countries)
  return (
    <Box p={10}>
      <SimpleGrid columns={1} spacing={10}>
        {languages.map((language, idx) => {
          // @ts-ignore
          return (
            <AnimatedCard
              key={idx}
              initialDelay={idx * 0.5}
            >
              <Center key={idx} position={"relative"}>
                <Box width={"300px"} height={"200px"}>
                  <Box
                    position={"absolute"}
                    borderRadius={12}
                    overflow={"hidden"}
                    width={"300px"}
                    height={"200px"}
                  >
                    <NextImage
                      width={300}
                      height={200}
                      src={startOfUrl + language.countryCode + ".svg"}
                    />
                  </Box>
                  <Box
                    maxW={"100%"}
                    position={"absolute"}
                    borderRadius={12}
                    overflow={"hidden"}
                    bg={"rgba(0,0,0,0.5)"}
                  >
                    <Box w={300} h={200}/>
                  </Box>
                  <Center
                    color={"white"}
                    position={"relative"}
                    height={"200px"}
                    fontSize={30}
                    fontWeight={700}
                  >
                    <Stack justifyContent={"center"} >
                      <Text>
                        {language.name}
                      </Text>
                      {/*<Center>*/}
                      {/*  <Box w={10} h={10} bg={"red"} borderRadius={"full"}/>*/}
                      {/*</Center>*/}
                    </Stack>
                  </Center>
                </Box>
              </Center>
            </AnimatedCard>
          )
        })}
      </SimpleGrid>
    </Box>
  );
}

export async function getStaticProps() {
  Airtable.configure({apiKey: process.env.AIRTABLE_API_KEY})
  const base = Airtable.base(process.env.AIRTABLE_BASE_ID!)
  const table = base.table("language_progress");
  const result = await table.select({sort: [{field: "Order", direction: "asc"}]}).all()
  console.log(result)
  const languages = result.map(mapItemRecordToLanguageItem).filter(x => x)

  console.log(languages)
  return {
    props: {
      languages
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    revalidate: 60 * 60, // In seconds
  }
}

type LanguageItem = {
  linkUrl: string | null
  imageAttachment: AttachmentDto
  description: string | null
  date: string | null,
  countryCode: string
}

function mapItemRecordToLanguageItem({fields}: Record<FieldSet>): any {
  if (fields["PAUSED"]) {
    return null
  }
  const progress = Number(fields["Progress"]);
  const redPercent = 1 - progress
  const colorProgress = `rgb(${redPercent},${0},${redPercent})`
  return {
    name: fields["Name"],
    countryCode: fields["CountryCode"],
    colorProgress: fields["Progress"],
    beginDate: fields["BeginDate"] || null,
  }
}


function AnimatedCard({children, initialDelay, ...props}: PropsWithChildren<{ initialDelay: any } & BoxProps>) {
  const [delay, setDelay] = useState(initialDelay);

  function onAnimationComplete() {
    setDelay(0);
  }

  return (
    // @ts-ignore
    <MotionBox
      {...props}
      onAnimationComplete={onAnimationComplete}
      whileHover={{
        scale: 1.01,
        translateY: -5,
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{delay}}
    >
      {children}
    </MotionBox>
  )
}

function CardButtonModal({art: {linkUrl, description, imageAttachment: {url: imageUrl}}}: { art: LanguageItem }) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const vh = useViewPortHeight();
  const [radiiMd] = useToken(
    // the key within the theme, in this case `theme.colors`
    'radii',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['md'],
    // a single fallback or fallback array matching the length of the previous arg
  )
  const [space5] = useToken(
    // the key within the theme, in this case `theme.colors`
    'space',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['5'],
    // a single fallback or fallback array matching the length of the previous arg
  )

  return (
    <>
      <Button
        onClick={onOpen}
        w={"100%"}
        h={"100%"}
        position={"absolute"}
        opacity={0}
        _hover={{
          opacity: 1
        }}
      >
        {description && (
          <Box
            position={"absolute"}
            bottom={0}
            borderRadius={`0 0 ${radiiMd} ${radiiMd}`}
            p={2}
            pt={1}
            bg={"rgba(0,0,0,0.5)"}
            w={"100%"}
            h={"calc(1.2rem + 2 * 4px)"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
          >
            <ReactMarkdown components={{
              a: "strong"
            }}>
              {description}
            </ReactMarkdown>
          </Box>
        )}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent bg={"raii.black"} maxW={"100vw"} h={`calc(${vh(100)} - 2 * ${space5})`} m={space5}>

          {linkUrl ? (
            <ChakraLink isExternal href={linkUrl} variant={"reset"}>
              <CardImage src={imageUrl} objectFit={"contain"} sizes={"100vw"}/>
            </ChakraLink>
          ) : (
            <CardImage src={imageUrl} objectFit={"contain"} sizes={"100vw"}/>
          )}
          <ModalCloseButton/>
          {description && (
            <Box
              position={"absolute"}
              bottom={0}
              bg={"rgba(0,0,0,0.5)"}
              w={"100%"}
              borderRadius={`0 0 ${radiiMd} ${radiiMd}`}
              p={2}
            >
              {/*@ts-ignore*/}
              <ReactMarkdown position={"absolute"} components={{
                a: ChakraExternalLink
              }}>
                {description}
              </ReactMarkdown>
            </Box>
          )}
          <ModalBody>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}

function CardImage({...props}: ImageProps) {
  const sizes = useBreakpointValue({
    base: "calc((100vw - 2 * 40px) / 1)",
    md: "calc((100vw - 3 * 40px) / 2)",
    lg: "calc((100vw - 5 * 40px) / 3)"
  })

  return (
    <Box
      as={NextImage}
      quality={100}
      borderRadius={"md"}
      objectFit={"cover"}
      layout="fill"
      sizes={sizes}
      {...props}
    />
  )
}