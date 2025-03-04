export interface Group {
    name: string;
    category: string;
    image: string;
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