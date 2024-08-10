import { useState, useCallback } from 'react';
import { getPosts, createPost, getPost, likesUpdate } from '../config/api';

export function usePostViewModel() {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
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

  const fetchPost = useCallback(async (pid) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPost = await getPost(pid);
      setCurrentPost(fetchedPost);
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

  const updateLikes = useCallback(async (post) => {
    try {
      const updatedPost = await likesUpdate(post);
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p.pid === updatedPost.pid ? { ...p, likes: updatedPost.likes } : p
        )
      );
      if (currentPost && currentPost.pid === updatedPost.pid) {
        setCurrentPost(updatedPost);
      }
      return updatedPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [currentPost]);

  return {
    posts,
    currentPost,
    loading,
    error,
    fetchPosts,
    fetchPost,
    addPost,
    updateLikes
  };
}