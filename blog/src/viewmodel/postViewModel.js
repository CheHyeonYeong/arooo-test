import { useState, useCallback } from 'react';
import { getPosts, createPost } from '../config/api';

export function usePostViewModel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addPost = useCallback(async (postData) => {
    try {
      const newPost = await createPost(postData);
      setPosts(prevPosts => [...prevPosts, newPost]);
      return newPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    addPost
  };
}