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
exports.SiteResolver = void 0;
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const client_1 = __importDefault(require("@prisma/client"));
const apollo_server_express_1 = require("apollo-server-express");
const prisma = new client_1.default.PrismaClient();
let SiteUser = class SiteUser {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Number)
], SiteUser.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteUser.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteUser.prototype, "email", void 0);
SiteUser = __decorate([
    (0, type_graphql_1.ObjectType)()
], SiteUser);
let SiteLog = class SiteLog {
};
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], SiteLog.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => SiteUser),
    __metadata("design:type", SiteUser)
], SiteLog.prototype, "user", void 0);
SiteLog = __decorate([
    (0, type_graphql_1.ObjectType)()
], SiteLog);
let Site = class Site {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Number)
], Site.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Site.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Site.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Site.prototype, "latitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Site.prototype, "longitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => SiteUser),
    __metadata("design:type", SiteUser)
], Site.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [SiteLog]),
    __metadata("design:type", Array)
], Site.prototype, "siteLogs", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Site.prototype, "createdAt", void 0);
Site = __decorate([
    (0, type_graphql_1.ObjectType)()
], Site);
let SiteInput = class SiteInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteInput.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteInput.prototype, "latitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteInput.prototype, "longitude", void 0);
SiteInput = __decorate([
    (0, type_graphql_1.InputType)()
], SiteInput);
let SiteEditInput = class SiteEditInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], SiteEditInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteEditInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteEditInput.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteEditInput.prototype, "latitude", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteEditInput.prototype, "longitude", void 0);
SiteEditInput = __decorate([
    (0, type_graphql_1.InputType)()
], SiteEditInput);
let IdInput = class IdInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], IdInput.prototype, "id", void 0);
IdInput = __decorate([
    (0, type_graphql_1.InputType)()
], IdInput);
let SiteQueryResponse = class SiteQueryResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [Site], { nullable: true }),
    __metadata("design:type", Array)
], SiteQueryResponse.prototype, "sites", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SiteQueryResponse.prototype, "error", void 0);
SiteQueryResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], SiteQueryResponse);
let SiteFieldError = class SiteFieldError {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteFieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SiteFieldError.prototype, "message", void 0);
SiteFieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], SiteFieldError);
let SiteResponse = class SiteResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [SiteFieldError], { nullable: true }),
    __metadata("design:type", Array)
], SiteResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Site, { nullable: true }),
    __metadata("design:type", Object)
], SiteResponse.prototype, "site", void 0);
SiteResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], SiteResponse);
let DeleteRespone = class DeleteRespone {
};
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], DeleteRespone.prototype, "success", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DeleteRespone.prototype, "msg", void 0);
DeleteRespone = __decorate([
    (0, type_graphql_1.ObjectType)()
], DeleteRespone);
let SiteResolver = class SiteResolver {
    async getMySites({ userId }) {
        if (!userId) {
            throw new apollo_server_express_1.ApolloError("you must be login");
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
    async getSite(options) {
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
        if (!site) {
            throw new apollo_server_express_1.ApolloError("Site not found");
        }
        return {
            site
        };
    }
    async getSites() {
        const sites = await prisma.site
            .findMany({
            include: {
                user: true,
            }
        });
        console.log(sites);
        return {
            sites
        };
    }
    async createSite(options, { userId }) {
        if (options.name.length < 3) {
            throw new apollo_server_express_1.ApolloError("name too short");
        }
        if (!userId) {
            throw new apollo_server_express_1.ApolloError("you must be login");
        }
        const site = await prisma.site.create({
            data: {
                name: options.name,
                city: options.city,
                latitude: options.latitude,
                longitude: options.longitude,
                userId: userId
            }
        });
        return {
            site
        };
    }
    async updateSite(options, { userId }) {
        if (options.name.length < 3) {
            throw new apollo_server_express_1.ApolloError("name too short");
        }
        if (!userId) {
            throw new apollo_server_express_1.ApolloError("you must be login");
        }
        await prisma.siteLog.create({
            data: {
                siteId: options.id,
                userId: userId,
            }
        });
        const site = await prisma.site.update({
            where: {
                id: options.id
            },
            data: {
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
    async deleteSite(options, { userId }) {
        if (!userId) {
            throw new apollo_server_express_1.ApolloError("you must be login");
        }
        const site = await prisma.site.findFirst({
            where: {
                id: options.id,
            },
        });
        if ((site === null || site === void 0 ? void 0 : site.userId) != userId) {
            throw new apollo_server_express_1.ApolloError("you can't delete this site");
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
};
__decorate([
    (0, type_graphql_1.Query)(() => SiteQueryResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteResolver.prototype, "getMySites", null);
__decorate([
    (0, type_graphql_1.Query)(() => SiteResponse),
    __param(0, (0, type_graphql_1.Arg)("options", () => IdInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [IdInput]),
    __metadata("design:returntype", Promise)
], SiteResolver.prototype, "getSite", null);
__decorate([
    (0, type_graphql_1.Query)(() => SiteQueryResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteResolver.prototype, "getSites", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SiteResponse),
    __param(0, (0, type_graphql_1.Arg)("options", () => SiteInput)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SiteInput, Object]),
    __metadata("design:returntype", Promise)
], SiteResolver.prototype, "createSite", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SiteResponse),
    __param(0, (0, type_graphql_1.Arg)("options", () => SiteEditInput)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SiteEditInput, Object]),
    __metadata("design:returntype", Promise)
], SiteResolver.prototype, "updateSite", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => DeleteRespone),
    __param(0, (0, type_graphql_1.Arg)("options", () => IdInput)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [IdInput, Object]),
    __metadata("design:returntype", Promise)
], SiteResolver.prototype, "deleteSite", null);
SiteResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SiteResolver);
exports.SiteResolver = SiteResolver;
//# sourceMappingURL=Site.js.map