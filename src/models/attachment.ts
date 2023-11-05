import {
    VkAudioAttachment,
    VkPhotoAttachment,
    VkVideoAttachment,
} from '@/shared/vk-api.ts';

export type MediaAttachment =
    | PhotoAttachmentI
    | AudioAttachmentI
    | VideoAttachmentI;

export class PhotoAttachment implements PhotoAttachmentI {
    type = 'photo' as const;
    photo: {
        id: number;
        url: string;
    };

    constructor(attach: VkPhotoAttachment) {
        let photoUrl;
        // Find one of the sizes: o, p, q, r
        for (const size of attach.photo.sizes) {
            if (['o', 'p', 'q', 'r'].includes(size.type)) {
                photoUrl = size.url;
            }
        }

        // If none of the sizes is found, use the first one
        if (!photoUrl) {
            photoUrl = attach.photo.sizes[0].url;
        }

        this.photo = {
            id: attach.photo.id,
            url: photoUrl,
        };
    }
}

export interface PhotoAttachmentI {
    type: 'photo';
    photo: {
        id: number;
        url: string;
    };
}

export class AudioAttachment implements AudioAttachmentI {
    type = 'audio' as const;
    audio: {
        id: number;
        url: string;
    };

    constructor(attach: VkAudioAttachment) {
        this.audio = attach.audio;
    }
}

export interface AudioAttachmentI {
    type: 'audio';
    audio: {
        id: number;
        url: string;
    };
}

export class VideoAttachment implements VideoAttachmentI {
    type = 'video' as const;
    video: {
        id: number;
        playerUrl: string;
    };

    constructor(attach: VkVideoAttachment) {
        this.video = {
            id: attach.video.id,
            playerUrl: attach.video.player,
        };
    }
}

export interface VideoAttachmentI {
    type: 'video';
    video: {
        id: number;
        playerUrl: string;
    };
}
