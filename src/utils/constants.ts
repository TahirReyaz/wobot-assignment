export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

export const statusOptions = ["Active", "Inactive"];

export const healthGrades = {
  A: { color: "green", value: 100 },
  B: { color: "lightgreen", value: 80 },
  C: { color: "yellow", value: 60 },
  D: { color: "orange", value: 40 },
  E: { color: "darkorange", value: 20 },
  F: { color: "red", value: 5 },
};
