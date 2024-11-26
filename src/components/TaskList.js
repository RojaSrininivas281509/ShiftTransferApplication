import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filterShift, setFilterShift] = useState("All");
  const [sortOption, setSortOption] = useState("Priority");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const updatedTasks = tasks.map((task, i) =>
      i === currentTaskIndex
        ? {
            ...task,
            comments: [...(task.comments || []), newComment],
          }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewComment("");
    setOpenDialog(false);
  };

  const filteredTasks =
    filterShift === "All"
      ? tasks
      : tasks.filter((task) => task.shift === filterShift);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "Priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortOption === "Status") {
      return a.status === "Pending" ? -1 : 1;
    }
    return 0;
  });

  const toggleTaskStatus = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index
        ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <FormControl>
          <InputLabel>Filter by Shift</InputLabel>
          <Select
            value={filterShift}
            onChange={(e) => setFilterShift(e.target.value)}
            sx={{ width: 150 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Afternoon">Afternoon</MenuItem>
            <MenuItem value="Night">Night</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            sx={{ width: 150 }}
          >
            <MenuItem value="Priority">Priority</MenuItem>
            <MenuItem value="Status">Status</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = "/add-task")}
        >
          Add Task
        </Button>
      </Box>
      <Grid container spacing={2}>
        {sortedTasks.map((task, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.details}
                </Typography>
                <Typography>Source: {task.source}</Typography>
                <Typography>Shift: {task.shift}</Typography>
                <Typography>Status: {task.status}</Typography>
                <Typography>Priority: {task.priority}</Typography>
                <Typography>
                  Comments:
                  {task.comments?.length > 0 ? (
                    <ul>
                      {task.comments.map((comment, idx) => (
                        <li key={idx}>{comment}</li>
                      ))}
                    </ul>
                  ) : (
                    <span> No comments yet</span>
                  )}
                </Typography>
                <Button
                  variant="outlined"
                  color={task.status === "Pending" ? "success" : "error"}
                  onClick={() => toggleTaskStatus(index)}
                  sx={{ mt: 2 }}
                >
                  Mark as {task.status === "Pending" ? "Completed" : "Pending"}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setCurrentTaskIndex(index);
                    setOpenDialog(true);
                  }}
                  sx={{ mt: 2, ml: 2 }}
                >
                  Add Comment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddComment}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;

