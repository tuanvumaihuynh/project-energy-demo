export default function useLandingRoutes(): RouteProps[] {
  const routeList: RouteProps[] = [
    {
      path: "/energy",
      label: "Energy demo",
    },
    {
      path: "/esp",
      label: "Esp demo",
    },
    // {
    //   path: "/docs",
    //   label: "Docs",
    // },
    // {
    //   path: "/teams",
    //   label: "Teams",
    // },
    // {
    //   path: "/contact",
    //   label: "Contact",
    // },
  ];
  return routeList;
}
