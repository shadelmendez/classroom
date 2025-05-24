import axios from "axios";
import { useEffect, useState } from "react";
import  FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function CalendarPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/tasks/calendar")
            .then(res => {
                const tasks = res.data;
                const formattedEvents = tasks.map(task => ({
                    title: task.title,
                    date: task.due_date  // Asegúrate que esté en formato yyyy-mm-dd
                }));
                setEvents(formattedEvents);
            })
            .catch(err => console.error("Error al cargar tareas:", err));
    }, []);
    
    return (
        <div style={{ width: '800px', height: '800px', margin: "0 auto"}}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                events={events}
            />
        </div>
    )
}