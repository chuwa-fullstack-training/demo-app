import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar, Typography, Spin, Divider, Row, Col, Tag, Button, Input, Form } from 'antd';
import { User, Mail, MapPin, Github, Building2, Cog, Edit, Save } from 'lucide-react';
import styled from '@emotion/styled';
import { RootState, AppDispatch } from '@/app/store';
import { createUserProfile, fetchUserProfile, updateUserProfile } from '@/features/profile/profileSlice';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

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

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledAvatar = styled(Avatar)`
  border: 4px solid #1890ff;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const SkillsContainer = styled.div`
  margin-top: 20px;
`;

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading } = useSelector((state: RootState) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        avatar: profile.user.avatar,
        name: profile.user.name,
        status: profile.status,
        // email: profile.user.email,
        location: profile.location,
        githubUsername: profile.githubUsername,
        company: profile.company,
        skills: profile.skills.join(', '),
      });
    }
  }, [profile, form]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    form.validateFields().then((values) => {
      const updatedProfile = {
        ...profile,
        // user: {
        //   ...profile.user,
        //   avatar: values.avatar,
        //   name: values.name,
        // },
        status: values.status,
        location: values.location,
        githubUsername: values.githubUsername,
        company: values.company,
        skills: values.skills.split(',').map((skill: string) => skill.trim()),
      };
      dispatch(updateUserProfile(updatedProfile));
      setIsEditing(false);
    });
  };

  if (loading) {
    return (
      <ProfileContainer>
        <Spin size="large" />
      </ProfileContainer>
    );
  }

  if (!profile) {
    navigate('/create-profile');
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <Form form={form} layout="vertical">
          <AvatarContainer>
            <StyledAvatar size={120} icon={<User />} src={profile?.user.avatar} />
          </AvatarContainer>

          <Title level={2} style={{ textAlign: 'center', marginBottom: '5px' }}>
            {profile?.user.name}
          </Title>
          {isEditing ? (
            <Form.Item name="status">
              <Input style={{ textAlign: 'center', marginBottom: '20px' }} />
            </Form.Item>
          ) : (
            <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '20px' }}>
              {profile?.status}
            </Text>
          )}
          <Divider />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <InfoItem>
                <Mail style={{ marginRight: '8px' }} size={16} />
                <Text strong className="mr-2">
                  Email:{' '}
                </Text>
                {isEditing ? (
                  <Form.Item name="email" style={{ marginBottom: 0, width: '100%' }}>
                    <Input />
                  </Form.Item>
                ) : (
                  <Text> {profile?.user.email}</Text>
                )}
              </InfoItem>
            </Col>
            <Col span={12}>
              <InfoItem>
                <MapPin style={{ marginRight: '8px' }} size={16} />
                <Text strong className="mr-2">
                  Location:
                </Text>
                {isEditing ? (
                  <Form.Item name="location" style={{ marginBottom: 0, width: '100%' }}>
                    <Input />
                  </Form.Item>
                ) : (
                  <Text>{profile?.location}</Text>
                )}
              </InfoItem>
            </Col>
          </Row>
          <InfoItem>
            <Github style={{ marginRight: '8px' }} size={16} />
            <Text strong className="mr-2">
              GitHub:
            </Text>
            {isEditing ? (
              <Form.Item name="githubUsername" style={{ marginBottom: 0, width: '100%' }}>
                <Input />
              </Form.Item>
            ) : (
              <Text>{profile?.githubUsername}</Text>
            )}
          </InfoItem>
          <InfoItem>
            <Building2 style={{ marginRight: '8px' }} size={16} />
            <Text strong className="mr-2">
              Company:
            </Text>
            {isEditing ? (
              <Form.Item name="company" style={{ marginBottom: 0, width: '100%' }}>
                <Input />
              </Form.Item>
            ) : (
              <Text> {profile?.company}</Text>
            )}
          </InfoItem>
          <SkillsContainer>
            <InfoItem>
              <Cog style={{ marginRight: '8px' }} size={16} />
              <Text strong>Skills:</Text>
            </InfoItem>
            <div style={{ marginTop: '10px' }}>
              {isEditing ? (
                <Form.Item name="skills" style={{ marginBottom: 0 }}>
                  <Input />
                </Form.Item>
              ) : (
                profile?.skills.map((skill, index) => (
                  <Tag color="blue" key={index} style={{ marginBottom: '5px' }}>
                    {skill}
                  </Tag>
                ))
              )}
            </div>
          </SkillsContainer>
          <Divider />
          <div className="flex justify-end">
            {isEditing && <Button onClick={() => setIsEditing(false)}>Cancel</Button>}
            <Button
              type="primary"
              icon={isEditing ? <Save size={16} /> : <Edit size={16} />}
              onClick={isEditing ? handleSaveProfile : handleEditProfile}
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </Button>
          </div>
        </Form>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
