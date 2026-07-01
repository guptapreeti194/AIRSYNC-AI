export const getVehicle3DSVG = (type: string) => {
  switch (type?.toLowerCase()) {
    case "car":
    case "airplane":
    case "plane":
      // 3D Airplane with modern style (mapped from car)
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 80 80"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
        >
          {/* Airplane shadow */}
          <ellipse cx="40" cy="70" rx="30" ry="6" fill="rgba(0,0,0,0.15)" />

          {/* Fuselage (body) */}
          <ellipse
            cx="40"
            cy="40"
            rx="28"
            ry="8"
            fill="#4285F4"
            stroke="#1A73E8"
            strokeWidth="1"
          />
          <ellipse cx="40" cy="40" rx="24" ry="6" fill="#5A9BF5" />

          {/* Cockpit */}
          <ellipse
            cx="60"
            cy="40"
            rx="8"
            ry="6"
            fill="#6FA8F6"
            stroke="#1A73E8"
            strokeWidth="1"
          />
          <ellipse cx="62" cy="40" rx="4" ry="4" fill="#87CEEB" opacity="0.9" />

          {/* Main wings */}
          <ellipse
            cx="40"
            cy="40"
            rx="6"
            ry="32"
            fill="#4285F4"
            stroke="#1A73E8"
            strokeWidth="1"
          />
          <ellipse cx="40" cy="40" rx="4" ry="30" fill="#5A9BF5" />

          {/* Wing details */}
          <path
            d="M36 12 L38 10 L42 10 L44 12 L42 68 L38 68 Z"
            fill="#1A73E8"
            opacity="0.3"
          />

          {/* Tail wing (horizontal stabilizer) */}
          <ellipse
            cx="16"
            cy="40"
            rx="4"
            ry="12"
            fill="#4285F4"
            stroke="#1A73E8"
            strokeWidth="1"
          />
          <ellipse cx="16" cy="40" rx="2" ry="10" fill="#5A9BF5" />

          {/* Vertical stabilizer (tail fin) */}
          <path
            d="M12 30 L12 50 L18 46 L18 34 Z"
            fill="#6FA8F6"
            stroke="#1A73E8"
            strokeWidth="1"
          />

          {/* Engine nacelles */}
          <ellipse
            cx="40"
            cy="16"
            rx="3"
            ry="8"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <ellipse
            cx="40"
            cy="64"
            rx="3"
            ry="8"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <circle cx="40" cy="14" r="2" fill="#666" />
          <circle cx="40" cy="66" r="2" fill="#666" />

          {/* Fuselage details */}
          <ellipse cx="45" cy="40" rx="12" ry="4" fill="#FFF" opacity="0.2" />
          <circle cx="55" cy="38" r="2" fill="#87CEEB" opacity="0.8" />
          <circle cx="50" cy="42" r="1.5" fill="#87CEEB" opacity="0.7" />
        </svg>
      );

    case "excavator":
    case "drone":
    case "quadcopter":
      // 3D Drone with modern design (mapped from excavator)
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 80 80"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
        >
          {/* Drone shadow */}
          <ellipse cx="40" cy="70" rx="32" ry="6" fill="rgba(0,0,0,0.15)" />

          {/* Center body */}
          <circle
            cx="40"
            cy="40"
            r="12"
            fill="#34A853"
            stroke="#137333"
            strokeWidth="1.5"
          />
          <circle cx="40" cy="40" r="9" fill="#4BB366" />
          <circle
            cx="40"
            cy="40"
            r="6"
            fill="#2D7D32"
            stroke="#137333"
            strokeWidth="0.5"
          />

          {/* Camera/gimbal */}
          <ellipse
            cx="40"
            cy="46"
            rx="5"
            ry="6"
            fill="#333"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <circle
            cx="40"
            cy="48"
            r="3"
            fill="#666"
            stroke="#333"
            strokeWidth="0.5"
          />
          <circle cx="40" cy="48" r="2" fill="#87CEEB" opacity="0.8" />

          {/* Arms - four extending from center */}
          {/* Top-left arm */}
          <line
            x1="32"
            y1="32"
            x2="16"
            y2="16"
            stroke="#137333"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="32"
            y1="32"
            x2="16"
            y2="16"
            stroke="#34A853"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Top-right arm */}
          <line
            x1="48"
            y1="32"
            x2="64"
            y2="16"
            stroke="#137333"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="48"
            y1="32"
            x2="64"
            y2="16"
            stroke="#34A853"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Bottom-left arm */}
          <line
            x1="32"
            y1="48"
            x2="16"
            y2="64"
            stroke="#137333"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="32"
            y1="48"
            x2="16"
            y2="64"
            stroke="#34A853"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Bottom-right arm */}
          <line
            x1="48"
            y1="48"
            x2="64"
            y2="64"
            stroke="#137333"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="48"
            y1="48"
            x2="64"
            y2="64"
            stroke="#34A853"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Propeller motors */}
          <circle
            cx="16"
            cy="16"
            r="6"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <circle
            cx="64"
            cy="16"
            r="6"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <circle
            cx="16"
            cy="64"
            r="6"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <circle
            cx="64"
            cy="64"
            r="6"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />

          {/* Propeller blades (spinning effect) */}
          <ellipse cx="16" cy="16" rx="8" ry="2" fill="#666" opacity="0.6" />
          <ellipse cx="16" cy="16" rx="2" ry="8" fill="#666" opacity="0.6" />
          <ellipse cx="64" cy="16" rx="8" ry="2" fill="#666" opacity="0.6" />
          <ellipse cx="64" cy="16" rx="2" ry="8" fill="#666" opacity="0.6" />
          <ellipse cx="16" cy="64" rx="8" ry="2" fill="#666" opacity="0.6" />
          <ellipse cx="16" cy="64" rx="2" ry="8" fill="#666" opacity="0.6" />
          <ellipse cx="64" cy="64" rx="8" ry="2" fill="#666" opacity="0.6" />
          <ellipse cx="64" cy="64" rx="2" ry="8" fill="#666" opacity="0.6" />

          {/* LED indicators */}
          <circle cx="38" cy="36" r="1.5" fill="#FF6B6B" opacity="0.9" />
          <circle cx="42" cy="36" r="1.5" fill="#4CAF50" opacity="0.9" />
        </svg>
      );

    case "truck":
    case "helicopter":
    case "chopper":
      // 3D Helicopter with aviation style (mapped from truck)
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 80 80"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
        >
          {/* Helicopter shadow */}
          <ellipse cx="40" cy="70" rx="28" ry="6" fill="rgba(0,0,0,0.15)" />

          {/* Main rotor (spinning blades) */}
          <ellipse cx="40" cy="22" rx="32" ry="3" fill="#666" opacity="0.4" />
          <ellipse cx="40" cy="22" rx="3" ry="32" fill="#666" opacity="0.4" />
          <circle
            cx="40"
            cy="22"
            r="4"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />

          {/* Rotor mast */}
          <rect
            x="38"
            y="22"
            width="4"
            height="12"
            fill="#9E9E9E"
            stroke="#757575"
            strokeWidth="0.5"
          />

          {/* Main body/fuselage */}
          <ellipse
            cx="40"
            cy="45"
            rx="18"
            ry="12"
            fill="#FF9800"
            stroke="#F57C00"
            strokeWidth="1"
          />
          <ellipse cx="40" cy="45" rx="15" ry="10" fill="#FFA726" />

          {/* Cabin (cockpit) */}
          <path
            d="M30 38 L30 50 L54 50 L54 38 L50 34 L34 34 Z"
            fill="#FFB74D"
            stroke="#F57C00"
            strokeWidth="1"
          />

          {/* Windshield */}
          <path
            d="M32 38 L32 45 L48 45 L48 38 L46 35 L34 35 Z"
            fill="#87CEEB"
            opacity="0.9"
            stroke="#FFB74D"
            strokeWidth="0.5"
          />
          <path
            d="M34 39 L34 43 L38 43 L38 39 Z"
            fill="#B8E0FF"
            opacity="0.7"
          />
          <path
            d="M42 39 L42 43 L46 43 L46 39 Z"
            fill="#B8E0FF"
            opacity="0.7"
          />

          {/* Side windows */}
          <ellipse cx="28" cy="44" rx="3" ry="5" fill="#87CEEB" opacity="0.8" />
          <ellipse cx="52" cy="44" rx="3" ry="5" fill="#87CEEB" opacity="0.8" />

          {/* Tail boom */}
          <rect
            x="22"
            y="42"
            width="18"
            height="6"
            fill="#FF8F00"
            stroke="#E65100"
            strokeWidth="1"
            rx="3"
          />
          <rect
            x="10"
            y="43"
            width="12"
            height="4"
            fill="#F57C00"
            stroke="#E65100"
            strokeWidth="1"
            rx="2"
          />

          {/* Tail rotor */}
          <ellipse cx="10" cy="45" rx="1.5" ry="6" fill="#666" opacity="0.5" />
          <circle
            cx="10"
            cy="45"
            r="2"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="0.5"
          />

          {/* Landing skids */}
          <rect
            x="28"
            y="54"
            width="24"
            height="3"
            fill="#333"
            stroke="#1A1A1A"
            strokeWidth="1"
            rx="1.5"
          />
          <rect x="32" y="50" width="3" height="6" fill="#333" rx="1" />
          <rect x="45" y="50" width="3" height="6" fill="#333" rx="1" />

          {/* Skid cross bars */}
          <rect
            x="28"
            y="54"
            width="3"
            height="8"
            fill="#333"
            opacity="0.8"
            rx="1"
          />
          <rect
            x="49"
            y="54"
            width="3"
            height="8"
            fill="#333"
            opacity="0.8"
            rx="1"
          />

          {/* Details - exhaust */}
          <ellipse cx="36" cy="38" rx="2" ry="3" fill="#333" opacity="0.6" />

          {/* Navigation lights */}
          <circle cx="26" cy="45" r="1.5" fill="#FF6B6B" opacity="0.9" />
          <circle cx="54" cy="45" r="1.5" fill="#4CAF50" opacity="0.9" />
        </svg>
      );

    case "van":
    case "bus":
      // 3D Van/Bus with enhanced style
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 80 80"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
        >
          {/* Van shadow */}
          <ellipse cx="40" cy="70" rx="26" ry="8" fill="rgba(0,0,0,0.15)" />

          {/* Van body */}
          <path
            d="M14 32 L14 58 L66 58 L66 32 L64 22 L16 22 Z"
            fill="#FFEB3B"
            stroke="#F57F17"
            strokeWidth="1"
          />
          <path
            d="M16 22 L20 16 L60 16 L64 22 Z"
            fill="#FFF176"
            stroke="#F57F17"
            strokeWidth="1"
          />

          {/* Main windows */}
          <rect
            x="18"
            y="26"
            width="44"
            height="14"
            fill="#87CEEB"
            opacity="0.9"
            stroke="#FFF176"
            strokeWidth="0.5"
            rx="2"
          />

          {/* Individual window sections */}
          <rect
            x="20"
            y="28"
            width="8"
            height="10"
            fill="#B8E0FF"
            opacity="0.7"
            stroke="#87CEEB"
            strokeWidth="0.5"
          />
          <rect
            x="30"
            y="28"
            width="8"
            height="10"
            fill="#B8E0FF"
            opacity="0.7"
            stroke="#87CEEB"
            strokeWidth="0.5"
          />
          <rect
            x="42"
            y="28"
            width="8"
            height="10"
            fill="#B8E0FF"
            opacity="0.7"
            stroke="#87CEEB"
            strokeWidth="0.5"
          />
          <rect
            x="52"
            y="28"
            width="8"
            height="10"
            fill="#B8E0FF"
            opacity="0.7"
            stroke="#87CEEB"
            strokeWidth="0.5"
          />

          {/* Wheels with 3D effect */}
          <circle
            cx="24"
            cy="58"
            r="8"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <circle
            cx="56"
            cy="58"
            r="8"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <circle
            cx="24"
            cy="58"
            r="5"
            fill="#404040"
            stroke="#333"
            strokeWidth="0.5"
          />
          <circle
            cx="56"
            cy="58"
            r="5"
            fill="#404040"
            stroke="#333"
            strokeWidth="0.5"
          />
          <circle cx="24" cy="58" r="2" fill="#666" />
          <circle cx="56" cy="58" r="2" fill="#666" />

          {/* Front details */}
          <rect
            x="14"
            y="44"
            width="3"
            height="8"
            fill="#FFF"
            opacity="0.9"
            rx="1"
          />
          <rect x="14" y="48" width="4" height="2" fill="#333" opacity="0.6" />

          {/* Door lines */}
          <line
            x1="38"
            y1="22"
            x2="38"
            y2="58"
            stroke="#F57F17"
            strokeWidth="1"
            opacity="0.7"
          />
          <line
            x1="28"
            y1="32"
            x2="28"
            y2="58"
            stroke="#F57F17"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="52"
            y1="32"
            x2="52"
            y2="58"
            stroke="#F57F17"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      );

    default:
      // Default to airplane (for car and any unknown types)
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 80 80"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
        >
          {/* Airplane shadow */}
          <ellipse cx="40" cy="70" rx="30" ry="6" fill="rgba(0,0,0,0.15)" />

          {/* Fuselage (body) */}
          <ellipse
            cx="40"
            cy="40"
            rx="28"
            ry="8"
            fill="#4285F4"
            stroke="#1A73E8"
            strokeWidth="1"
          />
          <ellipse cx="40" cy="40" rx="24" ry="6" fill="#5A9BF5" />

          {/* Cockpit */}
          <ellipse
            cx="60"
            cy="40"
            rx="8"
            ry="6"
            fill="#6FA8F6"
            stroke="#1A73E8"
            strokeWidth="1"
          />
          <ellipse cx="62" cy="40" rx="4" ry="4" fill="#87CEEB" opacity="0.9" />

          {/* Main wings */}
          <ellipse
            cx="40"
            cy="40"
            rx="6"
            ry="32"
            fill="#4285F4"
            stroke="#1A73E8"
            strokeWidth="1"
          />
          <ellipse cx="40" cy="40" rx="4" ry="30" fill="#5A9BF5" />

          {/* Wing details */}
          <path
            d="M36 12 L38 10 L42 10 L44 12 L42 68 L38 68 Z"
            fill="#1A73E8"
            opacity="0.3"
          />

          {/* Tail wing (horizontal stabilizer) */}
          <ellipse
            cx="16"
            cy="40"
            rx="4"
            ry="12"
            fill="#4285F4"
            stroke="#1A73E8"
            strokeWidth="1"
          />
          <ellipse cx="16" cy="40" rx="2" ry="10" fill="#5A9BF5" />

          {/* Vertical stabilizer (tail fin) */}
          <path
            d="M12 30 L12 50 L18 46 L18 34 Z"
            fill="#6FA8F6"
            stroke="#1A73E8"
            strokeWidth="1"
          />

          {/* Engine nacelles */}
          <ellipse
            cx="40"
            cy="16"
            rx="3"
            ry="8"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <ellipse
            cx="40"
            cy="64"
            rx="3"
            ry="8"
            fill="#2C2C2C"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
          <circle cx="40" cy="14" r="2" fill="#666" />
          <circle cx="40" cy="66" r="2" fill="#666" />

          {/* Fuselage details */}
          <ellipse cx="45" cy="40" rx="12" ry="4" fill="#FFF" opacity="0.2" />
          <circle cx="55" cy="38" r="2" fill="#87CEEB" opacity="0.8" />
          <circle cx="50" cy="42" r="1.5" fill="#87CEEB" opacity="0.7" />
        </svg>
      );
  }
};

export default getVehicle3DSVG;
