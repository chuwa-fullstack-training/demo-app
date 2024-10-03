import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Card, Typography } from 'antd';
import { User, MapPin, Github, Building2, Cog } from 'lucide-react';
import styled from '@emotion/styled';
import { AppDispatch, RootState } from '@/app/store';
import { createUserProfile } from '@/features/profile/profileSlice';
import { useNavigate } from 'react-router-dom';
import { ProfilePayload } from '@/api/profile';
import { setMessage } from '@/features/message/messageSlice';

const { Title } = Typography;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

const ProfileCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const CreateProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.profile);
  const [form] = Form.useForm();

  useEffect(() => {
    if (profile) {
      navigate('/profile');
    }
  }, [profile, navigate]);

  const onFinish = (values: {
    status: string;
    company?: string;
    location?: string;
    githubUsername?: string;
    skills: string;
  }) => {
    const profileData = {
      ...values,
      skills: values.skills.split(',').map((skill: string) => skill.trim()),
    };
    dispatch(createUserProfile(profileData as ProfilePayload))
      .then(() => {
        navigate('/profile');
      })
      .catch((error) => {
        console.error('Error creating profile:', error);
        dispatch(setMessage(error.message));
      });
  };

  if (profile) {
    return null; // or a loading spinner if you prefer
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
          Create Your Profile
        </Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="status"
            label="Professional Status"
            rules={[{ required: true, message: 'Please input your professional status!' }]}
          >
            <Input prefix={<User size={16} />} placeholder="e.g. Developer, Manager, Intern" />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <Input prefix={<Building2 size={16} />} placeholder="Company" />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input prefix={<MapPin size={16} />} placeholder="Location" />
          </Form.Item>
          <Form.Item name="githubUsername" label="GitHub Username">
            <Input prefix={<Github size={16} />} placeholder="GitHub Username" />
          </Form.Item>
          <Form.Item name="skills" label="Skills" rules={[{ required: true, message: 'Please input your skills!' }]}>
            <Input prefix={<Cog size={16} />} placeholder="Skills (comma separated)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Profile
            </Button>
          </Form.Item>
        </Form>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default CreateProfile;
