import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import MultipleMeta from '../components/MultipleMeta'

import { LocalizationTable, TableIcons } from '../../../utils/table.js'
function CellEditable(props) {
  const { useState } = React;
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState([]);
  const [columns, setColumns] = useState([
    { title: "Nombre", field: "names", editable: "never", width: '50%' },
    {
      title: "Meta",
      field: "goal", width: "30%",
      type: "numeric", align: 'left'
    }
  ]);



  return (
    <div>
      <MultipleMeta
        open={open}
        setOpen={setOpen}
        data={select}
        datos={props.data}
        setDatos={props.setData}
      />
      <MaterialTable
        title="Supervisores"
        icons={TableIcons}
        columns={columns}
        data={
          props.data.map((e) => {


            return ({ ...e, names: e.nombres + " " + e.apellidos, goal: e.meta != null ? e.meta : 0 })

          })
        }
        localization={LocalizationTable}
        actions={[
          {
            tooltip: 'Añadir metas',
            icon: TableIcons.Add,
            onClick: (evt, data) =>{ 
            if(data.length!=0){
              setOpen(true)
              setSelect(data)
            }  
           }
          }
        ]}
        options={{
          paging: false,

          tableLayout: "fixed",
          search: true,
          maxBodyHeight: 190,
          padding: "dense",
          selection: true
        }}

        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              let array = props.data.slice();
              array[rowData.tableData.id].meta = newValue;
              props.setData(array);
              resolve();
            });
          }
        }}
      />
    </div>

  );
}
export default CellEditable;
