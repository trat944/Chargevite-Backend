import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  createdAt: Date;
}
