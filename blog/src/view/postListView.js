import React, { useEffect } from 'react';
import { usePostViewModel } from '../viewmodel/postViewModel.js';
import { Link } from 'react-router-dom';

function PostListView() {
  const { posts, loading, error, fetchPosts } = usePostViewModel();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.pid}>
          <Link to={`/post/${post.pid}`}>{post.title}</Link>
          <p>Likes: {post.likes}</p>
          <button>좋아요</button>
        </div>
      ))}
    </div>
  );
}

export default PostListView;