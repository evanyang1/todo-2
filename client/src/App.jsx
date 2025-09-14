import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import "./App.css";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const __TSR_ROUTER_TYPE_GUARD__ = router;

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
