import { useState, useEffect } from "react";
import { MessageSquare, BookPlus, BookCheck, CircleX, FilePenLine } from 'lucide-react';
import Comment from "./Comment";
import { deletePost, fetchPostById, updatePostStatus } from "../utils/api";
import EditPostForm from "./EditPostForm";
import { useParams } from "react-router-dom";

const Blog = ({user}) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isPublished, setIsPublished] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    const handlePublish = () => {
        setIsPublished(!isPublished);
        updatePostStatus(post.id, isPublished)
    }
    const handleDelete = async (id) => {
        setError(null);
        setSuccess(null);
        try {
            await deletePost(id);
            setSuccess("Post deleted.");
            window.location.reload();
        } catch (err) {
            setError(err.message);
        }  
    }
    useEffect(() => {
        async function loadPost() {
            const data = await fetchPostById(id);
            setPost(data);
        }
        loadPost();
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-lg p-4 my-4">
            <h3 className="text-3xl font-semibold tracking-tight mb-1">{post.title}</h3>
            <p className="flex gap-4 mb-6">
                <span className="font-medium text-sm">{post.author.username}</span>
                <span className="font-light text-sm">Posted on: {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                })}</span>
            </p>
            <p className="mb-8 leading-5">{post.content}</p>
            <div className="border-t border-zinc-700 pt-2 flex justify-between">
                <button 
                aria-label="Show or hide comments"
                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-blue-500/20 hover:text-blue-500  hover:cursor-pointer focus:bg-blue-500/20 focus:text-blue-500  transition delay-200 ease-in flex gap-1 items-center"
                >
                    <MessageSquare size={16}/>
                    <span>Comments</span>
                </button>
                <button 
                onClick={handleOpen}
                aria-label="Show or hide comments"
                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-green-500/20 hover:text-green-500  hover:cursor-pointer focus:bg-green-500/20 focus:text-green-500  transition delay-200 ease-in flex gap-1 items-center"
                >
                    <FilePenLine size={16}/>
                    <span>Edit</span>
                </button>
                <button 
                onClick={handlePublish}
                aria-label="Show or hide comments"
                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-amber-500/20 hover:text-amber-500  hover:cursor-pointer focus:bg-amber-500/20 focus:text-amber-500  transition delay-200 ease-in flex gap-1 items-center"
                >
                    {isPublished ?
                    <>
                    <BookCheck size={16}/>
                    <span>Unpublish</span>
                    </>
                    : 
                    <>
                    <BookPlus size={16}/>
                    <span>Publish</span>
                    </>
                    }
                </button>
                <button 
                onClick={() => handleDelete(post.id)}
                aria-label="Show or hide comments"
                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-rose-500/20 hover:text-rose-500  hover:cursor-pointer focus:bg-rose-500/20 focus:text-rose-500  transition delay-200 ease-in flex gap-1 items-center"
                >
                    <CircleX size={16}/>
                    <span>Remove</span>
                </button>
            </div>
            {isOpen && <EditPostForm isOpen={isOpen} setIsOpen={setIsOpen} post={post} />}
            <Comment post={post} user={user} />
        </div>
    )
}

export default Blog