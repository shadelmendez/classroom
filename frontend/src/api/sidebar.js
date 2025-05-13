export const getSidebarData = async () => {
  // Simulated network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const sidebarData = [
    {
      title: "Cursos que dictas",
      items: [
        { to: "/discreta", label: "Matemática discreta", iconColor: "#456EBF" },
        { to: "/monografico", label: "Monográfico", iconColor: "#BF7C41" },
      ],
    },
    {
      title: "Cursos inscritos",
      items: [
        { to: "/mate2024", label: "Matemáticas 2024", iconColor: "#6439BF" },
        { to: "/sociales2024", label: "Sociales 2024", iconColor: "#49733D" },
      ],
    },
  ];

  // Add 'initial' property by extracting the first letter of each label
  sidebarData.forEach((section) => {
    section.items.forEach((item) => {
      item.initial = item.label.charAt(0).toUpperCase(); // Get the first letter of the label and capitalize it
    });
  });

  return sidebarData;
};
