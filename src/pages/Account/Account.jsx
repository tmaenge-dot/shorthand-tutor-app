import React from 'react'
import { Box, Typography, Button, Card, CardContent, Avatar, Grid, Divider } from '@mui/material'
import { useAuth } from '../../hooks/useAuthMock'
import { useSubscription } from '../../hooks/useSubscription'

const Account = () => {
  const { currentUser, logout } = useAuth()
  const { currentPlan } = useSubscription()

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">Account</Typography>
          <Typography variant="body1">Email: {currentUser?.email}</Typography>
          <Typography variant="body1">Plan: {currentPlan.name}</Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" href="/billing" sx={{ mr: 1 }}>Manage Billing</Button>
            <Button variant="contained" color="error" onClick={logout}>Sign Out</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Account
