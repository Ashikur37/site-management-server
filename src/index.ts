import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SiteResolver } from "./resolvers/Site";


const main = async () => {
 

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      
      resolvers: [UserResolver,SiteResolver],
      validate: false,
    }),
    context: ({ req }: any) => {
      const {authorization}= req.headers;
      if(authorization){
         const {userId}= jwt.verify(authorization,process.env.JWT_SECRET!) as JwtPayload;
         return {userId};
      }
      return {}
    },
  });

  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => res.send("you have not screwed up!"));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};

main().catch((err) => console.error(err));