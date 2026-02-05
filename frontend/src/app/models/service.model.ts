export interface Service {
  id?: number;
  title: string;
  description: string;
  status: 'pending' | 'done';
  user_id: number;
}
