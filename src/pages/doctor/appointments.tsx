import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'scheduled' | 'completed' | 'cancelled'>('scheduled');

  useEffect(() => {
    // TODO: Replace with actual API call
    setAppointments([
      {
        id: '1',
        patientName: 'John Doe',
        date: '2025-02-26',
        time: '10:00 AM',
        type: 'Check-up',
        status: 'scheduled',
      },
      {
        id: '2',
        patientName: 'Jane Smith',
        date: '2025-02-26',
        time: '11:30 AM',
        type: 'Follow-up',
        status: 'scheduled',
      },
      {
        id: '3',
        patientName: 'Robert Johnson',
        date: '2025-02-26',
        time: '2:00 PM',
        type: 'Consultation',
        status: 'scheduled',
      },
    ]);
  }, []);

  const handleOpenDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNotes(appointment.notes || '');
    setStatus(appointment.status);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
    setNotes('');
    setStatus('scheduled');
  };

  const handleUpdateAppointment = () => {
    if (selectedAppointment) {
      // TODO: Replace with actual API call
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === selectedAppointment.id
            ? { ...appointment, status, notes }
            : appointment
        )
      );
      handleCloseDialog();
    }
  };

  return (
    <>
      <Helmet>
        <title>Appointments | Hospital Management</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Appointments
        </Typography>

        <Card>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>{appointment.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleOpenDialog(appointment)}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Update Appointment</DialogTitle>
          <DialogContent>
            {selectedAppointment && (
              <>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Patient: {selectedAppointment.patientName}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 3 }}>
                  {selectedAppointment.date} at {selectedAppointment.time}
                </Typography>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'scheduled' | 'completed' | 'cancelled')}
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleUpdateAppointment} variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
