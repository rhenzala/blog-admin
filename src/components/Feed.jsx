import { useEffect, useState } from "react";
import { fetchPosts } from "../utils/api";
import Blog from "./Blog";

const Feed = ({admin}) => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        async function loadPosts() {
            const data = await fetchPosts();
            setPosts(data)
        }
        loadPosts();
    }, [])

    return (
        <div className="container mx-auto">
        <h2 className="text-2xl">Posts</h2>
        {posts.map((post) => (
            <Blog key={post.id} post={post} admin={admin} />
        ))}
        </div>
    )
}

export default Feed