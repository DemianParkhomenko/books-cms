-- CreateTable
CREATE TABLE "user"(
    "id" text NOT NULL,
    "name" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author"(
    "id" text NOT NULL,
    "name" text NOT NULL,
    "bio" text NOT NULL,
    "birthDate" timestamptz(0) NOT NULL,
    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book"(
    "id" serial NOT NULL,
    "title" text NOT NULL,
    "publicationDate" timestamptz(0) NOT NULL,
    "authorId" text NOT NULL,
    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "book_publicationDate_idx" ON "book"("publicationDate");

-- CreateIndex
CREATE INDEX "book_title_idx" ON "book"("title");

-- CreateIndex
CREATE INDEX "book_authorId_idx" ON "book"("authorId");

-- AddForeignKey
ALTER TABLE "book"
    ADD CONSTRAINT "book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

