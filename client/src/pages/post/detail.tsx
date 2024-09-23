import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Typography, Space, Input, Form, Avatar, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import api from '@/api/base';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import Moment from 'react-moment';
import { useQuery } from '@tanstack/react-query';
import { deletePost, updatePost } from '@/features/post/postSlice';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
`;

const FullPageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" />
  </div>
);

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    },
  });

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async (values: { text: string }) => {
    setEditMode(false);
    await dispatch(updatePost({ postId: id!, postData: { text: values.text } }));
    await navigate(`/posts/${id}`);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(id!));
  };

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <StyledCard>
      <Title level={2}>{post.title}</Title>
      <Space direction="vertical" size="middle">
        <Space align="center">
          <Avatar src={post.avatar} alt={post.name} />
          <Text>{post.name}</Text>
        </Space>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          <Moment fromNow>{post.createdAt}</Moment>
        </Text>
        {editMode ? (
          <Form onFinish={handleSave} initialValues={{ text: post.text }}>
            <Form.Item
              name="text"
              label="Post Content"
              rules={[{ required: true, message: 'Please enter the post content' }]}
            >
              <Input.TextArea rows={4} cols={50} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon={<EditOutlined />} htmlType="submit" style={{ marginRight: '10px' }}>
                Save
              </Button>
              <Button type="text" onClick={handleCancel} htmlType="button">
                Cancel
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <>
            <Text>{post.text}</Text>
            {currentUser && currentUser.id === post.user && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                  Edit Post
                </Button>
                <Button danger type="dashed" onClick={handleDelete}>
                  Delete Post
                </Button>
              </div>
            )}
          </>
        )}
      </Space>
    </StyledCard>
  );
};

export default PostDetail;
