export interface Bayan {
  id: string;
  title: string;
  description: string;
  mediaUrl?: string;
  speaker?: string;
  date?: string;
  createdAt?: any;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  isAdmin: boolean;
}
