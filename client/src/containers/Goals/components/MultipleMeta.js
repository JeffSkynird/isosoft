import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
export default function AlertDialog(props) {
    const [meta, setMeta] = React.useState('')
    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };
    const asignar = () => {
        props.setOpen(false);
        let nuevaData=[]
        props.datos.map((e)=>{
            if(buscar(e.nombres+" "+e.apellidos)){
                nuevaData.push({...e,meta:meta})
            }else{
                nuevaData.push({...e})
            }
        })
        props.setDatos(nuevaData)
        setMeta("")
        handleClose()
      
    };
    const buscar=(nombre)=>{
        let existe=false
        props.data.map((e)=>{
            console.log(nombre+"=="+e.nombres+" "+e.apellidos)
            if(nombre==e.nombres+" "+e.apellidos){
                existe=true
            }
        })
        return existe
    }
    return (

        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Asignación de meta multiple"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Asigna la meta a los registros seleccionados.
                    <List style={{height: props.data.length>2?'150px':'auto',
overflow: 'auto'}}>
                        {props.data.map((dt) => (
                            <ListItem button key={dt.id}>
                                <ListItemText primary={dt.names} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContentText>

                <TextField style={{width:'100%'}} id="outlined-basic" label="Meta" variant="outlined" value={meta} onChange={(e) => { setMeta(e.target.value) }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={asignar} color="primary" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>

    );
}