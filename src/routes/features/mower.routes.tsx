import { Mower, MowerControl } from "@/features";

export const mowerRoutes = [
  {
    path: "/mower",
    element: <Mower />,
    children: [
      {
        index: true,
        element: <MowerControl />,
      },
    ],
  },
];
