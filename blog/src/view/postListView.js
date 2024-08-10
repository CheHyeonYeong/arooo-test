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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="post-list">
      <h2>Posts</h2>
      <table className="post-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Likes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.pid}>
              <td>
                <Link to={`/post/${post.pid}`}>{post.title}</Link>
              </td>
              <td>{post.likes}</td>
              <td>
                <button 
                  onClick={() => handleLike(post)} 
                  disabled={updatingLikes[post.pid]}
                  className="like-button"
                >
                  {updatingLikes[post.pid] ? 'Updating...' : '👍 Like'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostListView;