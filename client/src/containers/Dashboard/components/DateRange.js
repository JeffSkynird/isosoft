import React, {useState} from 'react'
import Slide from '@material-ui/core/Slide';
import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import './style.css'

import DialogTitle from '@material-ui/core/DialogTitle';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction={'up'} ref={ref} {...props} />;
  });
export default function DateRangeComponent(props) {

    const {open,setOpen,setRange,range,filtrar} = props
    const [openDate,setOpenDate] =useState(true)

    const handleClose = ()=>{
        setOpen(false)
        filtrar()
    }
    const getFirst=()=>{
        let date = new Date();
        let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
       
        return primerDia
      }
      const getLast=()=>{
        let date = new Date();
      
        let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return ultimoDia
      }
    return (
       
              <Dialog
           
        open={open}
        TransitionComponent={Transition}
        keepMounted={false}
        
        className="MuiGrid-wrap-xs-nowrap-40"
        scroll={'paper'}
        onClose={(handleClose)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          <div  id="alert-dialog" >
          <DialogTitle id="alert-dialog-slide-title"  >
          {"Seleccione un rango de fecha"} 
       

        </DialogTitle>
   {open!=false?
   
   <DateRangePicker
   style={{width:'100%'}}
           open={true}
           minDate={new Date(1995,10,10)}
           maxDate={new Date(2050,10,10)}
       
           initialDateRange={range!=null?range:{startDate:getFirst(),endDate:getLast()}}
           onChange={range => setRange(range)}
           definedRanges={[]}
       />
       :null
}
    
          </div>
       
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Aplicar</Button>
        </DialogActions>
      </Dialog>
  
    )
}
