export interface Resource {
  id: number;
  vampire: number;
  description: string;
  isDiary: boolean;
  isLost: boolean;
}

export interface CreateResourceFormData {
  vampire: number;
  description: string;
  isDiary: boolean;
}

export interface UpdateResourceFormData {
  id: number;
  description: string;
  isDiary: boolean;
  isLost: boolean;
}
