export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  icon: string;
  website: string;
  featured: boolean;
  rating: number;
}
