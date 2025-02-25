import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function ReceptionistAppointmentsPage() {
  return (
    <>
      <Helmet>
        <title>Appointments | Receptionist</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Appointment Management
        </Typography>
      </Container>
    </>
  );
}
