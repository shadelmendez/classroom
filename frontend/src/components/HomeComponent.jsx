import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Card, CardContent, Avatar, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SideBarContext } from "../context/SideBarContext";
import { AuthContext } from "../context/AuthContext";
import { getEnrolledSubjects, getTeachedSubjects, createSubject } from "../api/api";

const ICON_COLORS = [
  { label: "Azul brillante", value: "#0080C9" },
  { label: "Azul cielo", value: "#448BF6" },
  { label: "Verde esmeralda", value: "#21B573" },
  { label: "Gris oscuro", value: "#1E1E1E" },
  { label: "Amarillo mostaza", value: "#F4C542" },
  { label: "Coral suave", value: "#FF6B6B" },
  { label: "Azul pizarra", value: "#4B6CB7" },
  { label: "Verde menta", value: "#2ECC71" },
  { label: "Naranja cálido", value: "#FF9F1C" },
  { label: "Gris frío", value: "#A0AEC0" },
];

export default function HomeComponent() {
  const [subjects, setSubjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", section: "" }); 
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const { setClassId } = useContext(SideBarContext);
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user?.id) return;
      let enrolledSubjects = [];
      let teachedSubjects = [];

      // Try to fetch enrolled subjects
      try {
        const res = await getEnrolledSubjects(user.id);
        enrolledSubjects = res.data || [];
      } catch (err) {
        enrolledSubjects = [];
      }

      // Try to fetch teached subjects
      try {
        const res2 = await getTeachedSubjects(user.id);
        teachedSubjects = res2.data || [];
      } catch (err) {
        teachedSubjects = [];
      }

      // Only mix if both have data, else show only the one that worked
      let allSubjects = [];
      if (enrolledSubjects.length && teachedSubjects.length) {
        allSubjects = [
          ...enrolledSubjects,
          ...teachedSubjects.filter(
            (s) => !enrolledSubjects.some((e) => e.id === s.id)
          ),
        ];
      } else if (enrolledSubjects.length) {
        allSubjects = enrolledSubjects;
      } else if (teachedSubjects.length) {
        allSubjects = teachedSubjects;
      } else {
        allSubjects = [];
      }

      setSubjects(allSubjects);
    };
    fetchSubjects();
  }, [user, openDialog]); // reload after creating

  const handleCardClick = (subject) => {
    setClassId(subject.name.replace("/", ""));
    navigate(`/class/${subject.name.replace("/", "")}/overview`);
  };

  const handleOpenDialog = () => {
    setForm({ name: "", description: "", section: "" });
    setFormError("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubject = async () => {
    if (!form.name.trim() || !form.description.trim() || !form.section.trim()) {
      setFormError("Todos los campos son obligatorios.");
      return;
    }
    const randomColor = ICON_COLORS[Math.floor(Math.random() * ICON_COLORS.length)].value;
    try {
      await createSubject({
        ...form,
        icon_color: randomColor,
        educator_id: user.id,
      });
      setOpenDialog(false);
    } catch (err) {
      setFormError("Error al crear la clase.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          Todos los cursos
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Crear clase
        </Button>
      </Box>
      <Grid
        container
        spacing={2}
        alignItems="stretch"
        sx={{
          justifyContent: "flex-start", // or "center" if you want centered rows
        }}
      >
        {subjects.map((subject) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={subject.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                cursor: "pointer",
                overflow: "hidden",
                height: 320,           // FIXED HEIGHT
                width: "100%",         // FILL GRID COLUMN
                minWidth: 0,           // Prevent overflow
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.2s, transform 0.2s",
                "&:hover": {
                  boxShadow: 10,
                  transform: "translateY(-4px) scale(1.03)",
                },
              }}
              onClick={() => handleCardClick(subject)}
            >
              {/* Card header with gradient and icon */}
              <Box
                sx={{
                  position: "relative",
                  height: 90,
                  background: `linear-gradient(120deg, ${subject.icon_color || "#1976d2"} 70%, #1e293b 100%)`,
                  display: "flex",
                  alignItems: "flex-end",
                  px: 2,
                  py: 2,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  overflow: "hidden",
                }}
              >
                {/* Optional SVG or background pattern */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    opacity: 0.12,
                    background: "url('https://www.svgrepo.com/show/354380/drawer.svg') no-repeat center/60%",
                    zIndex: 1,
                  }}
                />
                <Box sx={{ position: "relative", zIndex: 2, width: "100%" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      textShadow: "0 2px 8px rgba(0,0,0,0.18)",
                      mb: 0.5,
                    }}
                  >
                    {subject.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#e0e0e0",
                      fontWeight: 400,
                      letterSpacing: 1,
                    }}
                  >
                    {subject.section || "—"}
                  </Typography>
                </Box>
                {/* Floating avatar */}
                <Avatar
                  sx={{
                    bgcolor: "#fff",
                    color: subject.icon_color || "#1976d2",
                    position: "absolute",
                    right: 16,
                    top: 16,
                    width: 44,
                    height: 44,
                    border: "2px solid #fff",
                    boxShadow: 2,
                    fontWeight: 700,
                    fontSize: 22,
                    zIndex: 3,
                  }}
                >
                  {subject.name.charAt(0).toUpperCase()}
                </Avatar>
              </Box>
              {/* Card content */}
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  minHeight: 80,
                  maxHeight: 80,
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    minHeight: 60,
                  }}
                >
                  {subject.description || <span style={{ opacity: 0.5 }}>Sin descripción</span>}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for creating subject */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Crear nueva clase</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            value={form.description}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Sección"
            name="section"
            value={form.section}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          {formError && (
            <Typography color="error" sx={{ mt: 1 }}>
              {formError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreateSubject}>
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}