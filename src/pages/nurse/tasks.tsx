import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function NurseTasksPage() {
  return (
    <>
      <Helmet>
        <title>Tasks | Nurse</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Task Management
        </Typography>
      </Container>
    </>
  );
}
