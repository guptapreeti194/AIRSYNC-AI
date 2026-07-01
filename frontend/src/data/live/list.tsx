import type { Vehicle } from "../../types/live/list_type";
import axios from "axios";
import { enrichVehiclesData } from "../../lib/airVehicleUtils";

// Mock data for the vehicles
export const mockVehicles: Vehicle[] = [];

// Function to simulate API call to fetch vehicles
export async function fetchVehicles(userId: string) {
  // Simulate API delay
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/live/${userId}`,
    {
      groups: [],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
      },
    }
  );

  console.log("Fetched vehicles:", res.data.message);

  // Enrich vehicle data with altitude for air vehicle management
  const vehicles = res.data.message as Vehicle[];
  const enrichedVehicles = enrichVehiclesData(vehicles);

  return enrichedVehicles;
}
