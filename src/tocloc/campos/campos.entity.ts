import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Estabelecimento } from '../estabelecimentos/estabelecimentos.entity';
import { Reserva } from '../reservas/reservas.entity';

@Entity({ name: 'campos', schema: 'tocloc' })
export class Campo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false, type: 'float8', default: 0 })
  valor: number;

  @Column({ nullable: false })
  tamanho: string;

  @Column({ nullable: false })
  tipo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.campos,
    {
      onDelete: 'CASCADE',
    },
  )
  estabelecimento: Estabelecimento;

  @OneToMany(() => Reserva, (reserva) => reserva.campo, {
    cascade: true,
  })
  reservas: Reserva[];

  constructor(partial: Partial<Campo>) {
    Object.assign(this, partial);
  }
}
