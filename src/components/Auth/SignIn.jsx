import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useAuth } from '../../hooks/useAuthMock'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
})

const SignIn = ({ onSuccess }) => {
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await login(data)
      toast.success('Signed in')
      onSuccess && onSuccess()
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
