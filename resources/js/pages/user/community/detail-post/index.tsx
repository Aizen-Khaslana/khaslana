import { usePage, router } from '@inertiajs/react';
import { ThumbsUp, MessageCircleMore, Trash, SendHorizontal } from "lucide-react";
import { useState } from 'react';
import ProfileIcon from "@/assets/icons/default-profile.png";
import UnusedNavLayout from '@/layouts/unused-nav-layout';


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

interface Comment {
    id: number;
    post_id: number;
    comment: string;
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

interface DetailProps {
    post: Post;
}

export default function DetailPost() {
    const { auth } = usePage().props as unknown as SharedProps;
    const currentUser = auth.user;

    const { post } = usePage().props as unknown as DetailProps;

    const isMyPost = currentUser && post.user_id === currentUser.id;

    const [commentText, setCommentText] = useState('');

    const [isUploaded, setIsUploaded] = useState(false);

    const handleLike = (postId: number) => {
        router.post(`/community/${postId}/like`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Toggle like sukses!");
            },
            onError: (err) => {
                console.error("Gagal melakukan like: ", err);
            }
        })
    }

    const handleDeletePost = (postId: number) => {
        if (confirm('Yakin ingin menghapus postingan ini?')) {
            router.delete(`/community/${postId}`);
        }
    };

    const handleSubmitComment = () => {
        if (!commentText.trim()) {
            alert("Komentar tidak boleh kosong!")
            return;
        }

        router.post(`/community/${post.id}/comment`, {
            comment: commentText,
        }, {
            forceFormData: true,
            onSuccess: () => {
                setCommentText("");
                setIsUploaded(true);

                setTimeout(() => {
                    setIsUploaded(false);
                    router.visit(`/community/${post.id}`, {
                        preserveScroll: false
                    })
                }, 3000)
            }
        })
    }

    return (
        <UnusedNavLayout backHref='/community'>
            <div className='flex gap-10 justify-between'>
                <div key={post.id} className="post-card w-full flex flex-3 flex-col gap-4 bg-[#222] p-6 rounded-[15px]">
                    <div className="flex flex-col gap-4">
                        <div className="post-profile flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="post-avatar">
                                    <img src={ProfileIcon} alt="Profile" className="avatar w-10 h-10 rounded-full object-cover" />
                                </div>
                                <div className="post-user flex flex-col">
                                    <h6 className="text-white font-medium text-lg">{post.user?.name || "Anggota Khaslana"}</h6>
                                    <p className="text-[#888] text-sm">
                                        {post.post_date ? new Date(post.post_date).toLocaleDateString('id-ID', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        }) : "Baru saja"}
                                    </p>
                                </div>
                            </div>
                            {isMyPost && (
                                <button onClick={() => handleDeletePost(post.id)}
                                    className="post-options h-full justify-start flex hover:text-[#99ff33] cursor-pointer">
                                    <Trash className="w-4"/>
                                </button>
                            )}
                        </div>

                        <div className="post-content flex flex-col gap-5 text-[#adaaaa] font-normal">
                            <p className="text-md whitespace-pre-line">{post.content}</p>
                            
                            {post.post_images && post.post_images.map((imgData) => (
                                <img 
                                    key={imgData.id}
                                    src={`/storage/${imgData.image}`} 
                                    alt="Post Content" 
                                    className="w-full max-w-sm h-auto rounded-xl" 
                                />
                            ))}
                        </div>
                    </div>

                    <div className="post-btn mt-2.75">
                        <div className="post-options flex gap-4 items-center bg-transparent text-[#adaaaa] cursor-pointer">
                            <button type="button" onClick={() => handleLike(post.id)} className={`post-opt-btn flex items-center gap-2 text-sm cursor-pointer transition-all duration-100 ${post.is_liked ? 'text-[#99ff33]' : ''}`}>
                                <ThumbsUp className={`w-4 h-4`} /> 
                                {post.post_likes.length}
                            </button>
                            <button className="post-opt-btn flex items-center gap-2 text-sm">
                                <MessageCircleMore className="w-4 h-4"/>
                                {post.comments?.length}
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col flex-2 gap-7'>
                    <h2 className='text-3xl text-[#99ff33]'>Komentar</h2>

                    <div className="relative flex flex-col items-center w-full">        
                        {isUploaded &&  (
                            <div className="w-full bg-[#99FF33]/20 border border-[#99FF33] text-[#99FF33] p-4 rounded-[15px] text-sm font-medium">Postingan berhasil diupload!</div>
                        )}
            
                        <div className="create-comment flex justify-between w-full bg-[#222] p-5 gap-10 rounded-[15px]">
                            <div className="post-top flex items-center gap-5">
                                <img src={ProfileIcon} alt="Profile" className="w-10 max-md:w-7" />
                                <input type="text" placeholder="Bagikan komentar Anda..." className="main-input flex flex-1 bg-transparent border-0 outline-0 text-white"
                                value={commentText} 
                                onChange={(e) => setCommentText(e.target.value)}/>
                            </div>
                            <button onClick={() => handleSubmitComment()}>
                                <SendHorizontal />
                            </button>
                        </div>
                    </div>

                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <div key={comment.id}>
                                {comment.comment}
                            </div>
                        ))
                    ) : (
                        <p className='w-full text-center text-white/40'>Belum ada komentar</p>
                    )}
                </div>
            </div>
        </UnusedNavLayout>
    );
}
