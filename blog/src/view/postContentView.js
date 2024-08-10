import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { usePostViewModel } from '../viewmodel/postViewModel.js';

function PostContentView() {
  const { pid } = useParams();
  const { currentPost, loading, error, fetchPost, updateLikes } = usePostViewModel();

  useEffect(() => {
    if (pid) {
      fetchPost(pid);
    }
  }, [pid]); // Removed fetchPost from dependencies

  const handleLike = useCallback(async () => {
    if (currentPost) {
      await updateLikes(currentPost);
    }
  }, [currentPost, updateLikes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentPost) return <div>Post not found</div>;

  return (
    <div>
      <h2>{currentPost.title}</h2>
      <p>{currentPost.content}</p>
      <p>Likes: {currentPost.likes}</p>
      <button onClick={handleLike} disabled={loading}>
        {loading ? 'Updating...' : 'Like'}
      </button>
    </div>
  );
}

export default PostContentView;