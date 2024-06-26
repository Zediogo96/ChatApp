type LoginResponse = {
  id: string;
  token: string;
  username: string;
  email: string;
  bio: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};

type Message = {
  id: number;

  sender_id: number;
  receiver_id: number;

  content_type: string;
  content: string;

  created_at: string;
  updated_at: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};

type User_FrontendDisplay = Omit<
  User,
  "email" | "bio" | "created_at" | "updated_at"
>;

type MessageWithSender = {
  id: number;

  receiver_id: number;

  content_type: string;
  content: string;

  created_at: string;
  updated_at: string;

  sender: User_FrontendDisplay;
  unread_count: number;
};
