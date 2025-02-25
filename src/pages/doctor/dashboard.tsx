import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography, Card, CardHeader, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';

import { useAuth } from '../../auth/context/auth';
import type { UserRole } from '../../auth/types';
import { fNumber } from '../../utils/format-number';

interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  completedAppointments: number;
  pendingReports: number;
}

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function DoctorDashboardPage() {
  const theme = useTheme();
  const { user } = useAuth();
  
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    todayAppointments: 0,
    completedAppointments: 0,
    pendingReports: 0,
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API calls
    setStats({
      totalPatients: 150,
      todayAppointments: 8,
      completedAppointments: 5,
      pendingReports: 3,
    });

    setAppointments([
      {
        id: '1',
        patientName: 'John Doe',
        time: '10:00 AM',
        type: 'Check-up',
        status: 'scheduled',
      },
      {
        id: '2',
        patientName: 'Jane Smith',
        time: '11:30 AM',
        type: 'Follow-up',
        status: 'scheduled',
      },
      {
        id: '3',
        patientName: 'Robert Johnson',
        time: '2:00 PM',
        type: 'Consultation',
        status: 'scheduled',
      },
    ]);
  }, []);

  return (
    <>
      <Helmet>
        <title>Doctor Dashboard | Hospital Management</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome back, Dr. {user?.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Total Patients" />
              <CardContent>
                <Typography variant="h3">{fNumber(stats.totalPatients)}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Today's Appointments" />
              <CardContent>
                <Typography variant="h3">{fNumber(stats.todayAppointments)}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Completed Today" />
              <CardContent>
                <Typography variant="h3">{fNumber(stats.completedAppointments)}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Pending Reports" />
              <CardContent>
                <Typography variant="h3">{fNumber(stats.pendingReports)}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Upcoming Appointments" />
              <CardContent>
                {appointments.map((appointment) => (
                  <Card key={appointment.id} sx={{ mb: 2, p: 2 }}>
                    <Typography variant="subtitle1">{appointment.patientName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {appointment.time} - {appointment.type}
                    </Typography>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
