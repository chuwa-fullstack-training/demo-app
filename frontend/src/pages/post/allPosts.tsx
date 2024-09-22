import { AppDispatch, RootState } from '@/app/store';
import { fetchPosts, likePost, Post } from '@/features/post/postSlice';
import styled from '@emotion/styled';
import { Avatar, Card, List, Spin, Typography } from 'antd';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
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
  cursor: pointer;
`;

const AllPosts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { posts, status, error } = useSelector((state: RootState) => state.post);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  useEffect(() => {
    dispatch(fetchPosts())
      .unwrap()
      .then((posts) => setLocalPosts(posts));
  }, [dispatch]);

  useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const handleLikePost = async (postId: string) => {
    try {
      const updatedPost = await dispatch(likePost(postId)).unwrap();
      setLocalPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? { ...post, likes: updatedPost } : post)),
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
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
      dataSource={localPosts}
      renderItem={(post) => (
        <StyledCard>
          <PostMeta>
            <AuthorAvatar src={post.avatar} />
            <span>{post.name}</span>
            <span
              style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}
              onClick={() => handleLikePost(post._id)}
            >
              <Heart size={12} />
              <span style={{ marginLeft: '4px' }}>{post.likes.length}</span>
            </span>
            {post.updatedAt && (
              <Moment format="MM/DD/YYYY hh:mm:ss" style={{ marginLeft: 'auto', fontSize: '12px' }}>
                {post.updatedAt}
              </Moment>
            )}
          </PostMeta>
          <PostContent ellipsis={{ rows: 3, expandable: false }} onClick={() => handlePostClick(post._id)}>
            {post.text}
          </PostContent>
        </StyledCard>
      )}
    />
  );
};

export default AllPosts;
