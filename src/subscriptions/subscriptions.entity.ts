
import { User } from "src/users/users.entity"
import { Entity, ManyToOne,PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Subscription{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>User, (user)=>user.subscribers)
    subscriber: User


    @ManyToOne(()=>User, (user)=>user.subscribedTo)
    subscribedTo: User


    
}