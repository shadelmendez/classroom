import { useParams } from "react-router-dom";
export default function OverviewPage() {
    const { classId } = useParams();
    return <div>📝 Novedades para la clase <strong>{classId}</strong></div>;
}
