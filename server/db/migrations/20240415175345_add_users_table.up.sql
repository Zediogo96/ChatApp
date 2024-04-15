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
