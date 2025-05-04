export interface UserSession {
  uid: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: string[];
}
