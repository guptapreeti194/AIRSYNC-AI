/**
 * Utility functions for air vehicle management
 * This file contains frontend-only transformations to convert ground vehicle tracking
 * to air vehicle tracking without modifying backend data
 */

import type { Vehicle } from "../types/live/list_type";

/**
 * Generate realistic altitude based on vehicle type and speed
 * @param type - Vehicle type (car, truck, excavator, etc.)
 * @param speed - Current speed in km/h
 * @param existingAltitude - Existing altitude value from backend
 * @returns Altitude in meters
 */
export function generateAltitude(
  type: string,
  speed: number = 0,
  existingAltitude?: string
): string {
  // If altitude already exists and is valid, return it
  if (existingAltitude && existingAltitude !== "0" && existingAltitude !== "") {
    return existingAltitude;
  }

  const normalizedType = type?.toLowerCase() || "";
  let baseAltitude = 0;
  let variance = 0;

  // Map vehicle types to appropriate altitudes for air vehicles
  if (
    normalizedType === "car" ||
    normalizedType.includes("airplane") ||
    normalizedType.includes("plane")
  ) {
    // Airplane - Commercial altitude: 9,000 - 12,000 meters (30,000 - 40,000 feet)
    baseAltitude = 10000;
    variance = 2000;
  } else if (
    normalizedType === "truck" ||
    normalizedType.includes("helicopter") ||
    normalizedType.includes("chopper")
  ) {
    // Helicopter - Lower altitude: 300 - 1,500 meters (1,000 - 5,000 feet)
    baseAltitude = 800;
    variance = 500;
  } else if (
    normalizedType === "excavator" ||
    normalizedType.includes("drone") ||
    normalizedType.includes("quadcopter")
  ) {
    // Drone - Very low altitude: 50 - 400 meters (150 - 1,300 feet)
    baseAltitude = 150;
    variance = 150;
  } else if (normalizedType.includes("van") || normalizedType.includes("bus")) {
    // Keep van/bus at ground level or low altitude
    baseAltitude = 50;
    variance = 30;
  } else {
    // Default for unknown types - assume airplane
    baseAltitude = 10000;
    variance = 2000;
  }

  // Add speed-based variation (higher speed might indicate climbing or descending)
  const speedFactor = Math.min(speed / 100, 1); // Normalize speed to 0-1
  const speedVariance = speedFactor * variance * 0.3;

  // Generate random altitude within range
  const randomVariance = (Math.random() - 0.5) * 2 * variance;
  const altitude = Math.max(
    0,
    Math.round(baseAltitude + randomVariance + speedVariance)
  );

  return altitude.toString();
}

/**
 * Enrich vehicle data with air vehicle attributes
 * This function adds altitude and potentially other air vehicle specific data
 * @param vehicle - Vehicle object from backend
 * @returns Enriched vehicle object
 */
export function enrichVehicleData(vehicle: Vehicle): Vehicle {
  return {
    ...vehicle,
    altitude: generateAltitude(vehicle.type, vehicle.speed, vehicle.altitude),
  };
}

/**
 * Enrich multiple vehicles with air vehicle attributes
 * @param vehicles - Array of vehicle objects
 * @returns Array of enriched vehicle objects
 */
export function enrichVehiclesData(vehicles: Vehicle[]): Vehicle[] {
  return vehicles.map(enrichVehicleData);
}

/**
 * Format altitude for display with appropriate units
 * @param altitude - Altitude in meters
 * @param showFeet - Whether to show feet in addition to meters
 * @returns Formatted altitude string
 */
export function formatAltitude(
  altitude: string | number,
  showFeet: boolean = false
): string {
  const altitudeMeters =
    typeof altitude === "string" ? parseFloat(altitude) : altitude;

  if (isNaN(altitudeMeters)) {
    return "N/A";
  }

  const meters = altitudeMeters.toFixed(0);

  if (showFeet) {
    const feet = (altitudeMeters * 3.28084).toFixed(0);
    return `${meters} m (${feet} ft)`;
  }

  return `${meters} m`;
}

/**
 * Get altitude status color based on vehicle type and altitude
 * @param type - Vehicle type
 * @param altitude - Current altitude in meters
 * @returns Tailwind CSS color class
 */
export function getAltitudeStatusColor(type: string, altitude: number): string {
  const normalizedType = type?.toLowerCase() || "";

  if (
    normalizedType.includes("airplane") ||
    normalizedType.includes("plane") ||
    normalizedType === "car"
  ) {
    // Airplane altitude ranges
    if (altitude > 8000) return "text-green-600";
    if (altitude > 3000) return "text-yellow-600";
    return "text-orange-600";
  } else if (
    normalizedType.includes("helicopter") ||
    normalizedType.includes("chopper") ||
    normalizedType === "truck"
  ) {
    // Helicopter altitude ranges
    if (altitude > 500 && altitude < 2000) return "text-green-600";
    if (altitude < 100 || altitude > 2000) return "text-yellow-600";
    return "text-green-600";
  } else if (
    normalizedType.includes("drone") ||
    normalizedType.includes("quadcopter") ||
    normalizedType === "excavator"
  ) {
    // Drone altitude ranges (regulated under 400m in most countries)
    if (altitude <= 120) return "text-green-600"; // Safe zone
    if (altitude <= 400) return "text-yellow-600"; // Caution zone
    return "text-red-600"; // Potentially illegal zone
  }

  return "text-gray-600";
}

/**
 * Vehicle type display name mapper
 * Maps database vehicle types to air vehicle display names
 */
export const vehicleTypeDisplayNames: Record<string, string> = {
  car: "Airplane",
  truck: "Helicopter",
  excavator: "Drone",
  van: "Cargo Plane",
  bus: "Transport Aircraft",
  airplane: "Airplane",
  plane: "Airplane",
  helicopter: "Helicopter",
  chopper: "Helicopter",
  drone: "Drone",
  quadcopter: "Quadcopter",
};

/**
 * Get display name for vehicle type
 * @param type - Vehicle type from database
 * @returns Display name for air vehicle
 */
export function getVehicleDisplayType(type: string): string {
  const normalizedType = type?.toLowerCase() || "";
  return vehicleTypeDisplayNames[normalizedType] || type;
}
