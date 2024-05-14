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

CREATE TABLE "contact" (
    "id" bigserial PRIMARY KEY,
    "user_id" bigint NOT NULL REFERENCES "users"("id"),
    "contact_id" bigint NOT NULL REFERENCES "users"("id"),

    "is_blocked" boolean DEFAULT FALSE,
    "is_favourite" boolean DEFAULT FALSE,

    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Add my user
INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('Zediogo96', 'josediogo96@outlook.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Mobile Developer', 'https://as2.ftcdn.net/v2/jpg/04/56/51/91/1000_F_456519184_CDS9Trh77ukgYikJ7WwxjIj8z0ylOdG2.jpg');

-- Add some users
INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('Satoru_G', 'satorugojo@gmail.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Strongest Jujutsu Sorcerer', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBW7LhDvwdvi-ZIWDmIjAne_w8ZFQFsWycZqb4qkonRQ&s');

INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('Nobara_K', 'nobarakugisaki@gmail.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Best Waifu Ever', 'https://i.pinimg.com/736x/b9/2a/78/b92a7817137232a035adea9e8bbf60a5.jpg');

INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('Suguru_G', 'suguru_geto@gmail.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Cursed Spirit User', 'https://miro.medium.com/v2/resize:fit:736/1*GHQ2nQfaZyF81STYtlmAyA.jpeg');

INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('K_Nanami', 'kento_nanami@gmail.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Best Daddy Ever', 'https://static.wikia.nocookie.net/jujutsu-kaisen/images/d/d7/Kento_Nanami_-_Anime.jpg/revision/latest?cb=20201210191917&path-prefix=es');

INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('A_Todo', 'aoi_todo@gmail.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Best Brother Ever', 'https://i.pinimg.com/originals/b1/1d/d5/b11dd5d4fbf8a98ca99b3ab896f5908a.jpg'); 

INSERT INTO "users" (username, email, password, bio, avatar_url) VALUES 
    ('Mahito', 'mahito_boi@gmail.com', '$2a$10$GzAoxztS.fTf.coNPexMGezwWoiyMRvexITnAzMgMn.o.9ukITUEu', 'Cursed Spirit', 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/12/0-2-domain-expansion-mahito.jpg');

-- Add some messages
INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (2, 1, 'text', 'Hey Zé, how are you doing?');

INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (3, 1, 'text', 'Been trying to talk to you about the new episode of JJK!');

INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (4, 1, 'text', 'Hey Zé, have you seen the new episode of JJK?');

INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (5, 1, 'text', 'I AM SO LOST RIGHT NOW!');

INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (5, 1, 'text', 'I dont feel so well mate.');

INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (1, 5, 'text', 'Hi Nanami, what you mean?');

INSERT INTO "message" (sender_id, receiver_id, content_type, content) VALUES 
    (1, 6, 'text', 'Hey Mahito, how are you doing?');

-- Add some Favourite Contacts

INSERT INTO "contact" (user_id, contact_id, is_favourite) VALUES 
    (1, 2, TRUE);

INSERT INTO "contact" (user_id, contact_id, is_favourite) VALUES 
    (1, 3, TRUE);

INSERT INTO "contact" (user_id, contact_id, is_favourite) VALUES 
    (1, 4, TRUE);

INSERT INTO "contact" (user_id, contact_id, is_favourite) VALUES 
    (1, 5, TRUE);

INSERT INTO "contact" (user_id, contact_id, is_favourite) VALUES 
    (1, 6, TRUE);


-- Add some Blocked Contacts
INSERT INTO "contact" (user_id, contact_id, is_blocked) VALUES 
    (1, 7, TRUE);
    
