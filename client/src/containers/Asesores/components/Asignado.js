import React,{useContext,useState} from 'react'
import Initializer from '../../../store/Initializer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {ENTRYPOINT} from '../../../config/API'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {obtenerSupervisor} from '../../../utils/API/asessors'
import {obtenerTodos,asignarSupervisor} from '../../../utils/API/supervisors'
import Box from '@material-ui/core/Box';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function VerFoto(props) {
    const initializer= useContext(Initializer);
    const [data, setData] = React.useState(null);
    const [supervisorsData, setSupervisorsData] = React.useState([]);
    const [supervisor, setSupervisor] = React.useState("");

    React.useEffect(()=>{
     
        if(initializer.usuario!=null){
            obtenerTodos(setSupervisorsData,initializer)
             obtenerSupervisor(props.open.id,setSupervisor,initializer)
        }
    },[initializer.usuario])
    const asignar=()=>{
        asignarSupervisor({asessor_id:props.open.id,supervisor_id:supervisor},initializer)
    }
    return (
        <div>
               <Dialog
                open={props.open.status}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>props.setOpen({...props.open,status:false})}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Asignar supervisor"}</DialogTitle>
                <DialogContent>
          
                <Grid container>
                <Grid item md={12} xs={12}>
                    <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel id="label">Supervisor</InputLabel>
                    <Select
                        labelId="label"
                        value={supervisor}
                        onChange={(e) => setSupervisor(e.target.value)}
                        label="ciu"
                    >
                        <MenuItem value="">
                        <em>Seleccione un supervisor</em>
                        </MenuItem>
                        {supervisorsData.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                            <em>{e.names}</em>
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                </Grid>
                        
                </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>props.setOpen({...props.open,status:false})} color="primary">
                    Cancelar
                </Button>
                <Button onClick={()=>{
                    props.setOpen({...props.open,status:false})
                    asignar()
                }} color="secondary">
                    Asignar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
