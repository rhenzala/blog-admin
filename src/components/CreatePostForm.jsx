import { useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { createPost } from "../utils/api";

const CreatePostForm = ({isOpen, setIsOpen}) => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [published, setPublished] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const handleCreatePost = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await createPost(title, content, published);
            setSuccess("Comment sent.");
            setContent("");
            setTitle("");
            setPublished(false);
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                <DialogTitle className="font-bold">Create a Post</DialogTitle>
                <div className=" my-4 py-4">
                    <form 
                    onSubmit={handleCreatePost}
                    className="flex flex-col gap-4 "
                    >
                        <input 
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full resize-none bg-zinc-300 dark:bg-zinc-700 rounded-md p-2"
                        required
                        />
                        <textarea 
                        name="content" 
                        id="content" 
                        placeholder="Share your thoughts"
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-24 resize-none bg-zinc-300 dark:bg-zinc-700 rounded-md p-2"
                        required
                        ></textarea>
                        <select name="published" id="published">
                            <option value="false" onChange={(e) => setPublished(e.target.value)}>No</option>
                            <option value="true" onChange={(e) => setPublished(e.target.value)}>Yes</option>
                        </select>
                        <div className="flex gap-4">
                        <button 
                        type="submit"
                        onClick={() => setIsOpen(false)}
                        className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in w-fit"
                        >
                            Cancel
                        </button>
                        <button 
                        type="submit"
                        onClick={() => setIsOpen(false)}
                        className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in w-fit"
                        >
                            Send
                        </button>
                        </div>
                    </form>
                </div>
            </DialogPanel>
            </div>
        </Dialog>
        
    )
}

export default CreatePostForm