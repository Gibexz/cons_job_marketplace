import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.2.0",
    engine: "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    Job: 'Job',
    WorkerProfile: 'WorkerProfile',
    JobApplication: 'JobApplication',
    Company: 'Company'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    country: 'country',
    createdAt: 'createdAt',
    profilePhoto: 'profilePhoto'
};
export const JobScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    companyId: 'companyId',
    postedById: 'postedById',
    lat: 'lat',
    lng: 'lng',
    skills: 'skills',
    active: 'active',
    status: 'status',
    createdAt: 'createdAt'
};
export const WorkerProfileScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    skills: 'skills',
    experience: 'experience',
    available: 'available',
    bio: 'bio',
    lat: 'lat',
    lng: 'lng',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const JobApplicationScalarFieldEnum = {
    id: 'id',
    jobId: 'jobId',
    workerId: 'workerId',
    status: 'status',
    createdAt: 'createdAt'
};
export const CompanyScalarFieldEnum = {
    id: 'id',
    name: 'name',
    logo: 'logo',
    address: 'address',
    rating: 'rating',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map