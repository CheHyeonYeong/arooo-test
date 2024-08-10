import React, { useEffect } from 'react';
import { usePostViewModel } from '../viewmodel/postViewModel.js';

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
          <a href='/{post.pid}'>{post.title}</a>
        </div>
      ))}
    </div>
  );
}

export default PostListView;