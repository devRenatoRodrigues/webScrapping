export type LinkedInFilterButton = 'Jobs' | 'People' | 'Services' | 'Posts' | 'Groups' | 'Companies';
export interface ILinkedInAuth {
  user: string;
  password: string;
}


export interface ILinkedInFindJobsRequest {
  auth: ILinkedInAuth;
  query: string;
  quantity?: number;
  filterButton: LinkedInFilterButton;
}

export interface ILinkedInJobs {
  createdAt: Date;
  job: string;
  url: string;
}