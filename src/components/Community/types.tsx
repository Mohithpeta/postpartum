export interface Group {
    name: string;
    members: number;
    description: string;
    category: string;
  }
  
  export interface SearchFilters {
    query: string;
    topic: string;
  }
  
  export interface JoinRequestData {
    groupName: string;
    note: string;
    timestamp: Date;
  }