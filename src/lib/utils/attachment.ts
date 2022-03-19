import {AttachmentDto} from "../../types/attachment-dto";
import {Attachment} from "airtable";

export function mapAttachmentToDto(attachment: Attachment): AttachmentDto{
  return {
    url: attachment.url,
    type: attachment.type,
    thumbnails: attachment.thumbnails
  }
}