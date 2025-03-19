import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("gestao_usuarios_user")
export class AttendeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false }) // 🔹 Oculta o campo em queries normais
  password: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: false })
  phone: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_staff: boolean;

  @Column({ default: false })
  is_superuser: boolean;

  @Column({ nullable: true })
  last_login?: Date;

  @CreateDateColumn()
  date_joined: Date;

  @Column({ nullable: true, select: false }) // 🔹 Para segurança, oculta em queries normais
  reset_password_token?: string;

  @Column({ nullable: true })
  perfil_id?: number;
}