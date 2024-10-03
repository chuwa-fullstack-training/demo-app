import { ProfilePayload, Profile as ProfileType } from '@/api/profile';
import { AppDispatch, RootState } from '@/app/store';
import { setMessage } from '@/features/message/messageSlice';
import { fetchGithubRepos, fetchUserProfile, updateUserProfile } from '@/features/profile/profileSlice';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Divider, Input, List, Spin, Tag, Typography } from 'antd';
import { Building2, CircleX, Cog, Edit, Github, MapPin, Save, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const profileSchema = z.object({
  location: z.string().refine((data) => data.length > 0, {
    message: 'Location is required',
  }),
  githubUsername: z.string().refine((data) => data.length > 0, {
    message: 'GitHub username is required',
  }),
  company: z.string().refine((data) => data.length > 0, {
    message: 'Company is required',
  }),
  skills: z.array(z.string()).refine((data) => data.length > 0, {
    message: 'Skills are required',
  }),
});

type Profile = z.infer<typeof profileSchema>;

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

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  const [editField, setEditField] = useState<string | null>(null);
  const [profileState, setProfileState] = useState<Partial<ProfileType> | null>(profile);
  const [githubUsername, setGithubUsername] = useState<string>('');

  useEffect(() => {
    dispatch(fetchUserProfile())
      .unwrap()
      .then((res) => {
        setProfileState(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const { data: githubRepos, isLoading: isGithubReposLoading } = useQuery({
    enabled: !!githubUsername,
    queryKey: ['githubRepos', githubUsername],
    queryFn: async () => await dispatch(fetchGithubRepos(githubUsername)).unwrap(),
    staleTime: 1000 * 60 * 30,
  });

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

  const handleEdit = (field: string) => {
    setEditField(field);
    if (field === 'githubUsername') {
      setGithubUsername('');
    }
  };

  const handleSave = async (field: string) => {
    try {
      profileSchema.parse(profileState);
      await dispatch(updateUserProfile(profileState as ProfilePayload));
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(field, 'data is invalid', error.message);
        dispatch(
          setMessage({
            type: 'error',
            content: JSON.parse(error.message)
              .map((err: { message: string }) => err.message)
              .join(', '),
          }),
        );
      }
    }
    setEditField(null);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field === 'skills') {
      setProfileState({ ...profileState, [field]: e.target.value.split(',') });
    } else {
      setProfileState({ ...profileState, [field]: e.target.value });
    }
  };

  const handleCancel = () => {
    setEditField(null);
    setProfileState(profile);
  };

  const handleClick = async (field: string) => {
    if (field === 'githubUsername') {
      setGithubUsername(profileState?.githubUsername as string);
    }
  };

  const data = [
    {
      key: 'location',
      title: 'Location',
      description:
        editField === 'location' ? (
          <Input value={profileState?.location} onChange={handleChange('location')} />
        ) : (
          profile?.location
        ),
      icon: <MapPin size={20} />,
    },
    {
      key: 'githubUsername',
      title: 'GitHub',
      description:
        editField === 'githubUsername' ? (
          <Input value={profileState?.githubUsername} onChange={handleChange('githubUsername')} />
        ) : (
          profile?.githubUsername
        ),
      icon: <Github size={20} />,
    },
    {
      key: 'company',
      title: 'Company',
      description:
        editField === 'company' ? (
          <Input value={profileState?.company} onChange={handleChange('company')} />
        ) : (
          profile?.company
        ),
      icon: <Building2 size={20} />,
    },
    {
      key: 'skills',
      title: 'Skills',
      description:
        editField === 'skills' ? (
          <Input value={profileState?.skills} onChange={handleChange('skills')} />
        ) : (
          <div>
            {profileState?.skills?.map((skill) => (
              <Tag key={skill} color="blue">
                {skill}
              </Tag>
            ))}
          </div>
        ),
      icon: <Cog size={20} />,
    },
  ];

  const getActionBtns = (field: string) =>
    editField !== field
      ? [<Edit size={20} onClick={() => handleEdit(field)} className="cursor-pointer" />]
      : [
          <Save size={20} onClick={() => handleSave(field)} className="cursor-pointer" />,
          <CircleX size={20} onClick={handleCancel} className="cursor-pointer" />,
        ];

  return (
    <ProfileContainer>
      <ProfileCard>
        <AvatarContainer>
          <StyledAvatar size={120} icon={<User />} src={profile?.user.avatar} />
        </AvatarContainer>

        <Title level={2} style={{ textAlign: 'center', marginBottom: '5px' }}>
          {profile?.user.name}
        </Title>

        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '20px' }}>
          {profile?.status}
        </Text>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) =>
            item.key === 'githubUsername' ? (
              <List.Item actions={getActionBtns(item.key)} onClick={() => handleClick(item.key)}>
                <List.Item.Meta title={item.title} description={item.description} avatar={item.icon} />
                {isGithubReposLoading ? (
                  <Spin />
                ) : (
                  githubRepos && (
                    <ul
                      style={{ width: '50%' }}
                      className="list-none hover:list-disc h-32 overflow-y-auto gap-2 flex flex-col"
                    >
                      {githubRepos.length > 0 &&
                        githubRepos.slice(0, 3).map((repo) => (
                          <li key={repo.name}>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                              {repo.name}
                            </a>
                            <div className="text-xs text-gray-500">{repo.description}</div>
                          </li>
                        ))}
                    </ul>
                  )
                )}
              </List.Item>
            ) : (
              <List.Item actions={getActionBtns(item.key)} onClick={() => handleClick(item.key)}>
                <List.Item.Meta title={item.title} description={item.description} avatar={item.icon} />
              </List.Item>
            )
          }
        />
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
