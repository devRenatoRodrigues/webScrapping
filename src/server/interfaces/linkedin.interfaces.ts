export type LinkedInFilterButton = 'Jobs' | 'People' | 'Services' | 'Posts' | 'Groups' | 'Companies';
export interface ILinkedInAuth {
  user: string;
  password: string;
}


export interface ILinkedInFindJobsRequest {
  query: string;
  quantity?: number;
  filterButton: LinkedInFilterButton;
}

export interface ILinkedInJobs {
  name: string;
  url: string;
}