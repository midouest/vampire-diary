export interface Event {
  id: number;
  vampire: number;
  prompt: string;
  description: string;
}

export interface CreateEventFormData {
  vampire: number;
}

export interface UpdateEventFormData {
  id: number;
  description: string;
}
