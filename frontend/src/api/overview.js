export const getOverviewData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  
    return {
      header: {
        title: "Monográfico",
        subtitle: "01",
      },
      tasks: [
        {
          icon: "📅",
          title: "Shadel Mendez ha publicado una nueva tarea: tarea 2",
          date: "9 may",
          description: "",
        },
        {
          icon: "📅",
          title: "Shadel Mendez ha publicado una nueva tarea: tarea 1",
          date: "9 may (Última modificación: 9 may)",
          description: "",
        },
        {
          icon: "💬",
          title: "Shadel Mendez",
          date: "9 may",
          description: "este es un mensaje",
        },
      ],
      comments: [
        {
          user: "Janeiro Placido",
          date: "9 may",
          text: "Hola todos",
        },
      ],
    };
  };