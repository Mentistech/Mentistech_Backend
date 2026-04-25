import {
   IsNotEmpty,
    IsString,
     IsUUID }
      from 'class-validator';

export class CreatePerfilColaboradorDto {
  @IsUUID()
  @IsNotEmpty()
  usuarioId!: string;

  @IsString()
  @IsNotEmpty()
  departamento!: string;

  @IsString()
  @IsNotEmpty()
  cargo!: string;
}
