import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Estabelecimento } from '../estabelecimentos/estabelecimentos.entity';
import { Reserva } from '../reservas/reservas.entity';
import { Endereco } from '../enderecos/enderecos.entity';

@Entity({ name: 'usuarios', schema: 'tocloc' })
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  senha: string;

  @Column({ default: 'usuario' })
  tipo: 'usuario' | 'locador' | 'admin';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.usuario,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  estabelecimentos: Estabelecimento[];

  @OneToMany(() => Reserva, (reserva) => reserva.usuario, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reservas: Reserva[];

  @OneToOne(() => Endereco, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'endereco_id' })
  endereco?: Endereco;

  constructor(partial: Partial<Usuario>) {
    Object.assign(this, partial);
  }
}
