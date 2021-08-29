import React, { useContext } from 'react'
import { LocalizationTable, TableIcons } from '../../utils/table.js'
import MaterialTable from "material-table";
import { obtenerLogs } from '../../utils/API/pagos'
import { TablePagination } from "@material-ui/core";
import Initializer from '../../store/Initializer'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});
export default function Payment() {
    const initializer = useContext(Initializer);

    const [pageNumber, setPageNumber] = React.useState(0);
    const [rowPerPage, setRowPerPage] = React.useState(30);
    const [total, setTotal] = React.useState(0);
    const [open, setOpen] = React.useState({ status: false, body: "", params: "" });
    const [data, setData] = React.useState([])
    React.useEffect(() => {

        obtenerLogs({ perpage: rowPerPage, page: (pageNumber + 1) }, setTotal, setData, initializer);




    }, [])
    const cargarData = (page, row) => {

        obtenerLogs({ perpage: row, page: (page + 1) }, setTotal, setData, initializer);
        setPageNumber(page)
    }
    return (
        <React.Fragment>
     
            <MaterialTable

                icons={TableIcons}
                columns={[
                    { title: "Fecha", field: "date" },
                    { title: "Url", field: "endpoint", },
                    { title: "Método", field: "method" },

                    { title: "Estado", field: "status" },
                    { title: "Parámetros", field: "params" },

                    { title: "Respuesta", field: "body" },

               





                ]}

                data={
                    data.map((e) => {
                        return ({ ...e, date: e.date + " " + e.time })
                    })
                }

                localization={LocalizationTable}
                title="Pagos"

                components={
                    {
                        Pagination: props => (
                            <TablePagination
                                {...props}
                                rowsPerPageOptions={[30, 50, 100]}
                                rowsPerPage={rowPerPage}
                                count={total}
                                page={
                                    pageNumber
                                }
                                onChangePage={(e, page) => {

                                    cargarData(page, rowPerPage)
                                }
                                }
                                onChangeRowsPerPage={event => {
                                    props.onChangeRowsPerPage(event);
                                    setRowPerPage(event.target.value);
                                    cargarData(pageNumber, event.target.value)
                                }}
                            />
                        ),

                    }}
                options={{
                    debounceInterval: 500,
                    pageSize: 30,
                    pageSizeOptions: [30, 50, 100],

                    actionsColumnIndex: -1,

                    search: true,
                    maxBodyHeight: 350,
                    padding: 'dense',
                    headerStyle: {
                        textAlign: 'left'
                    },
                    cellStyle: {
                        textAlign: 'left'
                    },
                    searchFieldStyle: {

                        padding: 5
                    }
                }}


            />
        </React.Fragment>


    )
}
