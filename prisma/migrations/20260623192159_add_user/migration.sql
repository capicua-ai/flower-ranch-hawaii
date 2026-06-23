-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "soupedId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "roles" TEXT[],
    "lastSyncAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_soupedId_key" ON "users"("soupedId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
