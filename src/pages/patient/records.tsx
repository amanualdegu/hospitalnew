import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function PatientRecordsPage() {
  return (
    <>
      <Helmet>
        <title>Records | Patient</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Medical Records
        </Typography>
      </Container>
    </>
  );
}
