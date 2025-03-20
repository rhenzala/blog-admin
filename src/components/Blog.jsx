import { useState } from "react";
import { MessageSquare } from 'lucide-react';
import Comment from "./Comment";

const Blog = ({post, user}) => {
    const [showMore, setShowMore] = useState(false);
    const handleMoreClick = () => {
        setShowMore(!showMore);
    }
    return (
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-lg p-4 my-2">
            <p className="flex gap-4 mb-4">
                <span className="font-medium text-sm">{post.author.username}</span>
                <span className="font-light text-sm">{new Date(post.updatedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}</span>
            </p>
            <h3 className="text-xl font-bold mb-1">{post.title}</h3>
            <p className="mb-8">{post.content}</p>
            <div className="border-t border-zinc-700 pt-2">
                <button 
                onClick={handleMoreClick}
                aria-label="Show or hide comments"
                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-sm px-2 py-1 rounded-md hover:bg-blue-500/20 hover:text-blue-500  hover:cursor-pointer focus:bg-blue-500/20 focus:text-blue-500  transition delay-200 ease-in"
                >
                    <MessageSquare size={16}/>
                </button>
            </div>
            {showMore && <Comment post={post} user={user} />}
        </div>
    )
}

export default Blog