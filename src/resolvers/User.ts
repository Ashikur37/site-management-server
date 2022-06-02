import "reflect-metadata";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import client from "@prisma/client";
import jwt from "jsonwebtoken";
import argon from "argon2";
import { MyContext } from "src/types";
import { ApolloError } from "apollo-server-express";

const prisma = new client.PrismaClient();
let emailRegx: RegExp = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
@InputType()
class SignupInput {
    @Field(() => String)
    name!: string;
    @Field(() => String)
    email!: string;
    @Field(() => String)
    password!: string;
}

@InputType()
class SigninInput {
    @Field(() => String)
    email!: string;
    @Field(() => String)
    password!: string;
}

@ObjectType()
class FieldError {
    @Field(() => String)
    field!: string;
    @Field(() => String)
    message!: string;
}

@ObjectType()
class User{
    @Field(() => String)
    id: number;
    @Field(() => String)
    name: string;
    @Field(() => String)
    email: string;
}



@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => String, { nullable: true })
    token?: string;
}

@ObjectType()
class UserQueryResponse {
    @Field(() => User, { nullable: true })
    user?:User

    @Field(() => String, { nullable: true })
    error?:String

}

@Resolver()
export class UserResolver {
    @Query(() => UserQueryResponse)
    async me(@Ctx() {userId}:MyContext): Promise<UserQueryResponse> {
        if(!userId){
            throw new ApolloError("Invalid token");

        }
        const user = await prisma.user
            .findFirst({
                where: {
                    id: userId,
                },
            })
            .catch((e) => {
                console.log(e);
            });
            return {
               user:{
                id: user!.id,
                name: user!.name,
                email: user!.email,
               }
            };
    }

    @Mutation(() => UserResponse)
    async signup(
        @Arg("options", () => SignupInput) options: SignupInput
    ): Promise<UserResponse> {
        if (options.name.length < 3) {
           
            throw new ApolloError("Name is too short");
        }
        if (options.password.length < 3) {
            throw new ApolloError("Password is too short");
        }
        if (!emailRegx.test(options.email)) {
            throw new ApolloError("Email is invalid");
        }
        const existUser = await prisma.user
            .findFirst({
                where: {
                    email: options.email,
                },
            })
            .catch((e) => {
                console.log(e);
            });
        if (existUser) {
            throw new ApolloError("Email is already exist");
        }
        const hashedPassword = await argon.hash(options.password);

        const user = await prisma.user
            .create({
                data: {
                    name: options.name,
                    email: options.email,
                    password: hashedPassword,
                },
            })
            .catch((e) => {
                console.log(e);
            });

        const token = jwt.sign(
            {
                userId: user!.id,
                email: user!.email,
            },

            process.env.JWT_SECRET!
        );

        return {
            token,
        };
    }

    @Mutation(() => UserResponse)
    async signin(
        @Arg("options", () => SigninInput) options: SigninInput
    ): Promise<UserResponse> {

        if (options.password.length < 3) {
            throw new ApolloError("Password is too short");
        }
        if (!emailRegx.test(options.email)) {
            throw new ApolloError("Email is invalid");
        }
        const user = await prisma.user
            .findFirst({
                where: {
                    email: options.email,
                },
            })
            .catch((e) => {
                console.log(e);
            });
        if (!user) {
            throw new ApolloError("Email doesn't exist");
        }

     const match =await argon.verify(user.password,options.password);
        if(!match){
            
                throw new ApolloError("Password is incorrect");
            
        }
        const token = jwt.sign(
            {
                userId: user!.id,
                email: user!.email,
            },

            process.env.JWT_SECRET!
        );

        return {
            token,
        };
    }
}
