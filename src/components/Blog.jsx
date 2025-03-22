import { useState, useEffect } from "react";
import { MessageSquare, BookPlus, BookCheck, CircleX, FilePenLine } from 'lucide-react';
import Comment from "./Comment";
import { deletePost, fetchPostById, updatePostStatus } from "../utils/api";
import EditPostForm from "./EditPostForm";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';

const Blog = ({user}) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isPublished, setIsPublished] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showMore, setShowMore] = useState(true);


    const handleMoreClick = () => {
        setShowMore(!showMore);
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    const handlePublish = () => {
        const newPublishStatus = !isPublished;
        setIsPublished(newPublishStatus);
        updatePostStatus(post.id, newPublishStatus)
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
            setIsPublished(data.published);
        }
        loadPost();
    }, [id]);

    if (!post)  return <p className="text-xl">Loading...</p>

    return (
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-xl p-4 md:p-8 lg:p-12 my-4">
            <h3 className="text-4xl font-bold tracking-tight text-pretty mb-1">{post.title}</h3>
            <p className="flex gap-4 mb-6">
                <span className="font-medium text-sm">{post.author.username}</span>
                <span className="font-light text-sm">Posted on: {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                })}</span>
                <span className="font-light text-sm">Edited on: {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                })}</span>
            </p>
            <div className="mb-8 leading-5">
                <Markdown 
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-semibold my-2">{children}</h3>,
                    ul: ({ children }) => <ul className="list-disc ml-6">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal ml-6">{children}</ol>,
                    li: ({ children }) => <li className="my-1">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-zinc-500 pl-4 italic text-zinc-600 dark:text-zinc-300">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-zinc-200 dark:bg-slate-900 px-2 py-1 my-2 rounded text-zinc-800 dark:text-zinc-400">{children}</code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-slate-900 text-zinc-50 p-4 rounded-lg overflow-x-auto">{children}</pre>
                    ),
                    a: ({ children, href }) => (
                      <a href={href} className="text-blue-500 hover:underline">
                        {children}
                      </a>
                    ),
                  }}
                >
                    {post.content}
                </Markdown>
            </div>
            <div className="border-t border-zinc-700 pt-2 flex justify-between">
                <button 
                onClick={handleMoreClick}
                aria-label="Show or hide comments"
                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-blue-500/20 hover:text-blue-500  hover:cursor-pointer focus:bg-blue-500/20 focus:text-blue-500  transition delay-200 ease-in flex gap-1 items-center outline-none"
                >
                    <MessageSquare size={16}/>
                    <span>{post.comments.length} <span className="hidden sm:inline">{post.comments.length > 1 ? "Comments" : "Comment"}</span></span>
                </button>
                <button 
                onClick={handleOpen}
                aria-label="Show or hide comments"
                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-green-500/20 hover:text-green-500  hover:cursor-pointer focus:bg-green-500/20 focus:text-green-500  transition delay-200 ease-in flex gap-1 items-center outline-none"
                >
                    <FilePenLine size={16}/>
                    <span className="hidden sm:inline">Edit</span>
                </button>
                <button 
                onClick={handlePublish}
                aria-label="Show or hide comments"
                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-amber-500/20 hover:text-amber-500  hover:cursor-pointer focus:bg-amber-500/20 focus:text-amber-500  transition delay-200 ease-in flex gap-1 items-center outline-none"
                >
                    {isPublished ?
                    <>
                    <BookCheck size={16}/>
                    <span className="hidden sm:inline">Unpublish</span>
                    </>
                    : 
                    <>
                    <BookPlus size={16}/>
                    <span className="hidden sm:inline">Publish</span>
                    </>
                    }
                </button>
                <button 
                onClick={() => handleDelete(post.id)}
                aria-label="Show or hide comments"
                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-rose-500/20 hover:text-rose-500  hover:cursor-pointer focus:bg-rose-500/20 focus:text-rose-500  transition delay-200 ease-in flex gap-1 items-center outline-none"
                >
                    <CircleX size={16}/>
                    <span className="hidden sm:inline">Remove</span>
                </button>
            </div>
            {isOpen && <EditPostForm isOpen={isOpen} setIsOpen={setIsOpen} post={post} />}
            {showMore && <Comment post={post} user={user} />}
        </div>
    )
}

export default Blog