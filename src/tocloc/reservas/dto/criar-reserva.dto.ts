export class CriarReservaDto {
  dataInicio: Date;
  dataFim: Date;
  status: 'pendente' | 'confirmada' | 'cancelada';
}
