export const getSidebarData = async () => {
  // Simulated network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const sidebarData = [
    {
      title: "Clases impartidas",
      items: [
        { to: "/discreta", label: "Matemática discreta", iconColor: "blue" },
        { to: "/monografico", label: "Monográfico", iconColor: "blue" },
      ],
    },
    {
      title: "Cursos inscritos",
      items: [
        { to: "/mate2024", label: "Matemáticas 2024", iconColor: "green" },
        { to: "/mate2024", label: "Sociales 2024", iconColor: "yellow" }, // This would be handled differently if necessary
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
