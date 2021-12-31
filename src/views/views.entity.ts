import { User } from 'src/users/users.entity'
import { Entity, ManyToOne } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class View{

    @PrimaryGeneratedColumn()
    id: number;

@ManyToOne(()=>User, (user)=>user.views)
    user: User
}