import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Card, Grid, TextField, Button, useTheme } from "@mui/material";
import { SideBarContext } from "../context/SideBarContext";
import { AuthContext } from "../context/AuthContext";
import { getSubjectByName, getActivitiesBySubject, getUsers, createActivities } from "../api/api";

const Overview = () => {
  const theme = useTheme();
  const { classId } = useContext(SideBarContext);
  const { user } = useContext(AuthContext);

  const [courseLabel, setCourseLabel] = useState("");
  const [courseSection, setCourseSection] = useState(""); // NEW
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [users, setUsers] = useState({});

  // Fetch all users once
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      const usersById = {};
      res.data.forEach(u => {
        usersById[u.id] = u;
      });
      setUsers(usersById);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchOverviewData = async () => {
      if (!classId) return;
      // First, get the subject by name to obtain its id
      const subjectRes = await getSubjectByName(classId);
      const subject = subjectRes.data;
      setCourseLabel(subject?.name || "");
      setCourseSection(subject?.section || ""); // NEW

      if (subject?.id) {
        const response = await getActivitiesBySubject(subject.id);
        const activities = response.data;
        const comments = Array.isArray(activities)
          ? activities.filter(item => item.comment)
          : [];
        setComments(comments);
        // setTasks(...) if needed
      } else {
        setTasks([]);
        setComments([]);
      }
    };

    fetchOverviewData();
  }, [classId]);
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    if (!user?.id || !classId) return;

    // Get subject info to get subject_id
    const subjectRes = await getSubjectByName(classId);
    const subject = subjectRes.data;

    if (!subject?.id) return;

    // Prepare activity data
    const activityData = {
      comment: newComment.trim(),
      subject_id: subject.id,
      user_id: user.id,
    };

    try {
      // Post the new comment/activity
      await createActivities(activityData);

      // Optionally, refresh comments from backend
      const response = await getActivitiesBySubject(subject.id);
      const activities = response.data;
      const comments = Array.isArray(activities)
        ? activities.filter(item => item.comment)
        : [];
      setComments(comments);

      setNewComment("");
    } catch (err) {
      // Optionally handle error
      console.error("Error al crear el comentario:", err);
    }
  };

  return (
    <Box sx={{
      padding: 3,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      minHeight: "100vh"
    }}>
      {/* Header Section estilo Google Classroom */}
      <Box
        sx={{
          width: "100%",
          minHeight: 160,
          background: "#0B7DC2",
          borderRadius: 3,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          p: 4,
          mb: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              mb: 1,
              letterSpacing: 0.5,
            }}
          >
            {courseLabel}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#e0e0e0",
              fontWeight: 400,
              letterSpacing: 1,
            }}
          >
            {courseSection || "—"}
          </Typography>
        </Box>
        <Box
          component="img"
          src="https://ssl.gstatic.com/classroom/themes/img_bookclub.jpg"
          alt=""
          sx={{
            height: 120,
            mr: 2,
            borderRadius: 2,
            boxShadow: 2,
            objectFit: "cover",
            display: { xs: "none", md: "block" },
          }}
        />
      </Box>

      {/* Tasks Section */}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        {tasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                border: `10px solid ${theme.palette.divider}`,
                borderRadius: 2,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Box
                  sx={{
                    fontSize: 40,
                    marginRight: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.palette.primary.main,
                  }}
                >
                  {task.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {task.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, marginBottom: 1 }}>
                {task.date}
              </Typography>
              {task.description && (
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {task.description}
                </Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Comments Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Comentarios de la clase
        </Typography>
        {comments.map((comment, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
              paddingBottom: 1,
            }}
          >
            <Box
              sx={{
                marginRight: 2,
                backgroundColor: theme.palette.primary.main,
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {(users[comment.user_id]?.email ? users[comment.user_id].email.charAt(0).toUpperCase() : "A")}
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {users[comment.user_id]?.email || "Anónimo"}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {comment.date || ""}
              </Typography>
              <Typography variant="body2">{comment.text || comment.comment}</Typography>
            </Box>
          </Box>
        ))}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Añade un comentario de clase..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              backgroundColor: theme.palette.background.default,
              borderRadius: 1,
              marginRight: 2,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            sx={{ textTransform: "none" }}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;