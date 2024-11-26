

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReportAnalytics from "./ReportAnalytics";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filterShift, setFilterShift] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortPriority, setSortPriority] = useState("HighToLow");
  const [sortStatus, setSortStatus] = useState("PendingFirst");
  const [supervisorFeedback, setSupervisorFeedback] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    details: "",
    source: "",
    shift: "Morning",
    status: "Pending",
    priority: "High",
    comments: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setEditedTask({
      title: task.title,
      details: task.details,
      source: task.source,
      shift: task.shift,
      status: task.status,
      priority: task.priority,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  const handleEditTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id
        ? { ...task, ...editedTask }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setOpenDialog(false);
  };

  // Sorting Functions
  const sortTasksByPriority = (taskList) => {
    return taskList.sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return sortPriority === "HighToLow"
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const sortTasksByStatus = (taskList) => {
    return taskList.sort((a, b) => {
      if (sortStatus === "PendingFirst") {
        return a.status === "Pending" ? -1 : 1;
      } else {
        return a.status === "Completed" ? -1 : 1;
      }
    });
  };

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const shiftMatch =
        filterShift === "All" || task.shift === filterShift;
      const statusMatch =
        filterStatus === "All" || task.status === filterStatus;
      return shiftMatch && statusMatch;
    })
    .sort((a, b) => {
      const sortedByPriority = sortTasksByPriority([a, b]);
      return sortedByPriority[0] === a ? -1 : 1;
    });

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedStatus = task.status === "Pending" ? "Completed" : "Pending";
        return { ...task, status: updatedStatus };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter by Shift</InputLabel>
          <Select
            value={filterShift}
            onChange={(e) => setFilterShift(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Afternoon">Afternoon</MenuItem>
            <MenuItem value="Night">Night</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort by Priority</InputLabel>
          <Select
            value={sortPriority}
            onChange={(e) => setSortPriority(e.target.value)}
          >
            <MenuItem value="HighToLow">High to Low</MenuItem>
            <MenuItem value="LowToHigh">Low to High</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort by Status</InputLabel>
          <Select
            value={sortStatus}
            onChange={(e) => setSortStatus(e.target.value)}
          >
            <MenuItem value="PendingFirst">Pending First</MenuItem>
            <MenuItem value="CompletedFirst">Completed First</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-task")} 
        >
          Add Task
        </Button>
      </Box>

      {/* Task Cards */}
      <Grid container spacing={2}>
        {filteredAndSortedTasks.map((task) => (
          <Grid item xs={12} md={6} lg={4} key={task.id}>
            <Card sx={{ mb: 2 }} onClick={() => handleTaskClick(task)}>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.details}
                </Typography>
                <Typography>Source: {task.source}</Typography>
                <Typography>Shift: {task.shift}</Typography>
                <Typography>Status: {task.status}</Typography>
                <Typography>Priority: {task.priority}</Typography>
                <Button
                  variant="outlined"
                  color={task.status === "Pending" ? "success" : "error"}
                  sx={{ mt: 2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTaskStatus(task.id);
                  }}
                >
                  {task.status === "Pending" ? "Mark as Completed" : "Mark as Pending"}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2, ml: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTaskClick(task);
                  }}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Task Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Details"
            fullWidth
            value={editedTask.details}
            onChange={(e) =>
              setEditedTask({ ...editedTask, details: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Source"
            fullWidth
            value={editedTask.source}
            onChange={(e) =>
              setEditedTask({ ...editedTask, source: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Shift</InputLabel>
            <Select
              value={editedTask.shift}
              onChange={(e) =>
                setEditedTask({ ...editedTask, shift: e.target.value })
              }
            >
              <MenuItem value="Morning">Morning</MenuItem>
              <MenuItem value="Afternoon">Afternoon</MenuItem>
              <MenuItem value="Night">Night</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={editedTask.status}
              onChange={(e) =>
                setEditedTask({ ...editedTask, status: e.target.value })
              }
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={editedTask.priority}
              onChange={(e) =>
                setEditedTask({ ...editedTask, priority: e.target.value })
              }
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Analytics (Report) Section */}
      <ReportAnalytics tasks={tasks} supervisorFeedback={supervisorFeedback} />
    </Box>
  );
};

export default TaskList;
