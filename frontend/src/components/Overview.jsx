import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Card, Grid, TextField, Button } from "@mui/material";
import { getOverviewData } from "../api/overview"; 

const Overview = () => {
  const [header, setHeader] = useState({ title: "", subtitle: "" });
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOverviewData(); 
      setHeader(data.header);
      setTasks(data.tasks);
      setComments(data.comments);
    };

    fetchData();
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { user: "Tú", date: "Ahora", text: newComment.trim() },
      ]);
      setNewComment("");
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#121212", color: "#fff", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1E1E1E",
          padding: 3,
          borderRadius: 2,
          marginBottom: 3,
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            marginRight: 3,
            backgroundColor: "#3F51B5",
            fontSize: 40,
          }}
        >
          H
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ margin: 0, fontWeight: "bold" }}>
            {header.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#B0BEC5" }}>
            {header.subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Tasks Section */}
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        {tasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#1E1E1E",
                color: "#fff",
                border: "1px solid #333",
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
                    color: "#3F51B5",
                  }}
                >
                  {task.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {task.title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#B0BEC5", marginBottom: 1 }}>
                {task.date}
              </Typography>
              {task.description && (
                <Typography variant="body2" sx={{ color: "#B0BEC5" }}>
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
          backgroundColor: "#1E1E1E",
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
              borderBottom: "1px solid #333",
              paddingBottom: 1,
            }}
          >
            <Avatar sx={{ marginRight: 2, backgroundColor: "#3F51B5" }}>
              {comment.user.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {comment.user}
              </Typography>
              <Typography variant="body2" sx={{ color: "#B0BEC5" }}>
                {comment.date}
              </Typography>
              <Typography variant="body2">{comment.text}</Typography>
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
              backgroundColor: "#fff",
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