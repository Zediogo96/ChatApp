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

type User = {
    id: string;
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

    sender: User_FrontendDisplay;
};

type User_FrontendDisplay = {
    id: string;
    username: string;
    avatar_url: string;
};

type MessageWithSender = {
    sender: User_FrontendDisplay;
    id: number;

    receiver_id: number;

    content_type: string;
    content: string;

    created_at: string;
    updated_at: string;
};
