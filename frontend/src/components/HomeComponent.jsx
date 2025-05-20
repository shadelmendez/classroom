import React, { useEffect, useState } from "react";
import { getSidebarData } from "../api/sidebar";
import { Box, Typography, Card, CardContent, Avatar, Grid } from "@mui/material";

export default function HomeComponent() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const sections = await getSidebarData();
      // sections[0].items contiene los subjects
      if (sections.length > 0) {
        setSubjects(sections[0].items);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Todos los cursos
      </Typography>
      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} md={4} key={subject.to}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Avatar sx={{ bgcolor: subject.iconColor, mr: 2 }}>
                {subject.initial}
              </Avatar>
              <CardContent>
                <Typography variant="h6">{subject.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}