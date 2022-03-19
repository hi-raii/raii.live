import { Thumbnail} from "airtable";
export type AttachmentDto = {
  url: string
  type: string
  thumbnails?: {
    small: Thumbnail
    large: Thumbnail
    full: Thumbnail
  }
}