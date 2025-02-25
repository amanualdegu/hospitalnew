import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function LabDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Lab</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Lab Dashboard
        </Typography>
      </Container>
    </>
  );
}
