import { Thumbnail} from "airtable";
type AttachmentDto = {
  url: string
  type: string
  thumbnails?: {
    small: Thumbnail
    large: Thumbnail
    full: Thumbnail
  }
}

export default AttachmentDto