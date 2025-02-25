import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function ReceptionistDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Receptionist</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Receptionist Dashboard
        </Typography>
      </Container>
    </>
  );
}
