import React, { useEffect, useCallback, useState } from 'react';
import { usePostViewModel } from '../viewmodel/postViewModel.js';
import { Link } from 'react-router-dom';

function PostListView() {
  const { posts, loading, error, fetchPosts, updateLikes } = usePostViewModel();
  const [updatingLikes, setUpdatingLikes] = useState({});

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleLike = useCallback(async (post) => {
    if (post && !updatingLikes[post.pid]) {
      setUpdatingLikes(prev => ({ ...prev, [post.pid]: true }));
      try {
        await updateLikes(post);
      } finally {
        setUpdatingLikes(prev => ({ ...prev, [post.pid]: false }));
      }
    }
  }, [updateLikes, updatingLikes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.pid}>
          <Link to={`/post/${post.pid}`}>{post.title}</Link>
          <p>Likes: {post.likes}</p>
          <button 
            onClick={() => handleLike(post)} 
            disabled={updatingLikes[post.pid]}
          >
            {updatingLikes[post.pid] ? 'Updating...' : 'Like'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default PostListView;