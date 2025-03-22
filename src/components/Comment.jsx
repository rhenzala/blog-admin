import { useEffect, useState } from "react";
import { fetchComments, deleteComment } from "../utils/api";
import { Pencil, Trash2 } from "lucide-react";
import EditCommentForm from "./EditCommentForm";
import CommentForm from "./CommentForm";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      onClos();
    } catch (err) {
      setError(err.message);
    }
  };

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
              <span className="font-medium text-sm">
                {comment.author.username}
              </span>
              <span className="font-light text-sm">
                {new Date(comment.updatedAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
            <div>
              {user.username === comment.author.username && (
                <button
                  onClick={() => toggleActive(comment.id)}
                  title="Edit comment"
                  aria-label="Edit comment"
                  className="bg-transparent text-zinc-700 dark:text-zinc-300 text-sm px-2 py-1 rounded-md hover:bg-green-500/20 hover:text-green-500 hover:cursor-pointer focus:bg-green-500/20 focus:text-green-500 transition delay-200 ease-in outline-none"
                >
                  <Pencil size={14} />
                </button>
              )}
              <button
                onClick={() => handleDelete(comment.id)}
                title="Delete comment"
                aria-label="Delete comment"
                className="bg-transparent text-zinc-700 dark:text-zinc-300 text-sm px-2 py-1 rounded-md hover:bg-rose-500/20 hover:text-rose-500 hover:cursor-pointer focus:bg-rose-500/20 focus:text-rose-500 transition delay-200 ease-in outline-none"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <div className="mb-4 leading-5">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold my-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold my-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold my-2">{children}</h3>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc ml-6">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal ml-6">{children}</ol>
                ),
                li: ({ children }) => <li className="my-1">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-zinc-500 pl-4 italic text-zinc-600 dark:text-zinc-300">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-zinc-200 dark:bg-slate-900 px-2 py-1 my-2 rounded text-zinc-800 dark:text-zinc-400">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-slate-900 text-zinc-50 p-4 rounded-lg overflow-x-auto">
                    {children}
                  </pre>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            >
              {comment.content}
            </Markdown>
          </div>
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
