export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  code: number;
  message: string;
  data: Category[];
}
