import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { Campo } from '../campos/campos.entity';
import { Endereco } from '../enderecos/enderecos.entity';

@Entity({ name: 'estabelecimentos', schema: 'tocloc' })
export class Estabelecimento {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column()
  descricao: string;

  @Column({ name: 'telefone', nullable: true })
  telefone: string;

  @Column({ name: 'horario_inicio', nullable: true, type: 'time' })
  horarioInicio: Date;

  @Column({ name: 'horario_fim', nullable: true, type: 'time' })
  horarioFim: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.estabelecimentos, {
    cascade: true,
  })
  usuario: Usuario;

  @OneToMany(() => Campo, (campo) => campo.estabelecimento, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  campos?: Campo[];

  @OneToOne(() => Endereco, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'endereco_id' })
  endereco?: Endereco;

  constructor(partial: Partial<Estabelecimento>) {
    Object.assign(this, partial);
  }
}
