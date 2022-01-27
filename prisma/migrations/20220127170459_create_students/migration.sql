-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "UsuarioNome" TEXT NOT NULL,
    "ProvaDescricao" TEXT NOT NULL,
    "ProvaIdA" INTEGER NOT NULL,
    "ProvaIdB" INTEGER NOT NULL,
    "Nis" INTEGER NOT NULL,
    "DisciplinaA" TEXT NOT NULL,
    "DisciplinaB" TEXT NOT NULL,
    "Escola" TEXT NOT NULL,
    "AnoCursado" INTEGER NOT NULL,
    "Turma" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);
