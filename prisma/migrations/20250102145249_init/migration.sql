-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CareReceiver" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareReceiver_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DailyMeal" (
    "uuid" TEXT NOT NULL,
    "careReceiverUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyMeal_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Meal" (
    "uuid" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "dailyMealUuid" TEXT NOT NULL,
    "mealType" "MealType" NOT NULL,
    "mainDish" INTEGER,
    "sideDish" INTEGER,
    "soup" INTEGER,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Transcript" (
    "uuid" TEXT NOT NULL,
    "mealUuid" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meal_dailyMealUuid_mealType_key" ON "Meal"("dailyMealUuid", "mealType");

-- AddForeignKey
ALTER TABLE "DailyMeal" ADD CONSTRAINT "DailyMeal_careReceiverUuid_fkey" FOREIGN KEY ("careReceiverUuid") REFERENCES "CareReceiver"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_dailyMealUuid_fkey" FOREIGN KEY ("dailyMealUuid") REFERENCES "DailyMeal"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_mealUuid_fkey" FOREIGN KEY ("mealUuid") REFERENCES "Meal"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
