import { useContext } from "react";
import { SideBarContext } from "../context/SideBarContext";
export default function OverviewPage() {
    const { classId } = useContext(SideBarContext)
    return <div>📝 Novedades para la clase <strong>{classId}</strong></div>;
}
