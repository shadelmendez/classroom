import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Dummy = ({ title }) => <div className="p-8 text-white text-2xl">{title}</div>;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* These routes could also be dynamically generated via map() */}
          <Route index element={<Dummy title="Inicio" />} />
          <Route path="calendar" element={<Dummy title="Calendario" />} />
          <Route path=":classId" element={<Dummy title="Clase" />} />
        </Route>
      </Routes>
    </Router>
  );
}
