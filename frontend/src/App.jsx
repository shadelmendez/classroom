import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ClassLayout from "./components/ClassLayout";
import OverviewPage from "./pages/OverviewPage";
import ClassWorkPage from "./pages/ClassWorkPage";
import PeoplePage from "./pages/PeoplePage";
import HomePage from "./pages/HomePage";
import CreateHomeWorkPage from "./pages/CreateHomeWorkPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import SideBarProvider from "./context/SideBarContext";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import GradesPage from "./pages/GradesPage";

export default function App() {
  return (
    <AuthProvider>
      <SideBarProvider>
        <Router>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas protegidas */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="calendar" element={<div>Calendario</div>} />
              <Route
                path="class/:classIdParam/*"
                element={
                  <PrivateRoute>
                    <ClassLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<OverviewPage />} />
                <Route path="overview" element={<OverviewPage />} />
                <Route path="work" element={<ClassWorkPage />} />
                <Route path="people" element={<PeoplePage />} />
                <Route path="createhomework" element={<CreateHomeWorkPage />} />
                <Route path="grades" element={<GradesPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </SideBarProvider>
    </AuthProvider>
  );
}
