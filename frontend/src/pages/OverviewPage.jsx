import React from "react";
import { useParams } from "react-router-dom";
import Overview from "../components/Overview";

export default function OverviewPage() {
    const { classId } = useParams();
    return <div>📝 Novedades para la clase <strong>{classId}</strong></div>;
}