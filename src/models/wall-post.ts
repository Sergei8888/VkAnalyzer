import {
    AudioAttachment,
    MediaAttachment,
    PhotoAttachment,
    VideoAttachment,
} from '@/models/attachment.ts';
import { VkWallPost } from '@/shared/vk-api.ts';

export class WallPost implements WallPostI {
    id: number;
    date: string;
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
        this.date = new Date(wallPost.date * 1000).toLocaleDateString('en-GB');
        this.text = wallPost.text;
        this.comments = wallPost.comments ?? { count: 0 };
        this.likes = wallPost.likes ?? { count: 0 };
        this.reposts = wallPost.reposts ?? { count: 0 };
        this.views = wallPost.views ?? { count: 0 };
        this.attachments = [];
        for (const attachment of wallPost.attachments) {
            switch (attachment.type) {
                case 'photo':
                    this.attachments.push(new PhotoAttachment(attachment));
                    break;
                case 'audio':
                    this.attachments.push(new AudioAttachment(attachment));
                    break;
                case 'video':
                    this.attachments.push(new VideoAttachment(attachment));
                    break;
            }
        }
    }
}

export interface WallPostI {
    id: number;
    date: string;
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
