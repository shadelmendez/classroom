import axios from "axios";

export const getSidebarData = async () => {
  // Llama a la API para obtener los cursos (array)
  const res = await axios.get("http://127.0.0.1:8000/subjects");
  const subjects = res.data || [];

  const sidebarData = [
    {
      title: "Cursos",
      items: subjects.map(subject => ({
        to: `/class/${subject.id}/overview`,
        label: subject.name,
        iconColor: subject.icon_color || "#456EBF",
        initial: subject.name.charAt(0).toUpperCase(),
      })),
    },
  ];

  return sidebarData;
};