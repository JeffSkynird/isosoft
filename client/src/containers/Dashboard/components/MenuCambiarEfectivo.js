import React from 'react'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
export default function MenuCambiarEfectivo() {
    return (
        <Dialog
        open={open.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen({ ...open, status: false })}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">{"Guardardo múltiple"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Guarda los registros seleccionados
            </DialogContentText>
            <Grid item md={12} xs={12}>
                <FormControl variant="outlined" style={{ width: '100%' }} >
                    <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={statusSelected}
                        onChange={(event) => setStatusSelected(event.target.value)}
                        label="Estado"
                    >
                        <MenuItem value="">
                            <em>Elegir el estado</em>
                        </MenuItem>
                        <MenuItem value={1}>Efectiva</MenuItem>
                        <MenuItem value={0}>No efectiva</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {
                setOpen({ ...open, status: false })
                setStatusSelected('')
            }
            } color="primary">
                Cancelar
            </Button>
            <Button onClick={() => guardarSeleccionado()} color="primary">
                Guardar
            </Button>
        </DialogActions>
    </Dialog>

    )
}
