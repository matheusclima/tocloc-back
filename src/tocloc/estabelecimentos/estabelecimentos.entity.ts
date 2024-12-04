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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.estabelecimentos)
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
