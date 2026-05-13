import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100 font-sans w-full h-full flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
}