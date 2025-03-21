import { useEffect, useState } from "react";
import { fetchPosts } from "../utils/api";
import Blog from "./Blog";
import CreatePostForm from "./CreatePostForm";

const Feed = ({user}) => {
    const [posts, setPosts] = useState([]);
    let [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        async function loadPosts() {
            const data = await fetchPosts();
            setPosts(data)
        }
        loadPosts();
    }, [])

    return (
        <div className="container mx-auto">
        <div className="flex justify-between">
            <h2 className="text-2xl">Posts</h2>
            <button
            type="submit"
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in"
            >
                Create a Post
            </button>
        </div>
        {isOpen && (<CreatePostForm isOpen={isOpen} setIsOpen={setIsOpen} />)}
        {posts.map((post) => (
            <Blog key={post.id} post={post} user={user} />
        ))}
        </div>
    )
}

export default Feed