const BASE_URL = "https://blog-backend-fk4s.onrender.com/api";

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    console.error("Unauthorized: Token expired or invalid");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; 
    return;
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json();
};

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

export const register = async (username, email, password, confirmPassword) => {
  return fetchWithAuth(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
      role: "ADMIN",
    }),
  });
};

export const fetchPosts = async () => {
  return fetchWithAuth(`${BASE_URL}/posts`, { method: "GET", credentials: "include" });
};

export const fetchPostById = async (postId) => {
  return fetchWithAuth(`${BASE_URL}/posts/${postId}`, { method: "GET", credentials: "include" });
};

export const createPost = async (title, content, published) => {
  return fetchWithAuth(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify({ title, content, published }),
    credentials: "include",
  });
};

export const editPost = async (id, title, content, published) => {
  return fetchWithAuth(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content, published }),
    credentials: "include",
  });
};

export const updatePostStatus = async (id, published) => {
  return fetchWithAuth(`${BASE_URL}/posts/${id}/publish`, {
    method: "PATCH",
    body: JSON.stringify({ published }),
    credentials: "include",
  });
};

export const deletePost = async (id) => {
  return fetchWithAuth(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const fetchComments = async (postId) => {
  return fetchWithAuth(`${BASE_URL}/comments/${postId}`, { method: "GET" });
};

export const createComment = async (postId, content) => {
  return fetchWithAuth(`${BASE_URL}/comments/${postId}`, {
    method: "POST",
    body: JSON.stringify({ content }),
    credentials: "include",
  });
};

export const editComment = async (id, content) => {
  return fetchWithAuth(`${BASE_URL}/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({ content }),
    credentials: "include",
  });
};

export const deleteComment = async (id) => {
  return fetchWithAuth(`${BASE_URL}/comments/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const logout = async () => {
  await fetchWithAuth(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
