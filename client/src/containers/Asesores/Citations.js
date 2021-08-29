import React, { useContext } from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { ENTRYPOINT } from '../../config/API'
import { obtenerPorAsesor } from '../../utils/API/asessors.js'
import { eliminarCitation } from '../../utils/API/citation.js'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { dateFormatA, getHours } from '../../utils/Date'
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from "@material-ui/core/Tooltip";
import { LocalizationTable, TableIcons } from '../../utils/table.js'
import MaterialTable from "material-table";
import Initializer from '../../store/Initializer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '../Dashboard/components/TablaFactibilidad'
import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Clientes(props) {
    const dato = props.location.state;
    const initializer = useContext(Initializer);
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([])
    React.useEffect(() => {

        if (initializer.usuario != null) {
            
          //  obtenerPorAsesor(setData, initializer);
        }




    }, [initializer.usuario])

    const cargarData = () => {
        obtenerPorAsesor(setData, initializer);
    }
    const eliminar = (id) => {
        eliminarCitation(id, initializer, cargarData)

    }
    const atras = () => {
        props.history.push("/clientes")
      }
    return (
        <div style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15 }}>


            <Grid container>
          
                <Grid item xs={12} md={12} >
                    <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                    <Typography style={{ width:'100%',fontSize: 24, textAlign: 'center' }} color="textPrimary">Citas y llamadas</Typography>
                    <Tooltip title="Cancelar">
                <IconButton aria-label="Cancelar" onClick={() => atras()}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
                    </div>
                  
                    <Table data={data} setData={setData} dato={dato}/>
                    {/* <Table2 data={data} setData={setData} /> */}

                </Grid>
            </Grid>
        </div>

    )
}
