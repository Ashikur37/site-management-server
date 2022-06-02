"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const client_1 = __importDefault(require("@prisma/client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const apollo_server_express_1 = require("apollo-server-express");
const prisma = new client_1.default.PrismaClient();
let emailRegx = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
let SignupInput = class SignupInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SignupInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SignupInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SignupInput.prototype, "password", void 0);
SignupInput = __decorate([
    (0, type_graphql_1.InputType)()
], SignupInput);
let SigninInput = class SigninInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SigninInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SigninInput.prototype, "password", void 0);
SigninInput = __decorate([
    (0, type_graphql_1.InputType)()
], SigninInput);
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserResponse.prototype, "token", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserQueryResponse = class UserQueryResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => User, { nullable: true }),
    __metadata("design:type", User)
], UserQueryResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserQueryResponse.prototype, "error", void 0);
UserQueryResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserQueryResponse);
let UserResolver = class UserResolver {
    async me({ userId }) {
        if (!userId) {
            throw new apollo_server_express_1.ApolloError("Invalid token");
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
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        };
    }
    async signup(options) {
        if (options.name.length < 3) {
            throw new apollo_server_express_1.ApolloError("Name is too short");
        }
        if (options.password.length < 3) {
            throw new apollo_server_express_1.ApolloError("Password is too short");
        }
        if (!emailRegx.test(options.email)) {
            throw new apollo_server_express_1.ApolloError("Email is invalid");
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
            throw new apollo_server_express_1.ApolloError("Email is already exist");
        }
        const hashedPassword = await argon2_1.default.hash(options.password);
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
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
        }, process.env.JWT_SECRET);
        return {
            token,
        };
    }
    async signin(options) {
        if (options.password.length < 3) {
            throw new apollo_server_express_1.ApolloError("Password is too short");
        }
        if (!emailRegx.test(options.email)) {
            throw new apollo_server_express_1.ApolloError("Email is invalid");
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
            throw new apollo_server_express_1.ApolloError("Email doesn't exist");
        }
        const match = await argon2_1.default.verify(user.password, options.password);
        if (!match) {
            throw new apollo_server_express_1.ApolloError("Password is incorrect");
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
        }, process.env.JWT_SECRET);
        return {
            token,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => UserQueryResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options", () => SignupInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignupInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signup", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options", () => SigninInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SigninInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signin", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=User.js.map