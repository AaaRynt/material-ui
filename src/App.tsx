import BackHandIcon from '@mui/icons-material/BackHand'
import CelebrationIcon from '@mui/icons-material/Celebration'
import { Alert, Button, Snackbar, type SnackbarCloseReason } from '@mui/material'
import { useState } from 'react'
export default function App() {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] p-8">
      <Button variant="contained" onClick={handleClick}>
        MUI
        <CelebrationIcon />
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          icon={<BackHandIcon fontSize="small" />}
          severity="info"
          color="info"
          variant="filled"
        >
          Hello, Material UI v9!
        </Alert>
      </Snackbar>
    </div>
  )
}
