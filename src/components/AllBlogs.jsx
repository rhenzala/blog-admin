import {  useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { BookOpen, MessageSquare } from "lucide-react";
import Comment from "./Comment";

const AllBlogs = ({post, user}) => {
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate(); 
    
    const handleClick = (postId) => {
        navigate(`/${postId}`); 
    };
    const handleMoreClick = () => {
        setShowMore(!showMore);
    }
        
    return (
        <div key={post.id} className="bg-zinc-200 dark:bg-zinc-800 rounded-lg p-4 my-4">
            <p className="flex gap-4 mb-2">
                <span className="font-medium text-sm">{post.author.username}</span>
                <span className="font-light text-sm">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}
                </span>
            </p>
            <h3 
                onClick={() => handleClick(post.id)}
                className="text-3xl font-semibold tracking-tight mb-4 hover:text-blue-500 hover:cursor-pointer w-fit text-ellipsis"
            >
                {post.title}
            </h3>
            <div className="border-t border-zinc-700 pt-2 flex gap-4">
                <button 
                    onClick={handleMoreClick}
                    aria-label="Show or hide comments"
                    className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-blue-500/20 hover:text-blue-500 hover:cursor-pointer focus:bg-blue-500/20 focus:text-blue-500 transition delay-200 ease-in flex gap-1 items-center outline-none"
                >
                    <MessageSquare size={16}/>
                    <span>{post.comments.length} {post.comments.length > 1 ? "Comments" : "Comment"}</span>
                </button>
                <button 
                    onClick={() => handleClick(post.id)}
                    aria-label="Show or hide comments"
                    className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-blue-500/20 hover:text-blue-500 hover:cursor-pointer focus:bg-blue-500/20 focus:text-blue-500 transition delay-200 ease-in flex gap-1 items-center outline-none"
                >
                    <BookOpen size={16}/>
                    <span>Read</span>
                </button>
            </div>
            {showMore && <Comment post={post} user={user} />}
        </div>
    )
}

export default AllBlogs