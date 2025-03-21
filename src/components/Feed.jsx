import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { fetchPosts } from "../utils/api";
import { useNavigate } from "react-router-dom"; 
import CreatePostForm from "./CreatePostForm";

const Feed = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); 
    const handleClick = (postId) => {
        navigate(`/${postId}`); 
    };
    
    useEffect(() => {
        async function loadPosts() {
            const data = await fetchPosts();
            setPosts(data);
        }
        loadPosts();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl">Posts</h2>
                <button
                    type="submit"
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in"
                >
                    Create a Post
                </button>
            </div>
            {isOpen && <CreatePostForm isOpen={isOpen} setIsOpen={setIsOpen} />}
            
            {posts.map((post) => (
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
                        className="text-3xl font-semibold tracking-tight mb-4 hover:text-blue-500 hover:cursor-pointer"
                    >
                        {post.title}
                    </h3>
                    <div className="border-t border-zinc-700 pt-2 flex justify-between">
                        <button 
                            onClick={() => handleClick(post.id)}
                            aria-label="Show or hide comments"
                            className="bg-transparent text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded-md hover:bg-blue-500/20 hover:text-blue-500 hover:cursor-pointer focus:bg-blue-500/20 focus:text-blue-500 transition delay-200 ease-in flex gap-1 items-center"
                        >
                            <MessageSquare size={16}/>
                            <span>{post.comments.length} {post.comments.length > 1 ? "Comments" : "Comment"}</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Feed;
