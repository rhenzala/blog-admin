const BASE_URL = "http://localhost:3000/api"; // Backend URL

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return await res.json();
};

export const register = async (username, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, role: "ADMIN" }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
};

export const fetchPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
};

export const fetchComments = async (postId) => {
  const res = await fetch(`${BASE_URL}/comments/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return await res.json();
};

export const createComment = async (postId, content) => {
  const token = localStorage.getItem("token"); 
  try {
    const res = await fetch(`${BASE_URL}/comments/${postId}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Comment not sent");
    return data;
  } catch (err) {
    console.error("Error creating comment:", err);
    throw err;
  }
};

export const editComment = async (id, content) => {
  const token = localStorage.getItem("token"); 
  try {
    const res = await fetch(`${BASE_URL}/comments/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Comment not sent");
    return data;
  } catch (err) {
    console.error("Error editing comment:", err);
    throw err;
  }
};

export const deleteComment = async (id) => {
  const token = localStorage.getItem("token"); 
  try {
    const res = await fetch(`${BASE_URL}/comments/${id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Comment not deleted");
    return data;
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw err;
  }
};


export const logout = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`);
  if (!res.ok) throw new Error("Something went wrong");
  return await res.json();
}
