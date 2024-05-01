CREATE TABLE "users" (
    "id" bigserial PRIMARY KEY,
    "username" varchar(32) NOT NULL,
    "email" varchar(64) NOT NULL,
    "password" varchar(64) NOT NULL,
    "bio" varchar(255),
    "avatar_url" varchar(255),

    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "message" (
    "id" bigserial PRIMARY KEY,
    "sender_id" bigint NOT NULL REFERENCES "users"("id"),
    "receiver_id" bigint NOT NULL REFERENCES "users"("id"),
    
    "content_type" varchar(32) NOT NULL,
    "content" text NOT NULL,

    -- status can be 'sent', 'read' 
    "status" varchar(32) DEFAULT 'not_read' CHECK ("status" IN ('not_read', 'read')),

    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add some users
INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('Satoru Gojo', 'satorugojo@gmail.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Strongest Jujutsu Sorcerer', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBW7LhDvwdvi-ZIWDmIjAne_w8ZFQFsWycZqb4qkonRQ&s');

INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('Nobara K.', 'nobarakugisaki@gmail.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Best Waifu Ever', 'https://pbs.twimg.com/profile_images/137056328$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu3002496/g_Q7dwBw_400x400.jpg');

INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('Suguru Geto', 'suguru_geto@gmail.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Cursed Spirit User', 'https://miro.medium.com/v2/resize:fit:736/1*GHQ2nQfaZyF81STYtlmAyA.jpeg');

INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('Kento Nanami', 'kento_nanami@gmail.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Best Daddy Ever', 'https://static.wikia.nocookie.net/jujutsu-kaisen/images/d/d7/Kento_Nanami_-_Anime.jpg/revision/latest?cb=20201210191917&path-prefix=es');

-- Add my user
INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('Zediogo96', 'josediogo96@outlook.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Mobile Developer', 'https://as2.ftcdn.net/v2/jpg/04/56/51/91/1000_F_456519184_CDS9Trh77ukgYikJ7WwxjIj8z0ylOdG2.jpg');

-- Add some messages
INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (1, 5, 'text', 'Hey Zé, how are you doing?');

INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (2, 5, 'text', 'Hey Zé, have you seen the new episode of JJK?');

INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (3, 5, 'text', 'I AM SO LOST RIGHT NOW!');

INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (4, 5, 'text', 'Boas Zé, tudo bem?');
