import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Stack,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
 
const ShiftConfiguration = () => {
    const [shifts, setShifts] = useState([]);
    const [editShift, setEditShift] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [workforceDialog, setWorkforceDialog] = useState({ open: false, shiftId: null });
    const [locationDialog, setLocationDialog] = useState({ open: false, shiftId: null });
 
    const [form, setForm] = useState({ name: "", startTime: "", endTime: "" });
    const [workforce, setWorkforce] = useState("");
    const [location, setLocation] = useState("");
 
    // Add or update a shift
    const handleSaveShift = () => {
        if (editShift) {
            setShifts((prev) =>
                prev.map((shift) => (shift.id === editShift.id ? { ...shift, ...form } : shift))
            );
        } else {
            setShifts((prev) => [...prev, { ...form, id: Date.now(), workforce: "", location: "" }]);
        }
        resetForm();
        setDialogOpen(false);
    };
 
    const handleDeleteShift = (id) => {
        setShifts((prev) => prev.filter((shift) => shift.id !== id));
    };
 
    const handleResetShifts = () => {
        setShifts([]);
    };
 
    const handleAssignWorkforce = () => {
        setShifts((prev) =>
            prev.map((shift) =>
                shift.id === workforceDialog.shiftId ? { ...shift, workforce } : shift
            )
        );
        setWorkforce("");
        setWorkforceDialog({ open: false, shiftId: null });
    };
 
    const handleAssignLocation = () => {
        setShifts((prev) =>
            prev.map((shift) =>
                shift.id === locationDialog.shiftId ? { ...shift, location } : shift
            )
        );
        setLocation("");
        setLocationDialog({ open: false, shiftId: null });
    };
 
    const resetForm = () => {
        setForm({ name: "", startTime: "", endTime: "" });
        setEditShift(null);
    };
 
    return (
        <Container>
            <Typography variant="h4" textAlign="center" marginY={4}>
                Shift  Manager
            </Typography>
 
            <Stack spacing={3}>
                <Button
                    variant="contained"
                    onClick={() => {
                        resetForm();
                        setDialogOpen(true);
                    }}
                >
                    Add Shift
                </Button>
                <Button variant="outlined" color="error" onClick={handleResetShifts}>
                    Reset All Shifts
                </Button>
 
                <List>
                    {shifts.map((shift) => (
                        <Paper key={shift.id} sx={{ marginBottom: 2, padding: 2 }}>
                            <ListItem>
                                <ListItemText
                                    primary={shift.name}
                                    secondary={`Time: ${shift.startTime} - ${shift.endTime} | Workforce: ${
                                        shift.workforce || "None"
                                    } | Location: ${shift.location || "None"}`}
                                />
                                <IconButton
                                    onClick={() => {
                                        setEditShift(shift);
                                        setForm(shift);
                                        setDialogOpen(true);
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteShift(shift.id)}>
                                    <Delete />
                                </IconButton>
                                <Button
                                    size="small"
                                    onClick={() =>
                                        setWorkforceDialog({ open: true, shiftId: shift.id })
                                    }
                                >
                                    Assign Workforce
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() =>
                                        setLocationDialog({ open: true, shiftId: shift.id })
                                    }
                                >
                                    Assign Location
                                </Button>
                            </ListItem>
                        </Paper>
                    ))}
                </List>
            </Stack>
 
            {/* Add/Edit Shift Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{editShift ? "Edit Shift" : "Add Shift"}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            label="Shift Name"
                            value={form.name}
                            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Start Time"
                            type="time"
                            value={form.startTime}
                            onChange={(e) => setForm((prev) => ({ ...prev, startTime: e.target.value }))}
                            fullWidth
                            required
                        />
                        <TextField
                            label="End Time"
                            type="time"
                            value={form.endTime}
                            onChange={(e) => setForm((prev) => ({ ...prev, endTime: e.target.value }))}
                            fullWidth
                            required
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveShift}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
 
            {/* Assign Workforce Dialog */}
            <Dialog
                open={workforceDialog.open}
                onClose={() => setWorkforceDialog({ open: false, shiftId: null })}
            >
                <DialogTitle>Assign Workforce</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Workforce"
                        value={workforce}
                        onChange={(e) => setWorkforce(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setWorkforceDialog({ open: false, shiftId: null })}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleAssignWorkforce}>
                        Assign
                    </Button>
                </DialogActions>
            </Dialog>
 
            {/* Assign Location Dialog */}
            <Dialog
                open={locationDialog.open}
                onClose={() => setLocationDialog({ open: false, shiftId: null })}
            >
                <DialogTitle>Assign Location</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLocationDialog({ open: false, shiftId: null })}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleAssignLocation}>
                        Assign
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
 
export default ShiftConfiguration;