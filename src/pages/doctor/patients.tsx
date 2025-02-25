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
  Box,
  Tab,
  Tabs,
} from '@mui/material';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contactNumber: string;
  lastVisit: string;
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: string[];
  };
  visits: Array<{
    date: string;
    reason: string;
    diagnosis: string;
    prescription: string;
  }>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [newVisit, setNewVisit] = useState({
    reason: '',
    diagnosis: '',
    prescription: '',
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    setPatients([
      {
        id: '1',
        name: 'John Doe',
        age: 35,
        gender: 'Male',
        contactNumber: '+1234567890',
        lastVisit: '2025-02-20',
        medicalHistory: {
          conditions: ['Hypertension', 'Diabetes'],
          allergies: ['Penicillin'],
          medications: ['Metformin', 'Lisinopril'],
        },
        visits: [
          {
            date: '2025-02-20',
            reason: 'Regular check-up',
            diagnosis: 'Blood pressure slightly elevated',
            prescription: 'Continue current medications',
          },
        ],
      },
      {
        id: '2',
        name: 'Jane Smith',
        age: 28,
        gender: 'Female',
        contactNumber: '+1987654321',
        lastVisit: '2025-02-15',
        medicalHistory: {
          conditions: ['Asthma'],
          allergies: ['Dust', 'Pollen'],
          medications: ['Albuterol'],
        },
        visits: [
          {
            date: '2025-02-15',
            reason: 'Asthma follow-up',
            diagnosis: 'Condition stable',
            prescription: 'Refill inhaler',
          },
        ],
      },
    ]);
  }, []);

  const handleOpenDialog = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
    setTabValue(0);
    setNewVisit({
      reason: '',
      diagnosis: '',
      prescription: '',
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddVisit = () => {
    if (selectedPatient) {
      const updatedPatient = {
        ...selectedPatient,
        visits: [
          {
            date: new Date().toISOString().split('T')[0],
            ...newVisit,
          },
          ...selectedPatient.visits,
        ],
        lastVisit: new Date().toISOString().split('T')[0],
      };

      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === selectedPatient.id ? updatedPatient : patient
        )
      );

      setNewVisit({
        reason: '',
        diagnosis: '',
        prescription: '',
      });
      setTabValue(1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Patients | Hospital Management</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Patients
        </Typography>

        <Card>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Last Visit</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.contactNumber}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleOpenDialog(patient)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogContent>
            {selectedPatient && (
              <>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="New Visit" />
                    <Tab label="Visit History" />
                    <Tab label="Medical History" />
                  </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                  <TextField
                    fullWidth
                    label="Reason for Visit"
                    value={newVisit.reason}
                    onChange={(e) => setNewVisit({ ...newVisit, reason: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Diagnosis"
                    value={newVisit.diagnosis}
                    onChange={(e) => setNewVisit({ ...newVisit, diagnosis: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Prescription"
                    value={newVisit.prescription}
                    onChange={(e) => setNewVisit({ ...newVisit, prescription: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" onClick={handleAddVisit}>
                    Add Visit
                  </Button>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  {selectedPatient.visits.map((visit, index) => (
                    <Card key={index} sx={{ mb: 2, p: 2 }}>
                      <Typography variant="subtitle1">Date: {visit.date}</Typography>
                      <Typography variant="body1">Reason: {visit.reason}</Typography>
                      <Typography variant="body1">Diagnosis: {visit.diagnosis}</Typography>
                      <Typography variant="body1">Prescription: {visit.prescription}</Typography>
                    </Card>
                  ))}
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Typography variant="h6">Medical Conditions</Typography>
                  <ul>
                    {selectedPatient.medicalHistory.conditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>

                  <Typography variant="h6">Allergies</Typography>
                  <ul>
                    {selectedPatient.medicalHistory.allergies.map((allergy, index) => (
                      <li key={index}>{allergy}</li>
                    ))}
                  </ul>

                  <Typography variant="h6">Current Medications</Typography>
                  <ul>
                    {selectedPatient.medicalHistory.medications.map((medication, index) => (
                      <li key={index}>{medication}</li>
                    ))}
                  </ul>
                </TabPanel>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
