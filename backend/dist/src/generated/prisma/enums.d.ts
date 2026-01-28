export declare const ExperienceLevel: {
    readonly BEGINNER: "BEGINNER";
    readonly INTERMEDIATE: "INTERMEDIATE";
    readonly PROFESSIONAL: "PROFESSIONAL";
    readonly EXPERT: "EXPERT";
};
export type ExperienceLevel = (typeof ExperienceLevel)[keyof typeof ExperienceLevel];
export declare const JobWorkerStatus: {
    readonly INVITED: "INVITED";
    readonly APPLIED: "APPLIED";
    readonly ACCEPTED: "ACCEPTED";
    readonly REJECTED: "REJECTED";
};
export type JobWorkerStatus = (typeof JobWorkerStatus)[keyof typeof JobWorkerStatus];
