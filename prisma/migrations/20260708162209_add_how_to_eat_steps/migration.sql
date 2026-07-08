-- CreateTable
CREATE TABLE "how_to_eat_steps" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "how_to_eat_steps_pkey" PRIMARY KEY ("id")
);
