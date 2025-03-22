import { useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { createPost } from "../utils/api";

const CreatePostForm = ({ isOpen, setIsOpen }) => {
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
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-xl space-y-4 border bg-zinc-100 dark:bg-zinc-800 p-4">
          <DialogTitle className="font-medium text-2xl">
            Create a Post
          </DialogTitle>
          <div className=" my-4 py-4">
            <form
              onSubmit={(e) => {
                handleCreatePost(e);
                setIsOpen(false);
                window.location.reload();
              }}
              className="flex flex-col gap-4 lg:min-w-lg"
            >
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full resize-none bg-zinc-300 dark:bg-zinc-700 focus:outline-1 focus:outline-blue-500 rounded-md p-2"
                required
              />
              <textarea
                name="content"
                id="content"
                placeholder="Share your thoughts"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-24 resize-none bg-zinc-300 dark:bg-zinc-700 focus:outline-1 focus:outline-blue-500 rounded-md p-2"
                required
              ></textarea>
              <label htmlFor="published" className="flex flex-col gap-1">
                <span>Publish Post?</span>
                <select
                  name="published"
                  id="published"
                  value={published.toString()}
                  onChange={(e) => setPublished(e.target.value === "true")}
                  className="bg-zinc-300 dark:bg-zinc-700 focus:outline-1 focus:outline-blue-500 rounded-md p-2"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>

              <div className="flex gap-4">
                <button
                  type="cancel"
                  onClick={() => setIsOpen(false)}
                  className="bg-rose-500 text-white px-2 py-1 rounded-md focus:outline-1 dark:focus:outline-zinc-100 focus:outline-zinc-700 hover:bg-rose-600 hover:cursor-pointer transition delay-200 ease-in w-fit"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-1 rounded-md focus:outline-1 dark:focus:outline-zinc-100 focus:outline-zinc-700 hover:bg-blue-600 hover:cursor-pointer transition delay-200 ease-in w-fit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreatePostForm;
