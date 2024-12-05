import { Endereco } from 'src/tocloc/enderecos/enderecos.entity';

export class CriarEstabelecimentoDto {
  usuarioId: number;
  nome: string;
  descricao?: string;
  horarioInicio?: Date;
  horarioFim?: Date;
  endereco: Partial<Endereco>;
}
