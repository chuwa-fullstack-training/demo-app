import api from './base';

export interface Profile {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  company: string;
  location: string;
  status: string;
  skills: string[];
  githubUsername: string;
}

export type ProfilePayload = Omit<Profile, 'user' | '_id'>;

export const getCurrentUserProfile = async () => {
  try {
    const response = await api.get('/profile/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateCurrentUserProfile = async (profile: ProfilePayload) => {
  try {
    const response = await api.put('/profile/me', profile);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const createCurrentUserProfile = async (profile: ProfilePayload) => {
  try {
    const response = await api.post('/profile', profile);
    return response.data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};
