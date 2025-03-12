import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'john Doe',
            email: 'johndoe@example.com',
            role: 'ADMIN'
        },
        {
            id: 2,
            name: 'Tim',
            email: 'tim@example.com',
            role: 'ADMIN'
        },
        {
            id: 3,
            name: "Nathan",
            email: "nathan@example.com",
            role: "INTERN"
        },
        {
            id: 4,
            name: "Bear Grills",
            email: "beargrills@example.com",
            role: "ENGINEER"
        },
        {
            id: 5,
            name: "Michel Jonson",
            email: "micheljonson@example.com",
            role: "ENGINEER"
        },
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        if(role){
            return this.users.filter(user=>user.role === role)
        }

        return this.users
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)

        return user;
    }


    create(user: {name:string, email:string, role:'INTERN'|'ENGINEER'|'ADMIN'}){
        const userByHigestId = [...this.users].sort((a, b)=>b.id - a.id)

        const newUser = {
            id: userByHigestId[0].id + 1,
            ...user
        }

        this.users.push(newUser);

        return newUser;
    }

    update(id: number, updatedUser: {name?:string, email?:string, role?:'INTERN'|'ENGINEER'|'ADMIN'}){
        this.users = this.users.map(user =>{
            if(user.id == id){
                return {...user, ...updatedUser}
            }
            return user
        })

        return this.findOne(id);
    }

    delete(id:number){
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }
}
