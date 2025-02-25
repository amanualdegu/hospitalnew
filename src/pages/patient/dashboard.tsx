import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function PatientDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Patient</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Patient Dashboard
        </Typography>
      </Container>
    </>
  );
}
