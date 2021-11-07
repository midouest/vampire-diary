export interface Character {
  id: number;
  name: string;
  description: string;
  isImmortal: boolean;
  isDead: boolean;
}

export interface CreateCharacterFormData {
  vampire: number;
  name: string;
  description: string;
  isImmortal: boolean;
}

export interface UpdateCharacterFormData {
  id: number;
  name: string;
  description: string;
  isImmortal: boolean;
  isDead: boolean;
}
