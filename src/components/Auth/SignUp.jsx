import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useAuth } from '../../hooks/useAuthMock'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  displayName: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required')
})

const SignUp = ({ onSuccess }) => {
  const { signup, currentUser } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) })

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard')
    }
  }, [currentUser, navigate])

  const onSubmit = async (data) => {
    try {
      await signup(data.email, data.password, data.displayName)
      toast.success('Account created successfully!')
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      } else {
        // Navigate to dashboard if no callback
        navigate('/dashboard')
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Sign-up failed')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Create Account</Typography>
      <TextField label="Full Name" {...register('displayName')} error={!!errors.displayName} helperText={errors.displayName?.message} />
      <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
      <TextField label="Password" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
      <Button type="submit" variant="contained" disabled={isSubmitting}>Sign Up</Button>
    </Box>
  )
}

export default SignUp
