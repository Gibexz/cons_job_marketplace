import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
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
export const TransactionIsolationLevel = {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
};
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
//# sourceMappingURL=prismaNamespaceBrowser.js.map