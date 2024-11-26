// // // ReportAnalytics.js
// // import React, { useState } from "react";
// // import { Box, Typography, Button, TextField } from "@mui/material";

// // const ReportAnalytics = ({ tasks, supervisorFeedback, setSupervisorFeedback }) => {
// //   const [reportData, setReportData] = useState([]);

// //   const generateReport = () => {
// //     const shiftFilteredTasks = tasks.filter((task) => task.shift === "Morning"); // Example: filter by Morning shift, adjust as needed

// //     const completedTasks = shiftFilteredTasks.filter((task) => task.status === "Completed");
// //     const pendingTasks = shiftFilteredTasks.filter((task) => task.status === "Pending");
// //     const highPriorityTasks = shiftFilteredTasks.filter((task) => task.priority === "High");

// //     const report = {
// //       shift: "Morning", // Example: you can make this dynamic based on filter or props
// //       completedTasks: completedTasks.length,
// //       pendingTasks: pendingTasks.length,
// //       highPriorityTasks: highPriorityTasks.length,
// //       supervisorFeedback: supervisorFeedback,
// //       additionalComments: "This section can be dynamically updated as needed",
// //     };

// //     setReportData(report);
// //   };

// //   return (
// //     <Box sx={{ mt: 4 }}>
// //       <Typography variant="h5" gutterBottom>
// //         Reports and Analytics
// //       </Typography>

// //       {/* Supervisor Feedback */}
// //       <TextField
// //         label="Supervisor Feedback"
// //         fullWidth
// //         multiline
// //         rows={4}
// //         value={supervisorFeedback}
// //         onChange={(e) => setSupervisorFeedback(e.target.value)}
// //         sx={{ mb: 2 }}
// //       />

// //       <Button
// //         variant="contained"
// //         color="secondary"
// //         onClick={generateReport}
// //       >
// //         Generate Report
// //       </Button>

// //       {/* Display Report */}
// //       {reportData.length > 0 && (
// //         <Box sx={{ mt: 3 }}>
// //           <Typography variant="h6">Shift: {reportData.shift}</Typography>
// //           <Typography variant="body1">Completed Tasks: {reportData.completedTasks}</Typography>
// //           <Typography variant="body1">Pending Tasks: {reportData.pendingTasks}</Typography>
// //           <Typography variant="body1">High Priority Tasks: {reportData.highPriorityTasks}</Typography>
// //           <Typography variant="body1">Supervisor Feedback: {reportData.supervisorFeedback}</Typography>
// //           <Typography variant="body1">Additional Comments: {reportData.additionalComments}</Typography>
// //         </Box>
// //       )}
// //     </Box>
// //   );
// // };

// // export default ReportAnalytics;
// import React, { useState } from "react";
// import { Box, Typography, Button, TextField } from "@mui/material";

// const ReportAnalytics = ({ tasks, supervisorFeedback, setSupervisorFeedback }) => {
//   const [reportData, setReportData] = useState(null); // Store the report as an object, not an array

//   const generateReport = () => {
//     const shiftFilteredTasks = tasks.filter((task) => task.shift === "Morning"); // Example: filter by Morning shift

//     const completedTasks = shiftFilteredTasks.filter((task) => task.status === "Completed");
//     const pendingTasks = shiftFilteredTasks.filter((task) => task.status === "Pending");
//     const highPriorityTasks = shiftFilteredTasks.filter((task) => task.priority === "High");

//     const report = {
//       shift: "Morning", // Example: you can make this dynamic based on filter or props
//       completedTasks: completedTasks.length,
//       pendingTasks: pendingTasks.length,
//       highPriorityTasks: highPriorityTasks.length,
//       supervisorFeedback: supervisorFeedback,
//       additionalComments: "This section can be dynamically updated as needed",
//     };

//     setReportData(report);
//   };

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         Reports and Analytics
//       </Typography>

//       {/* Supervisor Feedback */}
//       <TextField
//         label="Supervisor Feedback"
//         fullWidth
//         multiline
//         rows={4}
//         value={supervisorFeedback}
//         onChange={(e) => setSupervisorFeedback(e.target.value)}
//         sx={{ mb: 2 }}
//       />

//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={generateReport}
//       >
//         Generate Report
//       </Button>

//       {/* Display Report */}
//       {reportData && (
//         <Box sx={{ mt: 3 }}>
//           <Typography variant="h6">Shift: {reportData.shift}</Typography>
//           <Typography variant="body1">Completed Tasks: {reportData.completedTasks}</Typography>
//           <Typography variant="body1">Pending Tasks: {reportData.pendingTasks}</Typography>
//           <Typography variant="body1">High Priority Tasks: {reportData.highPriorityTasks}</Typography>
//           <Typography variant="body1">Supervisor Feedback: {reportData.supervisorFeedback}</Typography>
//           <Typography variant="body1">Additional Comments: {reportData.additionalComments}</Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ReportAnalytics;
import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const ReportAnalytics = ({ tasks, supervisorFeedback, setSupervisorFeedback }) => {
  const [reportData, setReportData] = useState(null); // Store the report as an object
  const [shift, setShift] = useState("Morning"); // State for dynamic shift selection

  const generateReport = () => {
    const shiftFilteredTasks = tasks.filter((task) => task.shift === shift);

    const completedTasks = shiftFilteredTasks.filter((task) => task.status === "Completed");
    const pendingTasks = shiftFilteredTasks.filter((task) => task.status === "Pending");
    const highPriorityTasks = shiftFilteredTasks.filter((task) => task.priority === "High");

    const report = {
      shift: shift,
      completedTasks: completedTasks.length,
      pendingTasks: pendingTasks.length,
      highPriorityTasks: highPriorityTasks.length,
      supervisorFeedback: supervisorFeedback,
      additionalComments: "This section can be dynamically updated as needed",
    };

    setReportData(report);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Reports and Analytics
      </Typography>

      {/* Shift Selection */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Shift</InputLabel>
        <Select
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          label="Shift"
        >
          <MenuItem value="Morning">Morning</MenuItem>
          <MenuItem value="Evening">Evening</MenuItem>
          <MenuItem value="Night">Night</MenuItem>
        </Select>
      </FormControl>

      {/* Supervisor Feedback */}
      <TextField
        label="Supervisor Feedback"
        fullWidth
        multiline
        rows={4}
        value={supervisorFeedback}
        onChange={(e) => setSupervisorFeedback(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="secondary"
        onClick={generateReport}
      >
        Generate Report
      </Button>

      {/* Display Report */}
      {reportData && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Shift: {reportData.shift}</Typography>
          <Typography variant="body1">Completed Tasks: {reportData.completedTasks}</Typography>
          <Typography variant="body1">Pending Tasks: {reportData.pendingTasks}</Typography>
          <Typography variant="body1">High Priority Tasks: {reportData.highPriorityTasks}</Typography>
          <Typography variant="body1">Supervisor Feedback: {reportData.supervisorFeedback}</Typography>
          <Typography variant="body1">Additional Comments: {reportData.additionalComments}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReportAnalytics;

