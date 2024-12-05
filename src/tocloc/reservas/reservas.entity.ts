import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { Campo } from '../campos/campos.entity';

@Entity({ name: 'reservas', schema: 'tocloc' })
export class Reserva {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'date' })
  data: Date;

  @Column({ nullable: false, type: 'time' })
  horarioInicio: Date;

  @Column({ nullable: false, type: 'time' })
  horarioFim: Date;

  @Column({ nullable: false, default: 'pendente' })
  status: 'pendente' | 'confirmada' | 'cancelada';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas)
  usuario: Usuario;

  @ManyToOne(() => Campo, (campo) => campo.reservas)
  campo: Campo;

  constructor(partial: Partial<Reserva>) {
    Object.assign(this, partial);
  }
}
