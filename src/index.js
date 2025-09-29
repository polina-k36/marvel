import { createRoot } from "react-dom/client";
import router from "./components/app/App";

import "./style/style.scss";
import { RouterProvider } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
