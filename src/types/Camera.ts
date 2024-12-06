export type Camera = {
  name: string;
  location: string;
  recorder: string;
  tasks: string;
  status: string;
  _id: string;
  id: number;
  current_status: string;
  health: Health;
  hasWarning: boolean;
};

export type Health = {
  cloud: HealthValue;
  device: HealthValue;
  _id: string;
  id: string;
};

export type HealthValue = "A" | "B" | "C" | "D" | "E" | "F";
