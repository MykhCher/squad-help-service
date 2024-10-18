CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    "blackList" BOOLEAN[] NOT NULL,
    "favoriteList" BOOLEAN[] NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "usersConversations" (
    "userId" INTEGER REFERENCES "Users" ON DELETE CASCADE,
    "conversationId" INTEGER REFERENCES conversations ON DELETE CASCADE,
    PRIMARY KEY ("userId", "conversationId")
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    body TEXT NOT NULL,
    sender INTEGER REFERENCES "Users",
    conversation INTEGER REFERENCES conversations,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE catalogs (
    id SERIAL PRIMARY KEY,
    "catalogName" VARCHAR(50) NOT NULL,
    "userId" INTEGER REFERENCES "Users"
);

CREATE TABLE "chats" (
    "conversationId" INTEGER REFERENCES conversations ON DELETE CASCADE,
    "catalogId" INTEGER REFERENCES catalogs ON DELETE CASCADE,
    PRIMARY KEY ("conversationId", "catalogId")
);