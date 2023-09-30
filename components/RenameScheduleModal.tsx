import { Circuit } from '@/app/(types)/types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Box, FormGroup, TextField, Button } from '@mui/material'
import React from 'react'

type Props = {open: boolean, onClose: () => void, circuit: Circuit, onSubmit: (event: any) => void}

function RenameScheduleModal(props: Props) {
  return (
    <Dialog
    open={props.open}
    onClose={props.onClose}
    >
      <DialogTitle>Zmień nazwę obiegu</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2" color="text.secondary">
            Podaj nową nazwę obiegu
          </Typography>
        </DialogContentText>
        <form onSubmit={props.onSubmit}>
          <Box>
            <FormGroup>
              <TextField
                label="Nazwa obiegu"
                name="circuitName"
                defaultValue={props.circuit.circuitName}
                margin="normal"
                type="text"
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Zatwierdź
            </Button>
            <Button

              color="primary"
              onClick={props.onClose}
            >
              Anuluj
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  
    )
}

export default RenameScheduleModal