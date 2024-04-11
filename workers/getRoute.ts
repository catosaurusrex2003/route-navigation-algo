import "dotenv/config";

async function getRoute(origin: string, destination: string) {
  // origin and destination can either be "Andheri station, Mumbai" or "12.2116445,12,2116445"
  const apiKey = process.env.GOOGLE_MAPS_APIKEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&alternatives=true&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      console.error("No routes found");
      if (data?.error_message) {
        console.error(data.error_message);
      }
      console.log(data);
      return;
    }

    // Extracting the main route
    const mainRoute = data.routes[0];
    const polyline = mainRoute.overview_polyline.points;
    const waypoints = mainRoute.waypoint_order;

    // Extracting alternate routes
    const alternateRoutes = data.routes.slice(1).map((route: any) => {
      return {
        polyline: route.overview_polyline.points,
        waypoints: route.waypoint_order,
      };
    });
    console.log({
      polyline,
      waypoints,
      alternateRoutes,
    });

    return {
      polyline,
      waypoints,
      alternateRoutes,
    };
  } catch (error) {
    console.error("Failed to fetch route data:", error);
  }
}

getRoute(
  "Hatkeshwar Temple, GCC Club Road, Shanti Vidya Nagari, Phase 3, Gaurav Sankalp, Mira Road East, Mira Bhayandar, Maharashtra, India",
  "Dara's Dhaba, National Highway 8, Kashimira, Mira Road East, Mira Bhayandar, Maharashtra, India"
);
