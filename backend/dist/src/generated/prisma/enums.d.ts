export declare const JobStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly CLOSED: "CLOSED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly DRAFT: "DRAFT";
};
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];
export declare const ExperienceLevel: {
    readonly BEGINNER: "BEGINNER";
    readonly INTERMEDIATE: "INTERMEDIATE";
    readonly PROFESSIONAL: "PROFESSIONAL";
    readonly EXPERT: "EXPERT";
};
export type ExperienceLevel = (typeof ExperienceLevel)[keyof typeof ExperienceLevel];
export declare const JobApplicationStatus: {
    readonly INVITED: "INVITED";
    readonly APPLIED: "APPLIED";
    readonly ACCEPTED: "ACCEPTED";
    readonly REJECTED: "REJECTED";
    readonly COMPLETED: "COMPLETED";
};
export type JobApplicationStatus = (typeof JobApplicationStatus)[keyof typeof JobApplicationStatus];
