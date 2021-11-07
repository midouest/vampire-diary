export interface Skill {
  id: number;
  vampire: number;
  description: string;
  isChecked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillFormData {
  vampire: number;
  description: string;
}

export interface UpdateSkillFormData {
  id: number;
  description: string;
  isChecked: boolean;
}
