import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function CashierBillingPage() {
  return (
    <>
      <Helmet>
        <title>Billing | Cashier</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Billing Management
        </Typography>
      </Container>
    </>
  );
}
