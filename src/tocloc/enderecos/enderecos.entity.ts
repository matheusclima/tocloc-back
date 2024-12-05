import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { Estabelecimento } from '../estabelecimentos/estabelecimentos.entity';

@Entity({ name: 'enderecos', schema: 'tocloc' })
export class Endereco {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  cidade: string;

  @Column({ nullable: true })
  bairro: string;

  @Column({ nullable: true })
  rua: string;

  @Column({ nullable: true })
  numero: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToOne(() => Usuario, (usuario) => usuario.endereco)
  usuario: Usuario;

  @OneToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.endereco,
  )
  estabelecimento: Estabelecimento;

  constructor(partial: Partial<Endereco>) {
    Object.assign(this, partial);
  }
}
