

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    details: "",
    source: "",
    shift: "Morning",
    status: "Pending",
    priority: "Medium",
    comments: [],
  });

  const [commentInput, setCommentInput] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    navigate("/");
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setTask({ ...task, comments: [...task.comments, commentInput] });
      setCommentInput("");
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Add Task
      </Typography>

     <TextField
        label="Task Title"
        fullWidth
        sx={{ mb: 2 }}
        value={task.title}
        
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <TextField
        label="Details"
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
        value={task.details}
        onChange={(e) => setTask({ ...task, details: e.target.value })}
      />

      <TextField
        label="Source"
        fullWidth
        sx={{ mb: 2 }}
        value={task.source}
        onChange={(e) => setTask({ ...task, source: e.target.value })}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Shift</InputLabel>
        <Select
          value={task.shift}
          onChange={(e) => setTask({ ...task, shift: e.target.value })}
        >
          <MenuItem value="Morning">Morning</MenuItem>
          <MenuItem value="Afternoon">Afternoon</MenuItem>
          <MenuItem value="Night">Night</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => setShowCommentInput(!showCommentInput)}
        sx={{ mb: 2 }}
      >
        {showCommentInput ? "Hide Comments" : "Add Comments"}
      </Button>

      {showCommentInput && (
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Add Comment"
            fullWidth
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            sx={{ mb: 3 }}
          >
            Add Comment
          </Button>
        </Box>
      )}

      {task.comments.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Comments:
          </Typography>
          {task.comments.map((comment, index) => (
            <Typography key={index} sx={{ mt: 1 }}>
              - {comment}
            </Typography>
          ))}
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: -2 }}
      >
        Save Task
      </Button>
    </Box>
  );
};

export default AddTask;

