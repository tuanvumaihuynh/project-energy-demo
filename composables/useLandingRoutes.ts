export default function useLandingRoutes(): RouteProps[] {
  const routeList: RouteProps[] = [
    // {
    //   path: "/energy",
    //   label: "Energy demo",
    // },
    // {
    //   path: "/esp",
    //   label: "ESP32 demo",
    // },
    {
      path: "/docs",
      label: "Documents",
    },
    {
      path: "/teams",
      label: "Teams",
    },
    {
      path: "/contact",
      label: "Contact",
    },
  ];
  return routeList;
}
