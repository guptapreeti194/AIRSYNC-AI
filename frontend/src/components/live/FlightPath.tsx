import { motion } from "framer-motion";
import { MapPin, Navigation, Plane } from "lucide-react";
import type { Vehicle } from "../../types/live/list_type";

export interface Waypoint {
  id: number;
  name: string;
  lat: number;
  lng: number;
  altitude: number;
  time: string;
  speed: number;
  distance: number;
}

interface FlightPathProps {
  vehicle: Vehicle;
}

// Hardcoded flight paths for different vehicle types
// Export this function so it can be used by VehicleMap
export const generateFlightPath = (vehicle: Vehicle): Waypoint[] => {
  const type = vehicle.type?.toLowerCase() || "";

  if (type === "car" || type.includes("airplane") || type.includes("plane")) {
    // Long-haul airplane flight path
    return [
      {
        id: 1,
        name: "Departure - Mumbai Airport (BOM)",
        lat: 19.0896,
        lng: 72.8656,
        altitude: 0,
        time: "10:00 AM",
        speed: 0,
        distance: 0,
      },
      {
        id: 2,
        name: "Climb Phase",
        lat: 19.5,
        lng: 73.2,
        altitude: 3000,
        time: "10:12 AM",
        speed: 420,
        distance: 45,
      },
      {
        id: 3,
        name: "Cruising - Madhya Pradesh",
        lat: 22.5,
        lng: 75.8,
        altitude: 10500,
        time: "11:15 AM",
        speed: 850,
        distance: 485,
      },
      {
        id: 4,
        name: "Cruising - Uttar Pradesh",
        lat: 26.2,
        lng: 78.5,
        altitude: 11200,
        time: "12:30 PM",
        speed: 880,
        distance: 895,
      },
      {
        id: 5,
        name: "Descent Phase - Delhi Approach",
        lat: 28.3,
        lng: 77.0,
        altitude: 4500,
        time: "13:20 PM",
        speed: 520,
        distance: 1120,
      },
      {
        id: 6,
        name: "Arrival - Delhi Airport (DEL)",
        lat: 28.5562,
        lng: 77.1,
        altitude: 0,
        time: "13:35 PM",
        speed: 0,
        distance: 1180,
      },
    ];
  } else if (
    type === "truck" ||
    type.includes("helicopter") ||
    type.includes("chopper")
  ) {
    // Helicopter medical/rescue flight path
    return [
      {
        id: 1,
        name: "Takeoff - Mumbai Helipad",
        lat: 19.076,
        lng: 72.8777,
        altitude: 0,
        time: "09:00 AM",
        speed: 0,
        distance: 0,
      },
      {
        id: 2,
        name: "En Route - Coastal Path",
        lat: 19.2,
        lng: 72.95,
        altitude: 450,
        time: "09:15 AM",
        speed: 180,
        distance: 22,
      },
      {
        id: 3,
        name: "Mid Point - Thane Region",
        lat: 19.35,
        lng: 73.1,
        altitude: 850,
        time: "09:28 AM",
        speed: 195,
        distance: 45,
      },
      {
        id: 4,
        name: "Descent - Hospital Approach",
        lat: 19.48,
        lng: 73.18,
        altitude: 320,
        time: "09:38 AM",
        speed: 120,
        distance: 62,
      },
      {
        id: 5,
        name: "Landing - Destination Hospital",
        lat: 19.52,
        lng: 73.2,
        altitude: 0,
        time: "09:45 AM",
        speed: 0,
        distance: 68,
      },
    ];
  } else if (
    type === "excavator" ||
    type.includes("drone") ||
    type.includes("quadcopter")
  ) {
    // Drone surveillance/delivery path
    return [
      {
        id: 1,
        name: "Launch Point - Distribution Center",
        lat: 18.5204,
        lng: 73.8567,
        altitude: 0,
        time: "02:00 PM",
        speed: 0,
        distance: 0,
      },
      {
        id: 2,
        name: "Ascent - Safety Altitude",
        lat: 18.525,
        lng: 73.86,
        altitude: 80,
        time: "02:02 PM",
        speed: 35,
        distance: 0.8,
      },
      {
        id: 3,
        name: "Waypoint 1 - Urban Area",
        lat: 18.54,
        lng: 73.87,
        altitude: 120,
        time: "02:08 PM",
        speed: 45,
        distance: 2.5,
      },
      {
        id: 4,
        name: "Waypoint 2 - Crossing Bridge",
        lat: 18.558,
        lng: 73.885,
        altitude: 150,
        time: "02:13 PM",
        speed: 50,
        distance: 4.2,
      },
      {
        id: 5,
        name: "Waypoint 3 - Residential Zone",
        lat: 18.575,
        lng: 73.895,
        altitude: 95,
        time: "02:18 PM",
        speed: 42,
        distance: 6.0,
      },
      {
        id: 6,
        name: "Descent - Delivery Location",
        lat: 18.59,
        lng: 73.905,
        altitude: 25,
        time: "02:22 PM",
        speed: 20,
        distance: 7.5,
      },
      {
        id: 7,
        name: "Landing - Customer Location",
        lat: 18.595,
        lng: 73.91,
        altitude: 0,
        time: "02:25 PM",
        speed: 0,
        distance: 8.2,
      },
    ];
  }

  // Default path for other types
  return [
    {
      id: 1,
      name: "Start Point",
      lat: vehicle.lat || 19.0,
      lng: vehicle.lng || 72.8,
      altitude: 100,
      time: "12:00 PM",
      speed: 0,
      distance: 0,
    },
    {
      id: 2,
      name: "End Point",
      lat: (vehicle.lat || 19.0) + 0.5,
      lng: (vehicle.lng || 72.8) + 0.5,
      altitude: 100,
      time: "12:30 PM",
      speed: 50,
      distance: 50,
    },
  ];
};

const FlightPath = ({ vehicle }: FlightPathProps) => {
  const waypoints = generateFlightPath(vehicle);

  const getAltitudeColor = (altitude: number) => {
    if (altitude === 0) return "bg-gray-400";
    if (altitude < 100) return "bg-green-500";
    if (altitude < 500) return "bg-blue-500";
    if (altitude < 3000) return "bg-purple-500";
    return "bg-indigo-600";
  };

  const getAltitudeColorText = (altitude: number) => {
    if (altitude === 0) return "text-gray-600";
    if (altitude < 100) return "text-green-600";
    if (altitude < 500) return "text-blue-600";
    if (altitude < 3000) return "text-purple-600";
    return "text-indigo-600";
  };

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-6">
        <Navigation className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Flight Path - {vehicle.vehicleNumber}
        </h4>
      </div>

      {/* Flight Path Visualization */}
      <div className="relative">
        <div className="overflow-x-auto pb-3">
          <div className="relative min-w-max">
            {/* SVG Curved Path */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient
                  id="pathGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {/* Draw curved path connecting waypoints */}
              {waypoints.map((waypoint, index) => {
                if (index === waypoints.length - 1) return null;
                const startX = (index / (waypoints.length - 1)) * 100;
                const endX = ((index + 1) / (waypoints.length - 1)) * 100;
                const controlX = (startX + endX) / 2;
                const controlY = -10; // Curve upward

                return (
                  <path
                    key={waypoint.id}
                    d={`M ${startX}% 50% Q ${controlX}% ${
                      50 + controlY
                    }% ${endX}% 50%`}
                    stroke="url(#pathGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>

            {/* Waypoints */}
            <div
              className="relative flex items-center gap-4 px-1"
              style={{ zIndex: 1 }}
            >
              {waypoints.map((waypoint, index) => (
                <motion.div
                  key={waypoint.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  className="flex w-[220px] flex-shrink-0 flex-col items-center"
                >
              {/* Waypoint Card */}
              <div className="mb-4 w-full rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                {/* Waypoint Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-full ${getAltitudeColor(
                      waypoint.altitude
                    )} flex items-center justify-center text-white font-bold shadow-md`}
                  >
                    {waypoint.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                      {waypoint.name}
                    </p>
                  </div>
                </div>

                {/* Location Info */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Coordinates
                      </p>
                      <p className="text-xs font-mono font-medium text-gray-900 dark:text-white break-all">
                        {waypoint.lat.toFixed(4)}°N
                      </p>
                      <p className="text-xs font-mono font-medium text-gray-900 dark:text-white break-all">
                        {waypoint.lng.toFixed(4)}°E
                      </p>
                    </div>
                  </div>

                  {/* Altitude */}
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-900 rounded">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Altitude
                    </span>
                    <span
                      className={`text-sm font-bold ${getAltitudeColorText(
                        waypoint.altitude
                      )}`}
                    >
                      {waypoint.altitude} m
                    </span>
                  </div>

                  {/* Speed */}
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-900 rounded">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Speed
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {waypoint.speed} km/h
                    </span>
                  </div>

                  {/* Time */}
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-900 rounded">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Time
                    </span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {waypoint.time}
                    </span>
                  </div>

                  {/* Distance */}
                  {waypoint.distance > 0 && (
                    <div className="flex items-center justify-between py-2 px-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Distance
                      </span>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {waypoint.distance} km
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Waypoint Marker Icon */}
              <div className="relative">
                <div
                  className={`w-4 h-4 rounded-full ${getAltitudeColor(
                    waypoint.altitude
                  )} border-2 border-white dark:border-gray-800 shadow-lg`}
                ></div>
                {index === 0 && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded font-semibold whitespace-nowrap">
                      Start
                    </div>
                  </div>
                )}
                {index === waypoints.length - 1 && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold whitespace-nowrap">
                      End
                    </div>
                  </div>
                )}
              </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Flight Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2 mb-3">
            <Plane className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h5 className="font-semibold text-gray-900 dark:text-white">
              Flight Summary
            </h5>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total Waypoints
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {waypoints.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total Distance
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {waypoints[waypoints.length - 1]?.distance || 0} km
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Max Altitude
              </p>
              <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {Math.max(...waypoints.map((w) => w.altitude))} m
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Max Speed
              </p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {Math.max(...waypoints.map((w) => w.speed))} km/h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Altitude Legend
        </h5>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-400"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Ground (0m)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Low ({"<"}100m)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Medium (100-500m)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              High (500-3000m)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Cruise ({">"}3000m)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightPath;
