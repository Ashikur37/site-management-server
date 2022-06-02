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

import { MyContext } from "src/types";
import { ApolloError } from "apollo-server-express";

const prisma = new client.PrismaClient();



@ObjectType()
class SiteUser{
    @Field(() => String)
    id: number;
    @Field(() => String)
    name: string;
    @Field(() => String)
    email: string;
}

@ObjectType()
class SiteLog{
    
    @Field(() => Date)
    createdAt: Date;

    @Field(() => SiteUser)
    user: SiteUser;
    
}


@ObjectType()
class Site{
    @Field(() => String)
    id: number;
    @Field(() => String)
    name: string;
    @Field(() => String)
    city: string;
    @Field(() => String)
    latitude?: string;
    @Field(() => String)
    longitude?: string;

    @Field(() => SiteUser)
    user?: SiteUser;

    @Field(() => [SiteLog])
    siteLogs?: [SiteLog];

    @Field(() => Date)
    createdAt: Date;

}

@InputType()
class SiteInput {
    
    @Field(() => String)
    name!: string;
    @Field(() => String)
    city!: string;
    @Field(() => String)
    latitude!: string;
    @Field(() => String)
    longitude!: string;
}

@InputType()
class SiteEditInput {
    @Field(() => Number)
    id!: number;
    @Field(() => String)
    name!: string;
    @Field(() => String)
    city!: string;
    @Field(() => String)
    latitude!: string;
    @Field(() => String)
    longitude!: string;
}

@InputType()
class IdInput {
    @Field(() => Number)
    id!: number;
  
}




@ObjectType()
class SiteQueryResponse {
    @Field(() => [Site], { nullable: true })
    sites?:any[]

    @Field(() => String, { nullable: true })
    error?:String
    
}
@ObjectType()
class SiteFieldError {
    @Field(() => String)
    field!: string;
    @Field(() => String)
    message!: string;
}
@ObjectType()
class SiteResponse {
    @Field(() => [SiteFieldError], { nullable: true })
    errors?: SiteFieldError[];

    @Field(() => Site, { nullable: true })
    site?: any;
}
@ObjectType()
class DeleteRespone {
    @Field(() => Boolean)
    success: boolean

    @Field(() => String)
    msg: string
}
@Resolver()
export class SiteResolver {
    @Query(() => SiteQueryResponse)
    async getMySites(@Ctx() {userId}:MyContext): Promise<SiteQueryResponse> {
        if(!userId){
           throw new ApolloError("you must be login");
        }
        const sites = await prisma.site
            .findMany({
                where: {
                    userId: userId,
                },
                
            });
            
            return {
               sites
            };
    }

    @Query(() => SiteResponse)
    async getSite(
        @Arg("options", () => IdInput) options: IdInput,
    ): Promise<SiteResponse> {
        
        const site = await prisma.site
            .findFirst({
                where: {
                    id: options.id,
                },
                include: {
                    siteLogs: {
                        include: {
                            user: true,
                        }
                    },
                    user: true,
                }
                
            });
            if(!site){
                throw new ApolloError("Site not found");
            }
            
            return {
               site
            };
    }

    @Query(() => SiteQueryResponse)
    async getSites(): Promise<SiteQueryResponse> {
        
        const sites = await prisma.site
            .findMany({
                include: {
                    user: true,
                }
            }
            );
            console.log(sites);
            
            return {
               sites
            };
    }


    @Mutation(() => SiteResponse)
    async createSite(
        @Arg("options", () => SiteInput) options: SiteInput,
        @Ctx() {userId}:MyContext
    ): Promise<SiteResponse> {

        if (options.name.length < 3) {
           throw new ApolloError("name too short"); 
        }
        
        if(!userId){
            throw new ApolloError("you must be login"); 
           
        }
        const site= await prisma.site.create({
            data:{
                name: options.name,
                city: options.city,
                latitude: options.latitude,
                longitude: options.longitude,
                userId: userId
            }});

            return {
                site
            };
            
     
    }

    @Mutation(() => SiteResponse)
    async updateSite(
        @Arg("options", () => SiteEditInput) options: SiteEditInput,
        @Ctx() {userId}:MyContext
    ): Promise<SiteResponse> {
      
        if (options.name.length < 3) {
            throw new ApolloError("name too short"); 
         }
         
         if(!userId){
             throw new ApolloError("you must be login"); 
            
         }
        await prisma.siteLog.create({
            data:{
                siteId: options.id,
                userId: userId,
            }
        });
        const site= await prisma.site.update({
            where: {
                id: options.id
            },
            data:{
                name: options.name,
                city: options.city,
                latitude: options.latitude,
                longitude: options.longitude,
                userId: userId
            },
            include: {
                siteLogs: {
                    include: {
                        user: true,
                    }
                },
                user: true,
            }
            
        });

        console.log(site);
            
            return {
                site
            };

        }

        @Mutation(() => DeleteRespone)
        async deleteSite(
            @Arg("options", () => IdInput) options: IdInput,
            @Ctx() {userId}:MyContext
        ): Promise<DeleteRespone> {
          
            
           
             if(!userId){
                 throw new ApolloError("you must be login"); 
                
             }
             const site =await prisma.site.findFirst({
                where: {
                    id: options.id,
                },
            });
         
            if(site?.userId!=userId){
                throw new ApolloError("you can't delete this site");
            }
            await prisma.siteLog.deleteMany({
                where: {
                    siteId: options.id,
                },
            });
            await prisma.site.delete({
                where: {
                    id: options.id,
                },
            });
          
            return {
                success: true,
                msg: "site deleted"
            };
    
            }

       


}
