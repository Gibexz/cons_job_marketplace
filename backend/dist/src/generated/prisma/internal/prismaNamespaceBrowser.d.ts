import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Job: "Job";
    readonly WorkerProfile: "WorkerProfile";
    readonly JobWorker: "JobWorker";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly name: "name";
    readonly country: "country";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const JobScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly company: "company";
    readonly postedById: "postedById";
    readonly lat: "lat";
    readonly lng: "lng";
    readonly skills: "skills";
    readonly active: "active";
    readonly createdAt: "createdAt";
};
export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum];
export declare const WorkerProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly skills: "skills";
    readonly experience: "experience";
    readonly available: "available";
    readonly bio: "bio";
    readonly lat: "lat";
    readonly lng: "lng";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WorkerProfileScalarFieldEnum = (typeof WorkerProfileScalarFieldEnum)[keyof typeof WorkerProfileScalarFieldEnum];
export declare const JobWorkerScalarFieldEnum: {
    readonly id: "id";
    readonly jobId: "jobId";
    readonly workerId: "workerId";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type JobWorkerScalarFieldEnum = (typeof JobWorkerScalarFieldEnum)[keyof typeof JobWorkerScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
