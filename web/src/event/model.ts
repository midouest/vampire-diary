export interface Event {
  id: number;
  vampire: number;
  prompt: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventFormData {
  vampire: number;
}

export interface UpdateEventFormData {
  id: number;
  description: string;
}
