import AttachmentDto from "../../types/AttachmentDto";
import {Attachment} from "airtable";

export function mapAttachmentToDto(attachment: Attachment): AttachmentDto{
  return {
    url: attachment.url,
    type: attachment.type,
    thumbnails: attachment.thumbnails
  }
}