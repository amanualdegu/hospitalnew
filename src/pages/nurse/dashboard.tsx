import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function NurseDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Nurse</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Nurse Dashboard
        </Typography>
      </Container>
    </>
  );
}
