import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile(
    $company: String
    $location: String
    $status: String!
    $skills: [String!]!
    $githubUsername: String
  ) {
    createProfile(
      company: $company
      location: $location
      status: $status
      skills: $skills
      githubUsername: $githubUsername
    ) {
      id
    }
  }
`;

const CreateProfile: React.FC = () => {
  const navigate = useNavigate();
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);

  const onFinish = async (values: any) => {
    try {
      await createProfile({
        variables: {
          ...values,
          skills: values.skills.split(',').map((skill: string) => skill.trim()),
        },
      });
      message.success('Profile created successfully');
      navigate('/profile');
    } catch (error: any) {
      message.error('Failed to create profile: ' + (error.message || 'An unexpected error occurred'));
    }
  };

  return (
    <Form name="createProfile" onFinish={onFinish}>
      <Form.Item name="company">
        <Input placeholder="Company" />
      </Form.Item>
      <Form.Item name="location">
        <Input placeholder="Location" />
      </Form.Item>
      <Form.Item name="status" rules={[{ required: true, message: 'Please input your status!' }]}>
        <Input placeholder="Status" />
      </Form.Item>
      <Form.Item name="skills" rules={[{ required: true, message: 'Please input your skills!' }]}>
        <Input placeholder="Skills (comma separated)" />
      </Form.Item>
      <Form.Item name="githubUsername">
        <Input placeholder="GitHub Username" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Profile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProfile;
