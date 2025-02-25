import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function PatientAppointmentsPage() {
  return (
    <>
      <Helmet>
        <title>Appointments | Patient</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          My Appointments
        </Typography>
      </Container>
    </>
  );
}
