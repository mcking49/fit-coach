export interface User {
  id: string;
  fullname: string;
  email: string;
  admin: boolean;
  startingWeight?: number;
  coachId?: string;
}
