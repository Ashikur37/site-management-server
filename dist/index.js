"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./resolvers/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Site_1 = require("./resolvers/Site");
const main = async () => {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [User_1.UserResolver, Site_1.SiteResolver],
            validate: false,
        }),
        context: ({ req }) => {
            const { authorization } = req.headers;
            if (authorization) {
                const { userId } = jsonwebtoken_1.default.verify(authorization, process.env.JWT_SECRET);
                return { userId };
            }
            return {};
        },
    });
    await apolloServer.start();
    const app = (0, express_1.default)();
    apolloServer.applyMiddleware({ app });
    app.get("/", (_req, res) => res.send("you have not screwed up!"));
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map