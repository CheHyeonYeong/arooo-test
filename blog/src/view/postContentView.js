import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePostViewModel } from '../viewmodel/postViewModel.js';

function PostContentView() {
  const { pid } = useParams();
  const { currentPost, loading, error, fetchPost } = usePostViewModel();

  useEffect(() => {
    if (pid) {
      fetchPost(pid);
    }
  }, [pid, fetchPost]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentPost) return <div>Post not found</div>;

  return (
    <div>
      <h2>{currentPost.title}</h2>
      <p>{currentPost.content}</p>
      <p>Likes: {currentPost.likes}</p>
    </div>
  );
}

export default PostContentView;