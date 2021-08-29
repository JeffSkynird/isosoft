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
import {downloadFiles} from '../../../utils/API/supervisors'
import Box from '@material-ui/core/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function VerFoto(props) {
    const initializer= useContext(Initializer);
    const [data, setData] = React.useState(null);
    React.useEffect(()=>{
     
        if(initializer.usuario!=null){
           
             downloadFiles(props.open.dni,setData,initializer)
        }
    },[initializer.usuario])
  
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
                <DialogTitle id="alert-dialog-slide-title">{"Foto del supervisor"}</DialogTitle>
                <DialogContent>
          
                <Grid container>
                    <Grid item md={12}>
                    <Box mt={2} style={{width:'100%'}}>
                      
                            {data != "" ? (
                            <iframe
                                src={data}
                                frameborder="0"
                                width="100%"
                                height={220}
                            ></iframe>
                            ) : null}
                     
                        </Box>
                    </Grid>
                        
                </Grid>
                </DialogContent>
                <DialogActions>
              
                <Button onClick={()=>{
                    props.setOpen({...props.open,status:false})
           
                }} color="secondary">
                    Aceptar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
