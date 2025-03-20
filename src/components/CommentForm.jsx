import { useState } from "react";
import { createComment } from "../utils/api";

const CommentForm = ({post}) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const handleCreateComment = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await createComment(post.id, content);
            setSuccess("Comment sent.");
            setContent("");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div className=" my-4 py-4">
            <form 
            onSubmit={handleCreateComment}
            className="flex flex-col gap-4 "
            >
                <textarea 
                name="content" 
                id="content" 
                placeholder="Leave a comment..."
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-24 resize-none bg-zinc-300 dark:bg-zinc-700 rounded-md p-2"
                required
                ></textarea>
                <button 
                type="submit"
                className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in w-fit"
                >SEND</button>
            </form>
        </div>
    )
}

export default CommentForm