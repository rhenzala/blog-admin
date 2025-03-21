import { useEffect, useState } from "react";
import { fetchComments, deleteComment } from "../utils/api";
import { Pencil, Trash2 } from 'lucide-react';
import EditCommentForm from "./EditCommentForm";
import CommentForm from "./CommentForm";


const Comment = ({ post, user }) => {
    const [comments, setComments] = useState([]);
    const [activeCommentId, setActiveCommentId] = useState(null); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        async function loadComments() {
            const data = await fetchComments(post.id);
            setComments(data);
        }
        loadComments();
    }, []);

    const toggleActive = (commentId) => {
        setActiveCommentId(activeCommentId === commentId ? null : commentId);
    };

    const handleDelete = async (id) => {
        setError(null);
        setSuccess(null);
        try {
            await deleteComment(id);
            setSuccess("Comment deleted.");
            window.location.reload();
        } catch (err) {
            setError(err.message);
        }  
    }

    return (
        <div className="mt-8">
            <div>
                <h2 className="text-xl">Comments ({post.comments.length})</h2>
            </div>
            <CommentForm post={post} />
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    className="bg-transparent mb-4 border-b border-b-zinc-700"
                >
                    <div className="flex justify-between">
                        <p className="flex gap-4">
                            <span className="font-medium text-sm">{comment.author.username}</span>
                            <span className="font-light text-sm">
                                {new Date(comment.updatedAt).toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </p>
                        {user.username === comment.author.username && (
                            <div>
                                <button
                                    onClick={() => toggleActive(comment.id)}
                                    className="bg-transparent text-zinc-700 dark:text-zinc-300 text-sm px-2 py-1 rounded-md hover:bg-green-500/20 hover:text-green-500 hover:cursor-pointer focus:bg-green-500/20 focus:text-green-500 transition delay-200 ease-in"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className="bg-transparent text-zinc-700 dark:text-zinc-300 text-sm px-2 py-1 rounded-md hover:bg-rose-500/20 hover:text-rose-500 hover:cursor-pointer focus:bg-rose-500/20 focus:text-rose-500 transition delay-200 ease-in"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="mb-4">{comment.content}</p>
                    {activeCommentId === comment.id && (
                        <EditCommentForm
                            comment={comment}
                            onClose={() => setActiveCommentId(null)} 
                        />
                    )}
                </div>
            ))}
        </div>
    );
};




export default Comment;