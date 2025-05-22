import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog as MuiDialog,
} from '@mui/material'
import type { FC } from 'react'
import type { ButtonProps } from '@mui/material/Button'

type DialogProps = {
  open: boolean
  title: string
  loading?: boolean
  description?: string
  buttonText?: string
  buttonColor?: ButtonProps['color']
  buttonVariant?: ButtonProps['variant']
  onClose: () => void
  onClick?: () => void
}

export const Dialog: FC<DialogProps> = ({
  onClose,
  onClick,
  buttonText,
  open,
  title,
  loading,
  description,
  buttonColor = 'primary',
  buttonVariant = 'contained',
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Cancel
        </Button>
        {buttonText && (
          <Button color={buttonColor} variant={buttonVariant} loading={loading} onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </DialogActions>
    </MuiDialog>
  )
}
