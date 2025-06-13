export interface CrowdAgentStatsI {
  readers: number;
  authors: number;
  books: number;
  literaryagents: number;
  publishers: number;
  freelancers: number;
  piques: number;
  ratings: number;
  impressions: number;
}

export class CrowdAgentStats implements CrowdAgentStatsI {
  public readers: number = 0;
  public authors: number = 0;
  public books: number = 0;
  public literaryagents: number = 0;
  public publishers: number = 0;
  public freelancers: number = 0;
  public piques: number = 0;
  public ratings: number = 0;
  public impressions: number = 0;

  constructor() {}
}
