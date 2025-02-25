import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';

export default function AdminUsersPage() {
  return (
    <>
      <Helmet>
        <title>Users | Admin</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          User Management
        </Typography>
      </Container>
    </>
  );
}
