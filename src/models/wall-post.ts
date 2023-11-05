import {
    AudioAttachment,
    MediaAttachment,
    PhotoAttachment,
    VideoAttachment,
} from '@/models/attachment.ts';
import { VkWallPost } from '@/shared/vk-api.ts';

export class WallPost implements WallPostI {
    id: number;
    date: number;
    text: string;
    comments: {
        count: number;
    };
    likes: {
        count: number;
    };
    reposts: {
        count: number;
    };
    views: {
        count: number;
    };
    attachments: MediaAttachment[];
    constructor(wallPost: VkWallPost) {
        this.id = wallPost.id;
        this.date = wallPost.date;
        this.text = wallPost.text;
        this.comments = wallPost.comments;
        this.likes = wallPost.likes;
        this.reposts = wallPost.reposts;
        this.views = wallPost.views;
        this.attachments = wallPost.attachments.map((attach) => {
            switch (attach.type) {
                case 'photo':
                    return new PhotoAttachment(attach);
                case 'audio':
                    return new AudioAttachment(attach);
                case 'video':
                    return new VideoAttachment(attach);
            }
        });
    }
}

export interface WallPostI {
    id: number;
    // unixtime
    date: number;
    text: string;
    comments: {
        count: number;
    };
    likes: {
        count: number;
    };
    reposts: {
        count: number;
    };
    views: {
        count: number;
    };
    attachments: MediaAttachment[];
}
