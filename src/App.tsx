import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BuildPlanPage } from "./pages/BuildPlanPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/plans/:planId" element={<BuildPlanPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
