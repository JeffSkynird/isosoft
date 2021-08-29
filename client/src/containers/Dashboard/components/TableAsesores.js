import React, { Component, useEffect, useContext,useState } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { LocalizationTable, TableIcons } from '../../../utils/table.js'
import { obtenerIncidencias, guardarCitasLlamadas } from '../../../utils/API/citation'
import Initializer from "../../../store/Initializer";
import Grow from '@material-ui/core/Grow';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});
function CellEditable(props) {
   
    const initializer = useContext(Initializer);
    const [open, setOpen] = React.useState({ status: false, data: [] });
    const [select, setSelect] = React.useState([]);
    const [data, setData] = React.useState([])
    const [statusSelected, setStatusSelected] = React.useState('')


    React.useEffect(() => {

        if (initializer.usuario != null) {
            obtenerIncidencias(setData, initializer)
        }
    }, [initializer.usuario]);
    const [columns, setColumns] = useState([
        {
            title: "Efectiva",
            field: "efectiva",
            align: 'left',
            lookup: { 0: 'No efectiva', 1: 'Entrevista' },
        },
        { title: "Tipo", field: "tipo", editable: "never", width: 70, },
        {
            title: "Interesado",
            field: "nombres_completos",
            align: 'left', editable: "never"
        },
        {
            title: "Titulo",
            field: "titulo", editable: "never",
            align: 'left'
        },
        {
            title: "Descripción",
            field: "descripcion", editable: "never",
            align: 'left'
        },
        {
            title: "Fecha",
            field: "fecha", editable: "never",
            align: 'left',defaultSort:'asc'
        },
        
        {
          Header: "Actions",
          accessor: "actions",
          sortable: false,
          filterable: false,
          width: 120,
          Cell: (row) => (
            <div style={{ textAlign: "center" }}>{row.value}</div>
          ),
        }

    ]);

    const guardar = () => {
        guardarCitasLlamadas({ data: data }, initializer)
    }
    const guardarSeleccionado = () => {
        if (statusSelected != "") {
            let array = open.data.slice();
            let newArray = []
            array.map((e) => {
                newArray.push({ ...e, efectiva: statusSelected })
              
            })
    
            newArray.map((e)=>{
                refrescar(e.tipo,e.id,e.efectiva)
            })
          
            setOpen({ data: [], status: false })
            setStatusSelected('')
            guardarCitasLlamadas({ data: newArray }, initializer)
        }

    }
    const refrescar = (tipo, id, valor) => {
        let array = data.slice()
        array.map((e, i) => {
            if (e.tipo == tipo) {
                if (id == e.id) {
                    array[i].efectiva = valor
                }
            } else if (e.tipo == tipo) {
                if (id == e.id) {
                    array[i].efectiva = valor
                }
            }

        })
        setData(array)
    }
    return (
        <div>
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
            <MaterialTable
                title="Registros"
                icons={TableIcons}
                columns={columns}
                data={
                    data
                }
                isLoading={initializer.loader}
                localization={LocalizationTable}
                actions={[
                    {
                        tooltip: 'Cambiar estado',
                        icon: TableIcons.Edit,
                        onClick: (evt, data) => {
                            setOpen({ data: data, status: true })
                        }
                    },
                    {
                        icon: TableIcons.SaveIcon,
                        tooltip: 'Guardar',
                        isFreeAction: true,
                        onClick: (event) => guardar()
                    }
                ]}
                options={{
                    paging: false,
                    fixedColumns: {
                        left: 0,
                        right: 1
                      },
                    tableLayout: "fixed",
                    search: false,
                    actionsColumnIndex: -1,
                    maxBodyHeight: 700,
                    padding: "dense",
                    selection: true,
                    headerStyle: {
                        fontWeight: 'bold',
                        backgroundColor:'#FAFAFA',
                        position: 'sticky',
                        top: 0
                      },
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...data];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          setData([...dataUpdate]);
            
                          resolve();
                        }, 1000)
                      }),
                
                  }}
            /*     cellEditable={{
                    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                        return new Promise((resolve, reject) => {
                            let array = data.slice();
                            array[rowData.tableData.id].efectiva = newValue;
                            setData(array);
                            resolve();
                        });
                    }
                }} */
            />
        </div>

    );
}
export default CellEditable;
