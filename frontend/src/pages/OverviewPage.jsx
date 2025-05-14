import React from "react";
import { useParams } from "react-router-dom";
import Overview from "../components/Overview";

export default function OverviewPage() {
  const { classId } = useParams();

  return (
    <div>
      <h1>📝 Novedades para la clase <strong>{classId}</strong></h1>
      <Overview />
    </div>
  );
}