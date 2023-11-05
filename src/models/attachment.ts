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
        fullSizeUrl: string;
    };

    constructor(attach: VkPhotoAttachment) {
        this.photo = {
            id: attach.photo.id,
            fullSizeUrl: attach.photo.photo_604,
        };
    }
}

export interface PhotoAttachmentI {
    type: 'photo';
    photo: {
        id: number;
        fullSizeUrl: string;
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
