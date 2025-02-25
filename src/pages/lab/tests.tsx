import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function LabTestsPage() {
  return (
    <>
      <Helmet>
        <title>Tests | Lab</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Test Management
        </Typography>
      </Container>
    </>
  );
}
