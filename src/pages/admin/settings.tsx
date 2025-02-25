import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function AdminSettingsPage() {
  return (
    <>
      <Helmet>
        <title>Settings | Admin</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          System Settings
        </Typography>
      </Container>
    </>
  );
}
