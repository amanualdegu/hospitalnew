import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Card,
  Container,
  Button,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useAuth } from '../auth/context/auth';
import type { UserRole } from '../auth/types';
import { Iconify } from '../components/iconify/iconify';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  role: Yup.mixed<UserRole>().oneOf(Object.values(['admin', 'doctor', 'nurse', 'patient', 'lab', 'cashier', 'receptionist'] as UserRole[])).required('Role is required'),
});

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const roles: { value: UserRole; label: string }[] = [
  { value: 'patient', label: 'Patient' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'lab', label: 'Lab Technician' },
  { value: 'cashier', label: 'Cashier' },
  { value: 'receptionist', label: 'Receptionist' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(RegisterSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await registerUser(data.email, data.password, data.name, data.role);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('root', {
        message: 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | Hospital Management</title>
      </Helmet>

      <Container maxWidth="sm">
        <Card sx={{ p: 4, mt: 10 }}>
          <Stack spacing={3}>
            <Typography variant="h4">Create Account</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <TextField
                  {...register('name')}
                  label="Full Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />

                <TextField
                  {...register('email')}
                  label="Email address"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  {...register('password')}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify
                            icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  {...register('role')}
                  select
                  label="Role"
                  error={!!errors.role}
                  helperText={errors.role?.message}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </TextField>

                {errors.root && (
                  <Typography color="error" variant="body2">
                    {errors.root.message}
                  </Typography>
                )}

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loading}
                >
                  Register
                </LoadingButton>

                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  onClick={() => navigate('/login')}
                >
                  Already have an account? Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
