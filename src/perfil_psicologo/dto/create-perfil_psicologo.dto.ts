import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class CreatePerfilPsicologoDto {
  @IsUUID()
  @IsNotEmpty()
  usuarioId!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}\/[A-Z]{2}$/, {
    message: 'CRP deve estar no formato 00000/UF (ex: 12345/SP)',
  })
  crp!: string;

  @IsString()
  @IsNotEmpty()
  especialidade!: string;
}
