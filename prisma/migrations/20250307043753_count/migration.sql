-- CreateTable
CREATE TABLE "event_registration_counts" (
    "id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "currentCount" INTEGER NOT NULL DEFAULT 0,
    "maxLimit" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_registration_counts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_registration_counts_eventName_key" ON "event_registration_counts"("eventName");
