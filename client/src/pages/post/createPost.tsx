import { AppDispatch, RootState } from '@/app/store';
import { KnownError } from '@/app/types';
import { setMessage } from '@/features/message/messageSlice';
import { createPost } from '@/features/post/postSlice'; // Assuming you have a postSlice
import { Button, Card, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const { TextArea } = Input;

const CreatePost: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.post);

  const onFinish = async (values: { text: string }) => {
    try {
      await dispatch(createPost(values));
      dispatch(
        setMessage({
          type: 'success',
          content: 'Post created successfully!',
        }),
      );
      navigate('/posts'); // Redirect to all posts page after creation
    } catch (err) {
      const error = err as KnownError;
      dispatch(
        setMessage({
          type: 'error',
          content: `Failed to create post. ${error.message ? error.message : 'Please try again.'}`,
        }),
      );
    }
  };

  return (
    <Card className={styles.card}>
      <h2>Create a New Post</h2>
      <Form name="create-post" onFinish={onFinish} layout="vertical">
        <Form.Item name="text" label="Text" rules={[{ required: true, message: 'Please input the post content!' }]}>
          <TextArea rows={6} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={status === 'loading'}>
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreatePost;
