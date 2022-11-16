-- CreateTable
CREATE TABLE "HeartRate" (
    "id" SERIAL NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "bpm" INTEGER NOT NULL,

    CONSTRAINT "HeartRate_pkey" PRIMARY KEY ("id")
);
