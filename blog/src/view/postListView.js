import React, { useEffect, useCallback, useState } from 'react';
import { usePostViewModel } from '../viewmodel/postViewModel.js';
import { Link } from 'react-router-dom';

// PostListView 컴포넌트: 포스트 목록을 표시하는 컴포넌트
function PostListView() {
  // usePostViewModel 훅을 사용하여 필요한 상태와 함수들을 가져옴
  const { posts, loading, error, fetchPosts, updateLikes } = usePostViewModel();
  // 각 포스트의 좋아요 업데이트 상태를 관리하는 로컬 상태
  const [updatingLikes, setUpdatingLikes] = useState({});

  // 컴포넌트가 마운트될 때 포스트 목록을 가져옴
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 좋아요 버튼 클릭 핸들러
  const handleLike = useCallback(async (post) => {
    // 해당 포스트의 좋아요가 현재 업데이트 중이 아닐 때만 실행
    if (post && !updatingLikes[post.pid]) {
      // 해당 포스트의 좋아요 업데이트 상태를 true로 설정
      setUpdatingLikes(prev => ({ ...prev, [post.pid]: true }));
      try {
        // 좋아요 업데이트 수행
        await updateLikes(post);
      } finally {
        // 업데이트 완료 후 상태를 false로 변경
        setUpdatingLikes(prev => ({ ...prev, [post.pid]: false }));
      }
    }
  }, [updateLikes, updatingLikes]);

  // 로딩 중일 때 표시할 내용
  if (loading) return <div className="loading">Loading...</div>;
  // 에러 발생 시 표시할 내용
  if (error) return <div className="error">Error: {error}</div>;

  // 포스트 목록 렌더링
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
          {/* 각 포스트를 순회하며 행으로 표시 */}
          {posts.map(post => (
            <tr key={post.pid}>
              <td>
                {/* 포스트 제목을 클릭하면 해당 포스트의 상세 페이지로 이동 */}
                <Link to={`/post/${post.pid}`}>{post.title}</Link>
              </td>
              <td>{post.likes}</td>
              <td>
                {/* 좋아요 버튼 */}
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
