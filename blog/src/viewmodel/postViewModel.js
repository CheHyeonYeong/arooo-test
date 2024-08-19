import { useState, useCallback } from 'react';
import { getPosts, createPost, getPost, likesUpdate } from '../config/api';

// PostViewModel 훅: 포스트 관련 상태와 작업을 관리
export function usePostViewModel() {
  // 상태 관리
  const [posts, setPosts] = useState([]); // 모든 포스트 목록
  const [currentPost, setCurrentPost] = useState(null); // 현재 선택된 포스트
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 모든 포스트를 가져오는 함수
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

  // 특정 ID의 포스트를 가져오는 함수
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

  // 새 포스트를 추가하는 함수
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

  // 포스트의 좋아요를 업데이트하는 함수
  const updateLikes = useCallback(async (post) => {
    try {
      const updatedPost = await likesUpdate(post);
      // 포스트 목록에서 해당 포스트 업데이트
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p.pid === updatedPost.pid ? { ...p, likes: updatedPost.likes } : p
        )
      );
      // 현재 선택된 포스트가 있고, 업데이트된 포스트와 같다면 현재 포스트도 업데이트
      if (currentPost && currentPost.pid === updatedPost.pid) {
        setCurrentPost(updatedPost);
      }
      return updatedPost;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [currentPost]);

  // 훅에서 반환하는 값들
  return {
    posts,          // 모든 포스트 목록
    currentPost,    // 현재 선택된 포스트
    loading,        // 로딩 상태
    error,          // 에러 상태
    fetchPosts,     // 모든 포스트를 가져오는 함수
    fetchPost,      // 특정 포스트를 가져오는 함수
    addPost,        // 새 포스트를 추가하는 함수
    updateLikes     // 포스트의 좋아요를 업데이트하는 함수
  };
}
