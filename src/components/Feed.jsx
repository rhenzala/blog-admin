import { useState, useEffect } from "react";
import { fetchPosts } from "../utils/api";
import CreatePostForm from "./CreatePostForm";
import AllBlogs from "./AllBlogs";


const Feed = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        async function loadPosts() {
            const data = await fetchPosts();
            setPosts(data);
        }
        loadPosts();
    }, []);

    if (!posts)  return <p className="text-xl">Loading...</p>

    return (
        <div className="container mx-auto">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl">Posts</h2>
                <button
                    type="submit"
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in focus:outline-1 dark:focus:outline-zinc-100 focus:outline-zinc-700"
                >
                    Create a Post
                </button>
            </div>
            {isOpen && <CreatePostForm isOpen={isOpen} setIsOpen={setIsOpen} />}
            
            {!posts ?
                <p className="text-xl">
                    Loading...
                </p>
             :posts.map((post) => (
                <AllBlogs key={post.id} post={post} user={user} />
            ))}
        </div>
    );
};

export default Feed;
