import type { Umkm } from "@/types/umkm";
import type { User } from "@/types/user";

export interface Post {
    id: number;
    user_id: number;
    umkm_id?: number | null;
    content: string;
    post_date: string;
    is_liked: boolean;
    has_comment: boolean;
    created_at: string | null;
    deleted_at: string | null;

    user: User;
    umkm?: Umkm;
    post_images?: PostImage[];
    post_likes: PostLike[];
    comments: Comment[];
}

export interface PostImage {
    id: number;
    image: string;
}

export interface PostLike {
    id: number;
    user_id: number;
    post_id: number;
}

export interface Comment {
    id: number;
    user_id: number;
    post_id: number;
    comment: string;
    is_liked: boolean;
    created_at?: string;

    user: User;
    comment_likes: CommentLike[];
}

export interface CommentLike {
    id: number;
    user_id: number;
    comment_id: number;
}