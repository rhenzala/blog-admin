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
  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, published }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Post not sent");
    return data;
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
};
