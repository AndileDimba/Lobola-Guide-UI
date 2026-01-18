export interface Theme {
  primary: string;
  primaryDark: string;
  accent: string;
  border: string;
  ring: string;
  button: string;
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