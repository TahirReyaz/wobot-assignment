import axios from "axios";
import { Camera } from "../types/Camera";
import { API_BASE_URL, BEARER_TOKEN } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export const fetchCameras = async (): Promise<Camera[]> => {
  try {
    const response = await axiosInstance.get("/fetch/cameras");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCameraStatus = async (
  id: number,
  status: string
): Promise<void> => {
  try {
    await axiosInstance.put("/update/camera/status", { id, status });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
