export interface JwtPayload {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
  };
}

export interface KnownError {
  message: string;
  description: string;
  code: number;
}