import React, {PropsWithChildren, useState} from 'react'
import Airtable, {Attachment, FieldSet, Record} from "airtable";
import AttachmentDto from "../../types/AttachmentDto";
import {mapAttachmentToDto} from "@lib/utils/attachment";
import {
  Box,
  BoxProps,
  Button,
  Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalOverlay,
  SimpleGrid,
  useBreakpointValue, useDisclosure,
  useToken,
  Link as ChakraLink
} from "@chakra-ui/react";
import ReactMarkdown from 'react-markdown'
import MotionBox from '@components/MotionBox';
import NextImage, {ImageProps} from "next/image"
import ChakraExternalLink from "@components/ChakraExternalLink";
import useViewPortHeight from "@lib/utils/useViewPortHeight";

type Props = React.PropsWithChildren<{
  arts: Item[]
}>


export default function Index({arts}: Props): JSX.Element {
  return (
    <Box p={10}>
      <SimpleGrid columns={[1, null, 2, 3]} spacing={10}>
        {arts.map((art, idx) => (
          <AnimatedCard
            key={idx}
            initialDelay={idx * 0.5}

            pos={"relative"}
            w={"100%"}
            pb={"100%"}
          >
            <CardImage src={art.imageAttachment.url}/>
            <CardButtonModal art={art}/>
          </AnimatedCard>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export async function getStaticProps() {
  Airtable.configure({apiKey: process.env.AIRTABLE_API_KEY})
  const base = Airtable.base(process.env.AIRTABLE_BASE_ID!)
  const table = base.table("fan_arts&commisions");
  const result = await table.select().all()
  const arts = result.map(mapItemRecordToItem)

  return {
    props: {
      arts
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    revalidate: 60 * 60, // In seconds
  }
}

type Item = {
  linkUrl: string | null
  imageAttachment: AttachmentDto
  description: string | null
  date: string | null
}

function mapItemRecordToItem({fields}: Record<FieldSet>): Item {
  const attachments = fields["Image"] as Attachment[];
  return {
    linkUrl: fields["Link"] ? fields["Link"] as string : null,
    imageAttachment: mapAttachmentToDto(attachments[0]),
    description: fields["Description"] as string || null,
    date: fields["Date"] ? fields["Date"] as string : null
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

function CardButtonModal({art: {linkUrl, description, imageAttachment: {url: imageUrl}}}: { art: Item }) {
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
          ): (
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