import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function ReceptionistPatientsPage() {
  return (
    <>
      <Helmet>
        <title>Patients | Receptionist</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Patient Management
        </Typography>
      </Container>
    </>
  );
}
