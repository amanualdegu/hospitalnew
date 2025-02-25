import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function AdminDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Admin</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Admin Dashboard
        </Typography>
      </Container>
    </>
  );
}
