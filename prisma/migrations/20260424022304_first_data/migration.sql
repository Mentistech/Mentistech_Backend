-- CreateEnum
CREATE TYPE "Papel" AS ENUM ('COLABORADOR', 'PSICOLOGO', 'ADMIN');

-- CreateEnum
CREATE TYPE "Humor" AS ENUM ('MUITO_BEM', 'BEM', 'NEUTRO', 'MAL', 'MUITO_MAL');

-- CreateEnum
CREATE TYPE "StatusConsulta" AS ENUM ('AGENDADA', 'REALIZADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "DiaSemana" AS ENUM ('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "papel" "Papel" NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil_colaborador" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "perfil_colaborador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil_psicologo" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "crp" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,

    CONSTRAINT "perfil_psicologo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkin_emocional" (
    "id" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,
    "humor" "Humor" NOT NULL,
    "nivel_estresse" INTEGER NOT NULL,
    "realizado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkin_emocional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analise_ia" (
    "id" TEXT NOT NULL,
    "checkin_id" TEXT NOT NULL,
    "resposta_ia" TEXT NOT NULL,
    "conteudo_psicologico" TEXT NOT NULL,
    "gerado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analise_ia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consulta" (
    "id" TEXT NOT NULL,
    "colaborador_id" TEXT NOT NULL,
    "psicologo_id" TEXT NOT NULL,
    "analise_id" TEXT,
    "data_hora" TIMESTAMP(3) NOT NULL,
    "status" "StatusConsulta" NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disponibilidade" (
    "id" TEXT NOT NULL,
    "psicologo_id" TEXT NOT NULL,
    "dia_semana" "DiaSemana" NOT NULL,
    "hora_inicio" TEXT NOT NULL,
    "hora_fim" TEXT NOT NULL,

    CONSTRAINT "disponibilidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "perfil_colaborador_usuario_id_key" ON "perfil_colaborador"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "perfil_psicologo_usuario_id_key" ON "perfil_psicologo"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "analise_ia_checkin_id_key" ON "analise_ia"("checkin_id");

-- AddForeignKey
ALTER TABLE "perfil_colaborador" ADD CONSTRAINT "perfil_colaborador_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil_psicologo" ADD CONSTRAINT "perfil_psicologo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkin_emocional" ADD CONSTRAINT "checkin_emocional_colaborador_id_fkey" FOREIGN KEY ("colaborador_id") REFERENCES "perfil_colaborador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analise_ia" ADD CONSTRAINT "analise_ia_checkin_id_fkey" FOREIGN KEY ("checkin_id") REFERENCES "checkin_emocional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_colaborador_id_fkey" FOREIGN KEY ("colaborador_id") REFERENCES "perfil_colaborador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_psicologo_id_fkey" FOREIGN KEY ("psicologo_id") REFERENCES "perfil_psicologo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_analise_id_fkey" FOREIGN KEY ("analise_id") REFERENCES "analise_ia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilidade" ADD CONSTRAINT "disponibilidade_psicologo_id_fkey" FOREIGN KEY ("psicologo_id") REFERENCES "perfil_psicologo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
