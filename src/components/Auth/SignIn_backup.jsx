import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useAuth } from '../../hooks/useAuthMock'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
})

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material'
import { useAuth } from '../../hooks/useAuthMock'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
})

const SignIn = ({ onSuccess }) => {
  const { login, currentUser } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) })

  // Force immediate redirect if user is already logged in
  useEffect(() => {
    console.log('SignIn: currentUser state:', currentUser)
    if (currentUser && !currentUser.isGuest) {
      console.log('SignIn: User is logged in, redirecting immediately...')
      // Force immediate navigation without delay
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 100) // Small delay to ensure component has mounted
    }
  }, [currentUser, navigate])

  // If user is authenticated, don't render the form at all
  if (currentUser && !currentUser.isGuest) {
    console.log('SignIn: Rendering redirect message for authenticated user')
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 2, 
        p: 4,
        minHeight: '50vh'
      }}>
        <CircularProgress />
        <Typography variant="h6" color="primary">
          Already signed in!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Redirecting to dashboard...
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/dashboard', { replace: true })}
          sx={{ mt: 2 }}
        >
          Go to Dashboard Now
        </Button>
      </Box>
    )
  }

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
      toast.success('Signed in successfully!')
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      } else {
        // Navigate to dashboard if no callback
        navigate('/dashboard')
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Sign-in failed')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Sign In</Typography>
      <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
      <TextField label="Password" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
      <Button type="submit" variant="contained" disabled={isSubmitting}>Sign In</Button>
    </Box>
  )
}

export default SignIn
