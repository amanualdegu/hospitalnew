import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function CashierDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Cashier</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Cashier Dashboard
        </Typography>
      </Container>
    </>
  );
}
