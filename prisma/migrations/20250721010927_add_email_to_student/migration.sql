-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "RA" TEXT NOT NULL,
    "CPF" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_name_key" ON "Student"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_RA_key" ON "Student"("RA");

-- CreateIndex
CREATE UNIQUE INDEX "Student_CPF_key" ON "Student"("CPF");
