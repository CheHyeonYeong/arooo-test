import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { usePostViewModel } from '../viewmodel/postViewModel.js';
import './style/postContentView.css';
function PostContentView() {
  const { pid } = useParams();
  const { currentPost, loading, error, fetchPost, updateLikes } = usePostViewModel();

  useEffect(() => {
    if (pid) {
      fetchPost(pid);
    }
  }, [pid]); 

  const handleLike = useCallback(async () => {
    if (currentPost) {
      await updateLikes(currentPost);  // 비동기 통신
    }
  }, [currentPost, updateLikes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentPost) return <div>Post not found</div>;

  return (
    <div className="post-content">
      <table className="post-table">
        <tbody>
          <tr>
            <th>Title</th>
            <td>{currentPost.title}</td>
          </tr>
          <tr>
            <th>Content</th>
            <td>{currentPost.content}</td>
          </tr>
          <tr>
            <th>Likes</th>
            <td>
              {currentPost.likes}
              <button 
                onClick={handleLike} 
                disabled={loading}
                className="like-button"
              >
                {loading ? 'Updating...' : '👍 Like'}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default PostContentView;
