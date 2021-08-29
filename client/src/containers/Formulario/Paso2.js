import React, { useState, useEffect, useContext } from "react";
import datos from "../../assets/datos.JPG";

import Box from "@material-ui/core/Box";
import Initializer from "../../store/Initializer";
import {
  editarCliente,
  uploadFiles,
  registrarCliente,
  upload,
  obtenerDataCliente,
  crearCodigo,
  editarIngresos,
  tieneConyuge,
} from "../../utils/API/clientes";

import Grid from "@material-ui/core/Grid";
import "./style/Main.css";

import ModalVerificarCorreo from "./Components/ModalVerificarCorreo";
import { InsertCommentSharp } from "@material-ui/icons";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
export default function Paso2(props) {
  const initializer = useContext(Initializer);

  const [dependencia, setDependencia] = React.useState(true);
  const [dependenciaS, setDependenciaS] = React.useState(true);
  const [ivaMensual, setIvaMensual] = React.useState(false);
  const [ivaMensualS, setIvaMensualS] = React.useState(false);

  const [income, setIncome] = React.useState("");
  const [otherIncome, setOtherIncome] = React.useState("");
  const [otherExpenses, setOtherExpenses] = React.useState("");
  const [rentExpenses, setRentExpenses] = React.useState("");
  const [foodExpenses, setFoodExpenses] = React.useState("");
  const [clothingExpenses, setClothingExpenses] = React.useState("");
  const [basicExpenses, setBasicExpenses] = React.useState("");
  const [educationExpenses, setEducationExpenses] = React.useState("");
  const [transporte, setTransporte] = React.useState("");

  const [incomeS, setIncomeS] = React.useState("");
  const [otherIncomeS, setOtherIncomeS] = React.useState("");
  const [rentExpensesS, setRentExpensesS] = React.useState("");
  const [foodExpensesS, setFoodExpensesS] = React.useState("");
  const [clothingExpensesS, setClothingExpensesS] = React.useState("");
  const [basicExpensesS, setBasicExpensesS] = React.useState("");
  const [educationExpensesS, setEducationExpensesS] = React.useState("");
  const [transporteS, setTransporteS] = React.useState("");

  const [ivaMensualO, setIvaMensualO] = React.useState(false);
  const [ivaMensualOS, setIvaMensualOS] = React.useState(false);

  
  const [hasSpouse, setHasSpouse] = React.useState({
    has_spouse: false,
    client_data: null,
  });
  var url = new URL(window.location);
  var c = url.searchParams.get("client_id");

  var client_id = props.client_id != null ? props.client_id : c;
  React.useEffect(() => {
    let url = new URL(window.location);
    let c = url.searchParams.get("client_id");

    let client_id = props.client_id != null ? props.client_id : c;

    if (client_id != null) {
      tieneConyuge(client_id, setHasSpouse);
    }
  }, [props.client_id]);

  React.useEffect(() => {
    if (hasSpouse.client_data != null) {

      setIvaMensualO(hasSpouse.client_data.iva_mensual_otros_ingresos==1?true:false)
      setDependencia(hasSpouse.client_data.dependencia==1?true:false)
      setIncome(hasSpouse.client_data.sueldo);
      setOtherIncome(hasSpouse.client_data.otros_ingresos);
      setRentExpenses(hasSpouse.client_data.egreso_renta);
      setFoodExpenses(hasSpouse.client_data.egreso_comida);
      setClothingExpenses(hasSpouse.client_data.egreso_ropa);
      setBasicExpenses(hasSpouse.client_data.egreso_servicios_basicos);
      setEducationExpenses(hasSpouse.client_data.egreso_educacion);
      setTransporte(hasSpouse.client_data.egreso_transporte);
      setOtherExpenses(hasSpouse.client_data.otros_egresos)
      if (hasSpouse.spouse_data != null) {
        setIvaMensualOS(hasSpouse.spouse_data.iva_mensual_otros_ingresos==1?true:false)
        setDependenciaS(hasSpouse.spouse_data.dependencia==1?true:false)
        setIncomeS(hasSpouse.spouse_data.sueldo);
        setOtherIncomeS(hasSpouse.spouse_data.otros_ingresos);
        setRentExpensesS(hasSpouse.spouse_data.egreso_renta);
        setFoodExpensesS(hasSpouse.spouse_data.egreso_comida);
        setClothingExpensesS(hasSpouse.spouse_data.egreso_ropa);
        setBasicExpensesS(hasSpouse.spouse_data.egreso_servicios_basicos);
        setEducationExpensesS(hasSpouse.spouse_data.egreso_educacion);
        setTransporteS(hasSpouse.spouse_data.egreso_transporte);
      }
    }
  }, [hasSpouse]);
  const editar = () => {
    let url = new URL(window.location);
    let c = url.searchParams.get("client_id");
    let client_id = props.client_id != null ? props.client_id : c;

    editarIngresos(
      {
        monthly_iva:ivaMensual==true?1:0,
        monthly_ivaS:ivaMensualS==true?1:0,
        other_monthly_iva:ivaMensualO==true?1:0,
        other_monthly_ivaS:ivaMensualOS==true?1:0,
        dependence: dependencia == true ? 1 : 0,
        dependence_spouse: dependenciaS == true ? 1 : 0,
        client_id: client_id,
        month_income: income,
        other_income: otherIncome,
        other_expenses: otherExpenses,
        rent_expenses: rentExpenses,
        food_expenses: foodExpenses,
        clothing_expenses: clothingExpenses,
        basic_expenses: basicExpenses,
        education_expenses: educationExpenses,
        transport_expenses: transporte,

        month_income_spouse: incomeS,
        other_income_spouse: otherIncomeS,
        rent_expenses_spouse: rentExpensesS,
        food_expenses_spouse: foodExpensesS,
        clothing_expenses_spouse: clothingExpensesS,
        basic_expenses_spouse: basicExpensesS,
        education_expenses_spouse: educationExpensesS,
        transport_expenses_spouse: transporteS,
      },
      initializer,
      changeStep
    );
  };

  const changeStep = () => {
    let url = new URL(window.location);
    let c = url.searchParams.get("client_id");
    let client_id = props.client_id != null ? props.client_id : c;

    if (hasSpouse.client_data != null) {
      if (hasSpouse.client_data.regalo != null) {
        props.changeStep("3", client_id);
      } else {
        props.changeStep("0", client_id);
      }
    }
  };

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "15%",
            marginTop: "15px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              backgroundColor: "#cbcbcb",
              borderRadius: "13px",
              height: "13px",
              width: "13px",
              cursor: "pointer",
            }}
            onClick={() => props.changeStep("1", client_id)}
          ></div>
          <div
            style={{
              backgroundColor: "#22428b",
              borderRadius: "13px",
              height: "13px",
              width: "13px",
            }}
          ></div>
          <div
            style={{
              backgroundColor: "#cbcbcb",
              borderRadius: "13px",
              height: "13px",
              width: "13px",
              cursor: "pointer",
            }}
            onClick={() => props.changeStep("3", client_id)}
          ></div>
        </div>
        <p style={{ margin: "5px", color: "#214088" }}>PASO 2 DE 3</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MonetizationOnOutlinedIcon
          style={{ fontSize: "40px", color: "#74b6d5", marginBottom: "3px" }}
        />
        <p
          style={{
            width: "150px",
            color: "#575757 ",
            margin: "0px",
            textAlign: "center",
          }}
        >
          Por favor ingresa tus datos económicos
        </p>
      </div>
      <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <p style={{ color: "#575757", fontSize: "13px" }}>
          <span>
            <label htmlFor="si" style={{ display: "inline-flex" }}>
              <input
                type="radio"
                name=""
                id="si"
                checked={dependencia == true ? true : false}
                onChange={() => {
                  setDependencia(true);
                }}
              />
              Mantengo una relación laboral de dependencia
            </label>
            <label htmlFor="no" style={{ display: "inline-flex" }}>
              <input
                type="radio"
                name=""
                id="no"
                checked={dependencia == false ? true : false}
                onChange={() => {
                  setDependencia(false);
                }}
              />
              Soy trabajador independiente
            </label>
          </span>
        </p>
      </div>

      {
        dependencia==false?
        <div style={{ paddingLeft: "10px", paddingRight: "10px" ,width: '100%'}}>
        <p style={{ color: "#575757", fontSize: "13px" ,margin:'0px'}}>
          <span>
            <label htmlFor="ivaM" style={{ display: "inline-flex" }}>
              <input
                type="checkbox"
                name=""
                id="ivaM"
                checked={ivaMensual}
                onChange={() => {
                  setIvaMensual(!ivaMensual);
                }}
              />
              ¿Hago declaraciones del IVA mensuales?
            </label>
           
          </span>
        </p>
      </div>

        :
null
        
      }
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          width: "100%",
          flexDirection: "column",
          paddingLeft: "10px",
          color: "#575757",
          paddingRight: "10px",
        }}
      >
        <p style={{ color: "#214088" }}>Ingresos mensuales estimados</p>
        <div style={{ display: "flex" }}>
          <input
            style={{ padding: "6px", marginRight: "15px", width: "100%" }}
            type="number"
            name=""
            id=""
            placeholder="Ingresos"
            onChange={(e) => setIncome(e.target.value)}
            value={income}
          />
          <input
            style={{ padding: "6px", width: "100%" }}
            type="number"
            name=""
            id=""
            placeholder="Otros"
            onChange={(e) => setOtherIncome(e.target.value)}
            value={otherIncome}
          />
        </div>
        {
             otherIncome!=0&&otherIncome!=null?
             dependencia?
        <div style={{  marginTop:'10px',paddingRight: "10px" ,width: '100%'}}>
          <p style={{ color: "#575757", fontSize: "13px" ,margin:'0px'}}>Otros ingresos:</p>
        <p style={{ color: "#575757", fontSize: "13px" ,margin:'0px'}}>
          <span>
            <label htmlFor="ivaM" style={{ display: "inline-flex" }}>
              <input
                type="checkbox"
                name=""
                id="ivaM"
                checked={ivaMensualO}
                onChange={() => {
                  setIvaMensualO(!ivaMensualO);
                }}
              />
       ¿Hago declaraciones del IVA mensuales?
            </label>
           
          </span>
        </p>
      </div>
:null
        :
null
        
      }
        <p style={{ color: "#214088" }}>Egresos mensuales estimados</p>
        <div style={{ display: "flex" }}>
          <input
            style={{ padding: "6px", marginRight: "15px", width: "100%" }}
            type="number"
            name=""
            id=""
            placeholder="Arriendo"
            onChange={(e) => setRentExpenses(e.target.value)}
            value={rentExpenses}
          />
          <input
            style={{ padding: "6px", width: "100%" }}
            type="number"
            name=""
            id=""
            placeholder="Alimento"
            onChange={(e) => setFoodExpenses(e.target.value)}
            value={foodExpenses}
          />
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <input
            style={{ padding: "6px", marginRight: "15px", width: "100%" }}
            type="number"
            name=""
            id=""
            placeholder="Vestimenta"
            onChange={(e) => setClothingExpenses(e.target.value)}
            value={clothingExpenses}
          />
          <input
            style={{ padding: "6px", width: "100%" }}
            type="number"
            name=""
            id=""
            placeholder="S. básicos"
            onChange={(e) => setBasicExpenses(e.target.value)}
            value={basicExpenses}
          />
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <input
            style={{ padding: "6px", marginRight: "15px", width: "100%" }}
            type="number"
            name=""
            id=""
            placeholder="Educación"
            onChange={(e) => setEducationExpenses(e.target.value)}
            value={educationExpenses}
          />
          <input
            style={{ padding: "6px", width: "100%" }}
            type="number"
            name=""
            id=""
            placeholder="Transporte"
            onChange={(e) => setTransporte(e.target.value)}
            value={transporte}
          />
        </div>
        <input
            style={{ padding: "6px", width: "100%", marginTop: "10px"  }}
            type="number"
            name=""
            id=""
            placeholder="Otros egresos"
            onChange={(e) => setOtherExpenses(e.target.value)}
            value={otherExpenses}
          />
        {hasSpouse.has_spouse != false ? (
          <div style={{ width: "100%" }}>
            <p style={{ color: "#214088" }}>Cónyuge</p>
            <div>
              <p style={{ color: "#575757", fontSize: "13px" }}>
                <span>
                  <label htmlFor="siS" style={{ display: "inline-flex" }}>
                    <input
                      type="radio"
                      name=""
                      id="siS"
                      checked={dependenciaS == true ? true : false}
                      onChange={() => {
                        setDependenciaS(true);
                      }}
                    />
                    Mantengo una relación laboral de dependencia
                  </label>
                  <label htmlFor="noS" style={{ display: "inline-flex" }}>
                    <input
                      type="radio"
                      name=""
                      id="noS"
                      checked={dependenciaS == false ? true : false}
                      onChange={() => {
                        setDependenciaS(false);
                      }}
                    />
                    Soy trabajador independiente
                  </label>
                </span>
              </p>
            </div>
            {
        dependenciaS==false?
        <div style={{ paddingLeft: "10px", paddingRight: "10px" ,width: '100%'}}>
        <p style={{ color: "#575757", fontSize: "13px" ,margin:'0px'}}>
          <span>
            <label htmlFor="ivaMS" style={{ display: "inline-flex" }}>
              <input
                type="checkbox"
                name=""
                id="ivaMS"
                checked={ivaMensualS}
                onChange={() => {
                  setIvaMensualS(!ivaMensualS);
                }}
              />
              ¿Hago declaraciones del IVA mensuales?
            </label>
           
          </span>
        </p>
      </div>

        :
null
        
      }
            <p style={{ color: "#214088" }}>Ingresos mensuales estimados</p>
            <div style={{ display: "flex" }}>
              <input
                style={{ padding: "6px", marginRight: "15px", width: "100%" }}
                type="number"
                name=""
                id=""
                placeholder="Ingresos"
                onChange={(e) => setIncomeS(e.target.value)}
                value={incomeS}
              />
              <input
                style={{ padding: "6px", width: "100%" }}
                type="number"
                name=""
                id=""
                placeholder="Otros"
                onChange={(e) => setOtherIncomeS(e.target.value)}
                value={otherIncomeS}
              />
            </div>
            {
             otherIncomeS!=0&&otherIncomeS!=null?
             
                dependenciaS?
                <div style={{ marginTop:'10px',paddingRight: "10px" ,width: '100%'}}>
                   <p style={{ color: "#575757", fontSize: "13px" ,margin:'0px'}}>Otros ingresos:</p>
                <p style={{ color: "#575757", fontSize: "13px" ,margin:'0px'}}>
                  <span>
                    <label htmlFor="ivaMS" style={{ display: "inline-flex" }}>
                      <input
                        type="checkbox"
                        name=""
                        id="ivaMS"
                        checked={ivaMensualOS}
                        onChange={() => {
                          setIvaMensualOS(!ivaMensualOS);
                        }}
                      />
                       ¿Hago declaraciones del IVA mensuales?
                    </label>
                   
                  </span>
                </p>
              </div>
                :
                null
             
      

        :
null
        
      }
            {
         1!=1?
        <div>
 <div style={{ display: "flex" }}>
              <input
                style={{ padding: "6px", marginRight: "15px", width: "100%" }}
                type="number"
                name=""
                id=""
                placeholder="Arriendo"
                onChange={(e) => setRentExpensesS(e.target.value)}
                value={rentExpensesS}
              />
              <input
                style={{ padding: "6px", width: "100%" }}
                type="number"
                name=""
                id=""
                placeholder="Alimento"
                onChange={(e) => setFoodExpensesS(e.target.value)}
                value={foodExpensesS}
              />
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <input
                style={{ padding: "6px", marginRight: "15px", width: "100%" }}
                type="number"
                name=""
                id=""
                placeholder="Vestimenta"
                onChange={(e) => setClothingExpensesS(e.target.value)}
                value={clothingExpensesS}
              />
              <input
                style={{ padding: "6px", width: "100%" }}
                type="number"
                name=""
                id=""
                placeholder="S. básicos"
                onChange={(e) => setBasicExpensesS(e.target.value)}
                value={basicExpensesS}
              />
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <input
                style={{ padding: "6px", marginRight: "15px", width: "100%" }}
                type="number"
                name=""
                id=""
                placeholder="Educación"
                onChange={(e) => setEducationExpensesS(e.target.value)}
                value={educationExpensesS}
              />
              <input
                style={{ padding: "6px", width: "100%" }}
                type="number"
                name=""
                id=""
                placeholder="Transporte"
                onChange={(e) => setTransporteS(e.target.value)}
                value={transporteS}
              />
            </div>
         
        </div>
           
         :null
         
       }
            
          </div>
        ) : null}
        <p style={{ textAlign: "center" }}>
          ¡Presiona CONTINUAR para estar más cerca de tú casa propia!
        </p>
        <button
          style={{
            fontWeight: "bold",
            borderRadius: "5px",
            padding: "5px",
            color: "white",
            cursor: "pointer",
            backgroundColor: "#213f87",
          }}
          onClick={editar}
        >
          CONTINUAR
        </button>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              width: "18%",
              marginTop: "15px",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                backgroundColor: "#cbcbcb",
                borderRadius: "13px",
                height: "13px",
                width: "13px",
                cursor: "pointer",
              }}
              onClick={() => props.changeStep("1", client_id)}
            ></div>
            <div
              style={{
                backgroundColor: "#22428b",
                borderRadius: "13px",
                height: "13px",
                width: "13px",
              }}
            ></div>
            <div
              style={{
                backgroundColor: "#cbcbcb",
                borderRadius: "13px",
                height: "13px",
                width: "13px",
                cursor: "pointer",
              }}
              onClick={() => props.changeStep("3", client_id)}
            ></div>
          </div>
        </div>
        <p style={{ textAlign: "center" }}>
          ¿Necesitas más tiempo para revisar estos valores?{" "}
          <a
            onClick={() =>
              initializer.mostrarNotificacion({
                type: "success",
                message:
                  "¡Esperamos verte pronto! Te hemos enviado un correo confirmando tu registro, para que cuando estés preparado para continuar con este proceso, hagas click en el botón y vuelvas directamente al paso 2. Son 3 pasos para que completes tu registro/reserva y te asignemos un asesor. ¡Queremos volverte a ver por aquí pronto!",
              })
            }
          >
            Presiona aquí
          </a>
        </p>
      </div>
    </React.Fragment>
  );
}
