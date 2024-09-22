import { AppDispatch, RootState } from '@/app/store';
import { fetchPosts } from '@/features/post/postSlice';
import styled from '@emotion/styled';
import { Avatar, Card, List, Spin, Typography } from 'antd';
import React, { useEffect } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #8c8c8c;
`;

const AuthorAvatar = styled(Avatar)`
  margin-right: 8px;
`;

const PostContent = styled(Paragraph)`
  color: #595959;
`;

const AllPosts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { posts, status, error } = useSelector((state: RootState) => state.post);

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <List
      dataSource={posts}
      renderItem={(post) => (
        <StyledCard onClick={() => handlePostClick(post._id)}>
          <PostMeta>
            <AuthorAvatar src={post.avatar} />
            <span>{post.name}</span>
            {post.updatedAt && (
              <Moment format="MM/DD/YYYY hh:mm:ss" style={{ marginLeft: 'auto', fontSize: '12px' }}>
                {post.updatedAt}
              </Moment>
            )}
          </PostMeta>
          <PostContent ellipsis={{ rows: 3, expandable: false }}>{post.text}</PostContent>
        </StyledCard>
      )}
    />
  );
};

export default AllPosts;
