import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AttendeeEntity } from './attendee.entity';

@Entity('groups')
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: false })
  attendeePhone: string;

  @Column({ nullable: false })
  clientPhone: string;

  @Column({ nullable: false })
  botPhone: string;

  @Column({
    nullable: false,
    default: true,
  })
  active: boolean;

  @OneToOne(() => AttendeeEntity)
  @JoinColumn()
  attendee: AttendeeEntity

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
