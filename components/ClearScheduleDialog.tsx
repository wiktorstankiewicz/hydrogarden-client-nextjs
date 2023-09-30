import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography, DialogActions, Button } from '@mui/material'
import React from 'react'

type Props = {open: boolean, onClose: () => void, onSubmit: () => void }

function ClearScheduleDialog(props: Props) {
  return (
    <Dialog
    open={props.open}
    onClose={props.onClose}
  >
    <DialogTitle>Wyczyść harmonogram</DialogTitle>
    <DialogContent>
      <DialogContentText>
        <Typography variant="body2" color="text.secondary">
          Czy na pewno chcesz wyczyścić harmonogram?
        </Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={props.onClose}
        color="primary"
      >
        Anuluj
      </Button>
      <Button onClick={props.onSubmit} color="primary">
        Wyczyść
      </Button>
    </DialogActions>
  </Dialog>
    )
}

export default ClearScheduleDialog