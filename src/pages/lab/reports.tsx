import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function LabReportsPage() {
  return (
    <>
      <Helmet>
        <title>Reports | Lab</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Report Management
        </Typography>
      </Container>
    </>
  );
}
