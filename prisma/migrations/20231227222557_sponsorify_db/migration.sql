-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsorships" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyDesc" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "completeAddress" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "withDrawalTimeId" INTEGER NOT NULL,
    "limitEventSubmission" INTEGER NOT NULL,
    "applicationExpired" INTEGER NOT NULL,
    "reportDeadline" INTEGER NOT NULL,

    CONSTRAINT "Sponsorships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withDrawTimes" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "withDrawTimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "completeAddress" TEXT NOT NULL,
    "mapsLink" TEXT NOT NULL,
    "eventDesc" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposals" (
    "id" SERIAL NOT NULL,
    "file_path" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "sponsorshipId" INTEGER NOT NULL,
    "proposalStatusId" INTEGER NOT NULL,

    CONSTRAINT "Proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalStatuses" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "statusDesc" TEXT NOT NULL,

    CONSTRAINT "ProposalStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saveds" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sponsorshipId" INTEGER NOT NULL,

    CONSTRAINT "Saveds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceReviews" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ServiceReviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventsReports" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "sponsorshipId" INTEGER NOT NULL,

    CONSTRAINT "EventsReports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sponsorships_categoryId_key" ON "Sponsorships"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Sponsorships_withDrawalTimeId_key" ON "Sponsorships"("withDrawalTimeId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsorships" ADD CONSTRAINT "Sponsorships_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsorships" ADD CONSTRAINT "Sponsorships_withDrawalTimeId_fkey" FOREIGN KEY ("withDrawalTimeId") REFERENCES "withDrawTimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposals" ADD CONSTRAINT "Proposals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposals" ADD CONSTRAINT "Proposals_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposals" ADD CONSTRAINT "Proposals_sponsorshipId_fkey" FOREIGN KEY ("sponsorshipId") REFERENCES "Sponsorships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposals" ADD CONSTRAINT "Proposals_proposalStatusId_fkey" FOREIGN KEY ("proposalStatusId") REFERENCES "ProposalStatuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saveds" ADD CONSTRAINT "Saveds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saveds" ADD CONSTRAINT "Saveds_sponsorshipId_fkey" FOREIGN KEY ("sponsorshipId") REFERENCES "Sponsorships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceReviews" ADD CONSTRAINT "ServiceReviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsReports" ADD CONSTRAINT "EventsReports_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsReports" ADD CONSTRAINT "EventsReports_sponsorshipId_fkey" FOREIGN KEY ("sponsorshipId") REFERENCES "Sponsorships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
