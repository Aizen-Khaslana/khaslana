import { usePage, Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import UnusedNavLayout from "@/layouts/unused-nav-layout";

interface SharedProps {
    auth:  {
        user: {
            id: number;
            name: string;
        } | null;
    };
}

interface User {
    id: number;
    name: string;
    avatar?: string;
}

interface PostImage {
    id: number;
    post_id: number;
    image: string;
}

interface PostLike {
    id: number;
    user_id: number;
    post_id: number;
}

interface CommentLike {
    id: number;
    comment_id: number;
    user_id: number;
}

interface Comment {
    id: number;
    user: {
        id: number;
        name: string;
    }
    post_id: number;
    comment: string;
    comment_likes: CommentLike[];
    is_liked: boolean;
    created_at: string;
}

interface Post {
    id: number;
    user_id: number;
    umkm_id?: number | null;
    content: string;
    post_date: string;
    created_at: string;

    user: User;
    post_images: PostImage[];
    post_likes: PostLike[];
    comments?: Comment[];
    is_liked: boolean;
}

interface MyPostsProps {
    posts: Post[];
}

export default function MyPosts() {
    const { auth } = usePage().props as unknown as SharedProps;
    const currentUser = auth.user;

    const { posts } = usePage().props as unknown as MyPostsProps;

    return (
        <UnusedNavLayout backHref="/community">
            <section className="community-header flex justify-between w-full pb-10 max-md:pb-5 gap-2">
                <h2 className="text-[#99ff33] font-medium text-2xl md:text-5xl">Kelola Postingan Anda</h2>
                <Link href="/community/create-post"
                    className="bg-[#99FF33] flex gap-2 items-center border border-[#99FF33] py-2.5 px-5 font-medium cursor-pointer rounded-[20px] text-black hover:bg-transparent hover:text-[#99ff33] transition-all duration-200">
                    <Plus />
                    Buat Postingan
                </Link>
            </section>
            {posts && posts.length > 0 ? (
                posts.map((post) => {
                    const isMyPost = currentUser && post.user_id === currentUser.id;

                    return isMyPost && (
                        <div key={post.id}
                            className="">
                                <p>{post.content}</p>
                        </div>
                    )
                })
            ) : (
                <p>Anda belum pernah membuat postingan di komunitas :(</p>
            )}
        </UnusedNavLayout>
    )
}