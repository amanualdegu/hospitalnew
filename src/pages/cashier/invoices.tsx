import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function CashierInvoicesPage() {
  return (
    <>
      <Helmet>
        <title>Invoices | Cashier</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Invoice Management
        </Typography>
      </Container>
    </>
  );
}
