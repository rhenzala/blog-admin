const BASE_URL = "https://blog-backend-fk4s.onrender.com/api";

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  if (!res.ok) throw new Error("Incorrect username or password");

  const data = await res.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

// confirmPassword is added to res body so that backend can use it for validation
export const register = async (username, email, password, confirmPassword) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
      role: "ADMIN",
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    if (data.errors) {
      const error = new Error("Validation error");
      error.response = { data };
      throw error;
    }
    throw new Error(data.error || "Registration failed");
  }

  return data;
};

export const fetchPosts = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
};

export const fetchPostById = async (postId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch post");
  return await res.json();
};

export const createPost = async (title, content, published) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("Authentication required. Please log in again.");
  }
  
  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, published }),
      credentials: "include",
    });

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Post creation failed with status: ${res.status}`);
      }
      return data;
    } else {
      const text = await res.text();
      if (!res.ok) {
        throw new Error(`Post creation failed: ${text}`);
      }
      return { message: text };
    }
  } catch (err) {
    console.error("Error creating post:", err);
    throw err;
  }
};

export const editPost = async (id, title, content, published) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, published }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Post not sent");
    return data;
  } catch (err) {
    console.error("Error editing post:", err);
    throw err;
  }
};

export const updatePostStatus = async (id, published) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}/publish`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ published }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Post status not sent");
    return data;
  } catch (err) {
    console.error("Error updating post status:", err);
    throw err;
  }
};

export const deletePost = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Post not deleted");
    return data;
  } catch (err) {
    console.error("Error deleting post:", err);
    throw err;
  }
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
      credentials: "include",
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
      credentials: "include",
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
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
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
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    
    if (!res.ok) throw new Error("Logout failed");

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    return await res.json();
  } catch (err) {
    console.error("Error during logout:", err);
    throw err;
  }
};
