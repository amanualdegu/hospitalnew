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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useAuth } from '../auth/context/auth';
import { Iconify } from '../components/iconify/iconify';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string().required('Password is required'),
});

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('root', {
        message: 'Invalid email or password',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Hospital Management</title>
      </Helmet>

      <Container maxWidth="sm">
        <Card sx={{ p: 4, mt: 10 }}>
          <Stack spacing={3}>
            <Typography variant="h4">Sign in to Hospital Management</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
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
                  Login
                </LoadingButton>

                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  onClick={() => navigate('/register')}
                >
                  Create Account
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
