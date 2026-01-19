export interface Theme {
  primary: string;
  headerBg: string;
  accent: string;
  border: string;
  ring: string;
  button: string;
  iconColor: string;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface NationData {
  id: string;
  nationName: string;
  theme: Theme;
  steps: Step[];
}

export interface StepCardProps {
  step: Step;
  isActive: boolean;
  isCompleted?: boolean;
  theme: Theme;
  onComplete: () => void;
  onActivate?: () => void;
  index?: number;
}