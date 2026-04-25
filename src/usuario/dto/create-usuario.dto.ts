import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export enum Papel {
  COLABORADOR = 'COLABORADOR',
  PSICOLOGO = 'PSICOLOGO',
}

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  senha!: string;

  @IsEnum(Papel)
  papel!: Papel;
}
