export class CriarUsuarioDto {
  nome: string;
  email: string;
  senha: string;
  tipo: 'usuario' | 'locador' | 'admin';
}
