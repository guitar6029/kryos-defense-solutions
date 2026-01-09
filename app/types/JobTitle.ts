export const JOB_TITLES = ["ceo", "cto", "csoo", "director"] as const;
export type JobTitle = (typeof JOB_TITLES)[number];
