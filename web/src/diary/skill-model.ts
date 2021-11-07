export interface Skill {
  id: number;
  vampire: number;
  description: string;
  isChecked: boolean;
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
