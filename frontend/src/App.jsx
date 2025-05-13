import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ClassLayout from "./components/ClassLayout"; // nuevo layout por clase
import OverviewPage from "./pages/OverviewPage";
import ClassWorkPage from "./pages/ClassWorkPage";
import PeoplePage from "./pages/PeoplePage";
import HomePage from "./pages/HomePage";
import SideBarProvider from "./context/SideBarContext";

export default function App() {
  return (
    <SideBarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="calendar" element={<div>Calendario</div>} />
            <Route path="class/:classId/*" element={<ClassLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="work" element={<ClassWorkPage />} />
              <Route path="people" element={<PeoplePage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </SideBarProvider>
  );
}
