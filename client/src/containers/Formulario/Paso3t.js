import React, { useState, useEffect, useContext } from "react";
import datos from "../../assets/datos.JPG";
import PublishIcon from "@material-ui/icons/Publish";
import Box from "@material-ui/core/Box";
import Initializer from "../../store/Initializer";
import {
  editarCliente,
  uploadFiles,
  registrarCliente,
  tieneArchivos,tieneArchivosS,
  upload,
  obtenerDataCliente,
  crearCodigo,
  tieneDependencia,uploadConyuge,
  editarIngresos,
  obtenerReward,
} from "../../utils/API/clientes";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import "./style/Main.css";

import ModalVerificarCorreo from "./Components/ModalVerificarCorreo";
import { InsertCommentSharp } from "@material-ui/icons";
import logoAmbiensa from "../../assets/LogoAmbiensa.png";
import logoPaseo from "../../assets/Paseo-Sol-Horizontal.png";
import logoGeranio from "../../assets/Villa-Geranio-Horizontal.png";
export default function Paso3(props) {
  const initializer = useContext(Initializer);
  const [dniFile, setDniFile] = useState(null);
  const [rolesFle, setRolesFile] = useState(null);
  const [rolesFle2, setRolesFile2] = useState(null);

  const [rolesFle3, setRolesFile3] = useState(null);

  const [precaFile, setPrecaFile] = useState(null);
  const [precalification, setPrecalification] = useState(null);
  const [mecanizado, setMecanizado] = useState(null);
  const [mecanizadoS, setMecanizadoS] = useState(null);

  const [rucFiles, setRucFiles] = useState(null);
  const [ivaDeclarationFile, setIvaDeclarationFile] = useState(null);

  const [ivaDeclarationFile1, setIvaDeclarationFile1] = useState(null);
  const [ivaDeclarationFile2, setIvaDeclarationFile2] = useState(null);
  const [ivaDeclarationFile3, setIvaDeclarationFile3] = useState(null);
  const [ivaDeclarationFile4, setIvaDeclarationFile4] = useState(null);
  const [ivaDeclarationFile5, setIvaDeclarationFile5] = useState(null);
  const [ivaDeclarationFile6, setIvaDeclarationFile6] = useState(null);

  const [accounMovFile, setAccountMovFile] = useState(null);
  const [accounMovFile1, setAccountMovFile1] = useState(null);
  const [accounMovFile2, setAccountMovFile2] = useState(null);
  const [accounMovFile3, setAccountMovFile3] = useState(null);

  const [rentaDeclarationFile, setRentaDeclarationFile] = useState(null);

  const [dniFileS, setDniFileS] = useState(null);
  const [rolesFleS, setRolesFileS] = useState(null);
  const [rolesFle2S, setRolesFile2S] = useState(null);

  const [rolesFle3S, setRolesFile3S] = useState(null);

  const [precaFileS, setPrecaFileS] = useState(null);
  const [rucFilesS, setRucFilesS] = useState(null);
  const [ivaDeclarationFileS, setIvaDeclarationFileS] = useState(null);
  const [accounMovFileS, setAccountMovFileS] = useState(null);
  const [rentaDeclarationFileS, setRentaDeclarationFileS] = useState(null);

  const [ivaDeclarationFile1S, setIvaDeclarationFile1S] = useState(null);
  const [ivaDeclarationFile2S, setIvaDeclarationFile2S] = useState(null);
  const [ivaDeclarationFile3S, setIvaDeclarationFile3S] = useState(null);
  const [ivaDeclarationFile4S, setIvaDeclarationFile4S] = useState(null);
  const [ivaDeclarationFile5S, setIvaDeclarationFile5S] = useState(null);
  const [ivaDeclarationFile6S, setIvaDeclarationFile6S] = useState(null);

  const [accounMovFile1S, setAccountMovFile1S] = useState(null);
  const [accounMovFile2S, setAccountMovFile2S] = useState(null);
  const [accounMovFile3S, setAccountMovFile3S] = useState(null);


  //OTHER FILES
  const [rucFilesO, setRucFilesO] = useState(null);
  const [ivaDeclarationFileO, setIvaDeclarationFileO] = useState(null);
  const [ivaDeclarationFile2O, setIvaDeclarationFile2O] = useState(null);
  const [ivaDeclarationFile3O, setIvaDeclarationFile3O] = useState(null);
  const [ivaDeclarationFile4O, setIvaDeclarationFile4O] = useState(null);
  const [ivaDeclarationFile5O, setIvaDeclarationFile5O] = useState(null);
  const [ivaDeclarationFile6O, setIvaDeclarationFile6O] = useState(null);

  const [rentaDeclarationFileO, setRentaDeclarationFileO] = useState(null);
  const [accounMovFileO, setAccountMovFileO] = useState(null);
  const [accounMovFile2O, setAccountMovFile2O] = useState(null);
  const [accounMovFile3O, setAccountMovFile3O] = useState(null);
  
  //OTHER FILES
  const [rucFilesOS, setRucFilesOS] = useState(null);
  const [ivaDeclarationFileOS, setIvaDeclarationFileOS] = useState(null);
  const [ivaDeclarationFile2OS, setIvaDeclarationFile2OS] = useState(null);
  const [ivaDeclarationFile3OS, setIvaDeclarationFile3OS] = useState(null);
  const [ivaDeclarationFile4OS, setIvaDeclarationFile4OS] = useState(null);
  const [ivaDeclarationFile5OS, setIvaDeclarationFile5OS] = useState(null);
  const [ivaDeclarationFile6OS, setIvaDeclarationFile6OS] = useState(null);
  const [rentaDeclarationFileOS, setRentaDeclarationFileOS] = useState(null);
  const [accounMovFileOS, setAccountMovFileOS] = useState(null);
  const [accounMovFile2OS, setAccountMovFile2OS] = useState(null);
  const [accounMovFile3OS, setAccountMovFile3OS] = useState(null);

  const [hasDependence, setHasDependence] = React.useState({
    client:null,
    spouse:null,
    has_dependence: 1,
    has_dependence_spouse: null,
  });
  const [hasReward, setHasReward] = useState(true);

  const [files, setFiles] = useState([]);
  const [filesS, setFilesS] = useState([]);

  

  React.useEffect(() => {
    if (hasReward == null) {
      let url = new URL(window.location);
      let c = url.searchParams.get("client_id");

      let client_id = props.client_id != null ? props.client_id : c;
      props.changeStep("0", client_id);
    }
  }, [hasReward]);
  React.useEffect(() => {
    let url = new URL(window.location);
    let c = url.searchParams.get("client_id");

    let client_id = props.client_id != null ? props.client_id : c;

    if (client_id != null) {
      obtenerReward(client_id, setHasReward);
    }
  }, []);

  const comprobarExistencia = (fil) => {
    let existe = false;

    files.map((e) => {
      if (e == fil) {
        existe = true;
      }
    });
    return existe;
  };
  const comprobarExistenciaS = (fil) => {
    let existe = false;

    filesS.map((e) => {
      if (e == fil) {
        existe = true;
      }
    });
    return existe;
  };
  var url = new URL(window.location);
  var c = url.searchParams.get("client_id");

  var client_id = props.client_id != null ? props.client_id : c;
  React.useEffect(() => {
    let url = new URL(window.location);
    let c = url.searchParams.get("client_id");

    let client_id = props.client_id != null ? props.client_id : c;

    if (client_id != null) {
      tieneDependencia(client_id, setHasDependence);
      tieneArchivos(client_id, setFiles);
   
    }
  }, [props.client_id]);

   
  React.useEffect(() => {
    if (hasDependence.spouse != null) {
      tieneArchivosS(hasDependence.spouse.id, setFilesS);
    }
  }, [hasDependence]);
  const subirArchivos = () => {
    let url = new URL(window.location);
    let c = url.searchParams.get("client_id");
    let client_id = props.client_id != null ? props.client_id : c;

    upload(
      {
        monthly_iva:hasDependence.client!=null?hasDependence.client.iva_mensual:0,
           monthly_ivaO:hasDependence.client!=null?hasDependence.client.iva_mensual_otros_ingresos:0,
        client_id: client_id,
        dependencia: hasDependence.has_dependence == 1 ? 0 : 1,
        dni: null,
        dni_file: dniFile,
        roles_file: rolesFle,
        roles_file2: rolesFle2,
        roles_file3: rolesFle3,
        preca_file: precaFile,
        mecanizado: mecanizado,
        precalification_file: precalification,
        ruc_filesi: rucFiles,
        decla_filesi: ivaDeclarationFile,

        decla_filesi2: ivaDeclarationFile2,
        decla_filesi3: ivaDeclarationFile3,
        decla_filesi4: ivaDeclarationFile4,
        decla_filesi5: ivaDeclarationFile5,
        decla_filesi6: ivaDeclarationFile6,
        
        renta_filesi: rentaDeclarationFile,
        mov_filesi: accounMovFile1,
        mov_filesi2: accounMovFile2,
        mov_filesi3: accounMovFile3,

        ruc_filesiO: rucFilesO != null ? rucFilesO : null,
        decla_filesiO: ivaDeclarationFileO != null ? ivaDeclarationFileO : null,
        decla_filesi2O: ivaDeclarationFile2O!= null ? ivaDeclarationFile2O : null,
        decla_filesi3O: ivaDeclarationFile3O!= null ? ivaDeclarationFile3O : null,
        decla_filesi4O: ivaDeclarationFile4O!= null ? ivaDeclarationFile4O : null,
        decla_filesi5O: ivaDeclarationFile5O!= null ? ivaDeclarationFile5O : null,
        decla_filesi6O: ivaDeclarationFile6O!= null ? ivaDeclarationFile6O : null,
        renta_filesiO:
          rentaDeclarationFileO != null ? rentaDeclarationFileO : null,
          mov_filesiO1: accounMovFileO != null ? accounMovFileO : null,
          mov_filesiO2: accounMovFile2O != null ? accounMovFile2O : null,
          mov_filesiO3: accounMovFile3O != null ? accounMovFile3O : null,
      },
      initializer
    );
    initializer.mostrarNotificacion({
      type: "success",
      message: "Archivos subidos con éxito",
    });
    subirConyuge()
    vaciarCampos();
    props.changeStep("-2", client_id);
  };
  const subirConyuge = () => {
   
      uploadConyuge(
        {
          dependencia: hasDependence.has_dependence_spouse == 1 ? 0 : 1,
          monthly_iva:hasDependence.spouse!=null?hasDependence.spouse.monthly_iva:0,
          monthly_ivaO:hasDependence.spouse!=null?hasDependence.spouse.other_monthly_iva:0,
          spouse_id: hasDependence.spouse!=null?hasDependence.spouse.id:0,
          dni: null,
          dni_file: dniFileS,
          roles_file: rolesFleS,
          roles_file2: rolesFle2S,
          roles_file3: rolesFle3S,
          preca_file: precaFileS,
          mecanizado: mecanizadoS,
          ruc_filesi: rucFilesS,
          decla_filesi: ivaDeclarationFileS,

          decla_filesi2: ivaDeclarationFile2S,
          decla_filesi3: ivaDeclarationFile3S,
          decla_filesi4: ivaDeclarationFile4S,
          decla_filesi5: ivaDeclarationFile5S,
          decla_filesi6: ivaDeclarationFile6S,
          
          renta_filesi: rentaDeclarationFileS,
          mov_filesi: accounMovFile1S,
          mov_filesi2: accounMovFile2S,
          mov_filesi3: accounMovFile3S,

          ruc_filesiO: rucFilesOS != null ? rucFilesOS : null,
          decla_filesiO: ivaDeclarationFileOS != null ? ivaDeclarationFileOS : null,
          decla_filesi2O: ivaDeclarationFile2OS!= null ? ivaDeclarationFile2OS : null,
          decla_filesi3O: ivaDeclarationFile3OS!= null ? ivaDeclarationFile3OS : null,
          decla_filesi4O: ivaDeclarationFile4OS!= null ? ivaDeclarationFile4OS : null,
          decla_filesi5O: ivaDeclarationFile5OS!= null ? ivaDeclarationFile5OS : null,
          decla_filesi6O: ivaDeclarationFile6OS!= null ? ivaDeclarationFile6OS : null,
          renta_filesiO:
            rentaDeclarationFileOS != null ? rentaDeclarationFileOS : null,
            mov_filesiO1: accounMovFileOS != null ? accounMovFileOS : null,
            mov_filesiO2: accounMovFile2OS != null ? accounMovFile2OS : null,
            mov_filesiO3: accounMovFile3OS != null ? accounMovFile3OS : null,
        },
        initializer
      );
 
  };
  const vaciarCampos = () => {
    setDniFile(null);
    setRolesFile(null);
    setRolesFile2(null);
    setRolesFile3(null);
    setPrecaFile(null);
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
              backgroundColor: "#cbcbcb",
              borderRadius: "13px",
              height: "13px",
              width: "13px",
              cursor: "pointer",
            }}
            onClick={() => props.changeStep("2", client_id)}
          ></div>
          <div
            style={{
              backgroundColor: "#22428b",
              borderRadius: "13px",
              height: "13px",
              width: "13px",
              cursor: "pointer",
            }}
          ></div>
        </div>
        <p style={{ margin: "5px", color: "#214088" }}>PASO 3 DE 3</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <DescriptionOutlinedIcon
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
          Por favor adjunta los documentos requeridos
        </p>  
      </div>

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
        <p style={{padding:0,marginBottom:10}}>En formato pdf y máximo 2MB</p>
        {hasDependence.has_dependence == 1 ? (
          <div>
            <div>
              <p style={{ color: "#214088", marginBottom: "7px",marginTop:0 }}>Cédula</p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="templateFile"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setDniFile(e.target.files[0])}
                />
                <label htmlFor="templateFile">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {" "}
                      {dniFile != null ? (
                        "(" + dniFile.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("cedula") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>

              <p style={{ color: "#214088", marginBottom: "7px" }}>
                Buró de crédito
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="preca"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPrecaFile(e.target.files[0])}
                />
                <label htmlFor="preca">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {precaFile != null ? (
                        "(" + precaFile.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("precalificacionHipotecaria") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>

              <p style={{ color: "#214088", marginBottom: "7px" }}>
                Precalificación hipotecaria
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="precalification"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPrecalification(e.target.files[0])}
                />
                <label htmlFor="precalification">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {precalification != null ? (
                        "(" + precalification.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("precalification") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>
              <div style={{display:'none'}}>
              <p style={{ color: "#214088", marginBottom: "7px" }}>
                3 últimos roles de pago
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="rol1"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setRolesFile(e.target.files[0])}
                />
                <label htmlFor="rol1">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {rolesFle != null ? (
                        "(" + rolesFle.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("rolesPagoMecanizado1") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="rol2"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setRolesFile2(e.target.files[0])}
                />
                <label htmlFor="rol2">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {rolesFle2 != null ? (
                        "(" + rolesFle2.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("rolesPagoMecanizado2") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="rol3"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setRolesFile3(e.target.files[0])}
                />
                <label htmlFor="rol3">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {rolesFle3 != null ? (
                        "(" + rolesFle3.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("rolesPagoMecanizado3") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>
            

              </div>
              <p style={{ color: "#214088", marginBottom: "7px" }}>
                Mecanizado del IESS
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="mecanizado"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setMecanizado(e.target.files[0])}
                />
                <label htmlFor="mecanizado">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {mecanizado != null ? (
                        "(" + mecanizado.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("mecanizado") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>

            </div>
            {hasDependence.client != null ? (
              hasDependence.client.other_income != 0 &&
              hasDependence.client.other_income != null ? (
                <div>
                  <p style={{ color: "#214088", marginBottom: "7px" }}>
                    Otros ingresos
                  </p>

                  <p style={{ color: "#214088", marginBottom: "7px" }}>
                    Copia del RUC o RISE
                  </p>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="rucO"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setRucFilesO(e.target.files[0])}
                    />
                    <label htmlFor="rucO">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                        
{rucFilesO != null ? (
                        "(" + rucFilesO.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("rucRiceO") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}

                        </span>
                      </span>
                    </label>
                  </div>
                  <p style={{ color: "#214088", marginBottom: "7px" }}>
                    Declaración del IVA de los últimos 6 meses
                  </p>
              
                  {hasDependence.client != null ? (
              hasDependence.client.iva_mensual_otros_ingresos == null ? (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1O"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFileO(e.target.files[0])}
                    />
                    <label htmlFor="iva1O">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFileO != null ? (
                            "(" +
                            ivaDeclarationFileO.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIvaO") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              ) : hasDependence.client.iva_mensual_otros_ingresos == 0 ? (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1O"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFileO(e.target.files[0])}
                    />
                    <label htmlFor="iva1O">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFileO != null ? (
                            "(" +
                            ivaDeclarationFileO.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIvaO") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <div style={{width:'100%'}}>

                <div style={{ display: "flex",marginBottom:'5px' }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginRight:'5px'
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1O"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFileO(e.target.files[0])}
                    />
                    <label htmlFor="iva1O">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFileO != null ? (
                            "(" +
                            ivaDeclarationFileO.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva1O") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva2O"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile2O(e.target.files[0])}
                    />
                    <label htmlFor="iva2O">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile2O != null ? (
                            "(" +
                            ivaDeclarationFile2O.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva2O") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                <div style={{ display: "flex" ,marginBottom:'5px'}}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginRight:'5px'
                    }}
                  
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva3O"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile3O(e.target.files[0])}
                    />
                    <label htmlFor="iva3O">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile3O != null ? (
                            "(" +
                            ivaDeclarationFile3O.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva3O") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva4O"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile4O(e.target.files[0])}
                    />
                    <label htmlFor="iva4O">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile4O != null ? (
                            "(" +
                            ivaDeclarationFile4O.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva4O") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                <div style={{ display: "flex" ,marginBottom:'5px'}}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",  marginRight:'5px'
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva5O"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile5O(e.target.files[0])}
                    />
                    <label htmlFor="iva5O">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile5O != null ? (
                            "(" +
                            ivaDeclarationFile5O.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva5O") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva6O"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile6O(e.target.files[0])}
                    />
                    <label htmlFor="iva6O">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile6O != null ? (
                            "(" +
                            ivaDeclarationFile6O.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva6O") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                </div>
              )
            ) : null}

                  <p style={{ color: "#214088", marginBottom: "7px" }}>
                    Declaración del impuesto a la renta del último año
                  </p>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      type="file"
                      id="rentaO"
                      accept="application/pdf"
                        onChange={(e) => setRentaDeclarationFileO(e.target.files[0])}
                    />
                    <label htmlFor="rentaO">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                        

{rentaDeclarationFileO != null ? (
                        "(" + rentaDeclarationFileO.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("declaracionImpuestoRentaO") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                        </span>
                      </span>
                    </label>
                  </div>

                  <p style={{ color: "#214088", marginBottom: "7px" }}>
                    Movimientos de cuenta de los últimos 3 meses
                  </p>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="mvO"
                      type="file"
                      accept="application/pdf"
                       onChange={(e) => setAccountMovFileO(e.target.files[0])}
                    />
                    <label htmlFor="mvO">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                       

                        {accounMovFileO != null ? (
                        "(" + accounMovFileO.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("movimientosCuentaO1") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                        </span>
                      </span>
                    </label>
                  </div>

                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="mvO2"
                      type="file"
                      accept="application/pdf"
                       onChange={(e) => setAccountMovFile2O(e.target.files[0])}
                    />
                    <label htmlFor="mvO2">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                        

{accounMovFile2O != null ? (
                        "(" + accounMovFile2O.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("movimientosCuentaO2") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                        </span>
                      </span>
                    </label>
                  </div>

                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="mvO3"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setAccountMovFile3O(e.target.files[0])}
                    />
                    <label htmlFor="mvO3">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                        

{accounMovFile3O != null ? (
                        "(" + accounMovFile3O.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("movimientosCuentaO3") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              ) : null
            ) : null}
          </div>
        ) : (
          <div>
            <p style={{ color: "#214088", marginBottom: "7px" }}>Cédula</p>
            <div
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                padding: "6px",
                width: "100%",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none", marginRight: "5px" }}
                id="templateFile"
                type="file"
                accept="application/pdf"
                onChange={(e) => setDniFile(e.target.files[0])}
              />
              <label htmlFor="templateFile">
                <span
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PublishIcon
                    style={{
                      color: "rgb(33, 64, 136)",
                      fontSize: "20px",
                      marginRight: "5px",
                      marginBottom: "3px",
                    }}
                  />{" "}
                  <span style={{ color: "#959595" }}>
                    {" "}
                    {dniFile != null ? (
                      "(" + dniFile.name.substring(0, 4) + "..." + ")"
                    ) : comprobarExistencia("cedula") ? (
                      <span style={{ fontWeight: "bold" }}>Archivo subido</span>
                    ) : (
                      "Adjuntar archivo"
                    )}
                  </span>
                </span>
              </label>
            </div>

            <p style={{ color: "#214088", marginBottom: "7px" }}>
              Buró de crédito
            </p>
            <div
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                padding: "6px",
                width: "100%",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none", marginRight: "5px" }}
                id="preca"
                multiple
                type="file"
                accept="application/pdf"
                onChange={(e) => setPrecaFile(e.target.files[0])}
              />
              <label htmlFor="preca">
                <span
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PublishIcon
                    style={{
                      color: "rgb(33, 64, 136)",
                      fontSize: "20px",
                      marginRight: "5px",
                      marginBottom: "3px",
                    }}
                  />{" "}
                  <span style={{ color: "#959595" }}>
                    {precaFile != null ? (
                      "(" + precaFile.name.substring(0, 4) + "..." + ")"
                    ) : comprobarExistencia("precalificacionHipotecaria") ? (
                      <span style={{ fontWeight: "bold" }}>Archivo subido</span>
                    ) : (
                      "Adjuntar archivo"
                    )}
                  </span>
                </span>
              </label>
            </div>

            <p style={{ color: "#214088", marginBottom: "7px" }}>
              Precalificación hipotecaria
            </p>
            <div
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                padding: "6px",
                width: "100%",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none", marginRight: "5px" }}
                id="precalification"
                type="file"
                accept="application/pdf"
                onChange={(e) => setPrecalification(e.target.files[0])}
              />
              <label htmlFor="precalification">
                <span
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PublishIcon
                    style={{
                      color: "rgb(33, 64, 136)",
                      fontSize: "20px",
                      marginRight: "5px",
                      marginBottom: "3px",
                    }}
                  />{" "}
                  <span style={{ color: "#959595" }}>
                    {precalification != null ? (
                      "(" + precalification.name.substring(0, 4) + "..." + ")"
                    ) : comprobarExistencia("precalification") ? (
                      <span style={{ fontWeight: "bold" }}>Archivo subido</span>
                    ) : (
                      "Adjuntar archivo"
                    )}
                  </span>
                </span>
              </label>
            </div>

            <p style={{ color: "#214088", marginBottom: "7px" }}>
              Copia del RUC o RISE
            </p>
            <div
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                padding: "6px",
                width: "100%",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none", marginRight: "5px" }}
                id="ruc"
                multiple
                type="file"
                accept="application/pdf"
                onChange={(e) => setRucFiles(e.target.files[0])}
              />
              <label htmlFor="ruc">
                <span
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PublishIcon
                    style={{
                      color: "rgb(33, 64, 136)",
                      fontSize: "20px",
                      marginRight: "5px",
                      marginBottom: "3px",
                    }}
                  />{" "}
                  <span style={{ color: "#959595" }}>
                    {rucFiles != null ? (
                      "(" + rucFiles.name.substring(0, 4) + "..." + ")"
                    ) : comprobarExistencia("rucRice") ? (
                      <span style={{ fontWeight: "bold" }}>Archivo subido</span>
                    ) : (
                      "Adjuntar archivo"
                    )}
                  </span>
                </span>
              </label>
            </div>
            <p style={{ color: "#214088", marginBottom: "7px" }}>
              Declaración del IVA de los últimos 6 meses
            </p>
            {hasDependence.client != null ? (
              hasDependence.client.iva_mensual == null ? (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile(e.target.files[0])}
                    />
                    <label htmlFor="iva1">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile != null ? (
                            "(" +
                            ivaDeclarationFile.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              ) : hasDependence.client.iva_mensual == 0 ? (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile(e.target.files[0])}
                    />
                    <label htmlFor="iva1">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile != null ? (
                            "(" +
                            ivaDeclarationFile.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <div style={{width:'100%'}}>

                <div style={{ display: "flex",marginBottom:'5px' }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginRight:'5px'
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile(e.target.files[0])}
                    />
                    <label htmlFor="iva1">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile != null ? (
                            "(" +
                            ivaDeclarationFile.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva2"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile2(e.target.files[0])}
                    />
                    <label htmlFor="iva2">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile2 != null ? (
                            "(" +
                            ivaDeclarationFile2.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva2") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                <div style={{ display: "flex" ,marginBottom:'5px'}}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginRight:'5px'
                    }}
                  
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva3"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile3(e.target.files[0])}
                    />
                    <label htmlFor="iva3">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile3 != null ? (
                            "(" +
                            ivaDeclarationFile3.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva3") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva4"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile4(e.target.files[0])}
                    />
                    <label htmlFor="iva4">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile4 != null ? (
                            "(" +
                            ivaDeclarationFile4.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva4") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                <div style={{ display: "flex" ,marginBottom:'5px'}}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",  marginRight:'5px'
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva5"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile5(e.target.files[0])}
                    />
                    <label htmlFor="iva5">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile5 != null ? (
                            "(" +
                            ivaDeclarationFile5.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva5") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva6"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile6(e.target.files[0])}
                    />
                    <label htmlFor="iva6">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile6 != null ? (
                            "(" +
                            ivaDeclarationFile6.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva6") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                </div>
              )
            ) : null}

            <p style={{ color: "#214088", marginBottom: "7px" }}>
              Declaración del impuesto a la renta del último año
            </p>
            <div
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                padding: "6px",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none", marginRight: "5px" }}
                id="rent1"
                type="file"
                accept="application/pdf"
                onChange={(e) => setRentaDeclarationFile(e.target.files[0])}
              />
              <label htmlFor="rent1">
                <span
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PublishIcon
                    style={{
                      color: "rgb(33, 64, 136)",
                      fontSize: "20px",
                      marginRight: "5px",
                      marginBottom: "3px",
                    }}
                  />{" "}
                  <span style={{ color: "#959595" }}>
                    {rentaDeclarationFile != null ? (
                      "(" +
                      rentaDeclarationFile.name.substring(0, 4) +
                      "..." +
                      ")"
                    ) : comprobarExistencia("declaracionImpuestoRenta") ? (
                      <span style={{ fontWeight: "bold" }}>Archivo subido</span>
                    ) : (
                      "Adjuntar archivo"
                    )}
                  </span>
                </span>
              </label>
            </div>

            <p style={{ color: "#214088", marginBottom: "7px" }}>
              Movimientos de cuenta de los últimos 3 meses
            </p>
            <div
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                padding: "6px",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none", marginRight: "5px" }}
                id="mov1"
                multiple
                type="file"
                accept="application/pdf"
                onChange={(e) => setAccountMovFile1(e.target.files[0])}
              />
              <label htmlFor="mov1">
                <span
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PublishIcon
                    style={{
                      color: "rgb(33, 64, 136)",
                      fontSize: "20px",
                      marginRight: "5px",
                      marginBottom: "3px",
                    }}
                  />{" "}
                  <span style={{ color: "#959595" }}>
                    {accounMovFile1 != null ? (
                      "(" + accounMovFile1.name.substring(0, 4) + "..." + ")"
                    ) : comprobarExistencia("movimientosCuenta1") ? (
                      <span style={{ fontWeight: "bold" }}>Archivo subido</span>
                    ) : (
                      "Adjuntar archivo"
                    )}
                  </span>
                </span>
              </label>
            </div>

            <div
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                padding: "6px",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none", marginRight: "5px" }}
                id="mov2"
                multiple
                type="file"
                accept="application/pdf"
                onChange={(e) => setAccountMovFile2(e.target.files[0])}
              />
              <label htmlFor="mov2">
                <span
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PublishIcon
                    style={{
                      color: "rgb(33, 64, 136)",
                      fontSize: "20px",
                      marginRight: "5px",
                      marginBottom: "3px",
                    }}
                  />{" "}
                  <span style={{ color: "#959595" }}>
                    {accounMovFile2 != null ? (
                      "(" + accounMovFile2.name.substring(0, 4) + "..." + ")"
                    ) : comprobarExistencia("movimientosCuenta2") ? (
                      <span style={{ fontWeight: "bold" }}>Archivo subido</span>
                    ) : (
                      "Adjuntar archivo"
                    )}
                  </span>
                </span>
              </label>
            </div>

            <div
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                padding: "6px",
                width: "100%",
                marginTop: "10px",
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none", marginRight: "5px" }}
                id="mov3"
                multiple
                type="file"
                accept="application/pdf"
                onChange={(e) => setAccountMovFile3(e.target.files[0])}
              />
              <label htmlFor="mov3">
                <span
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PublishIcon
                    style={{
                      color: "rgb(33, 64, 136)",
                      fontSize: "20px",
                      marginRight: "5px",
                      marginBottom: "3px",
                    }}
                  />{" "}
                  <span style={{ color: "#959595" }}>
                    {accounMovFile3 != null ? (
                      "(" + accounMovFile3.name.substring(0, 4) + "..." + ")"
                    ) : comprobarExistencia("movimientosCuenta3") ? (
                      <span style={{ fontWeight: "bold" }}>Archivo subido</span>
                    ) : (
                      "Adjuntar archivo"
                    )}
                  </span>
                </span>
              </label>
            </div>
          </div>
        )}

        {hasDependence.has_dependence_spouse != null ? (
          hasDependence.has_dependence_spouse == 1 ? (
            <div>
              <p style={{ color: "#214088", marginBottom: "7px" }}>Cónyuge</p>
              <p style={{ color: "#214088", marginBottom: "7px" }}>Cédula</p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="templateFileS"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setDniFileS(e.target.files[0])}
                />
                <label htmlFor="templateFileS">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {" "}
                      {dniFileS != null ? (
                        "(" + dniFileS.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistenciaS("cedulaS") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>

              <p style={{ color: "#214088", marginBottom: "7px" }}>
                Buró de crédito
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="precaS"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPrecaFileS(e.target.files[0])}
                />
                <label htmlFor="precaS">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {precaFileS != null ? (
                        "(" + precaFileS.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistenciaS("precalificacionHipotecariaS") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>
              <div style={{display:'none'}}>
              <p style={{ color: "#214088", marginBottom: "7px" }}>
                3 últimos roles de pago
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="rol1S"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setRolesFileS(e.target.files[0])}
                />
                <label htmlFor="rol1S">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {rolesFleS != null ? (
                        "(" + rolesFleS.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("rolesPagoMecanizado1S") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="rol2S"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setRolesFile2S(e.target.files[0])}
                />
                <label htmlFor="rol2S">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {rolesFle2S != null ? (
                        "(" + rolesFle2S.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("rolesPagoMecanizado2S") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="rol3S"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setRolesFile3S(e.target.files[0])}
                />
                <label htmlFor="rol3S">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {rolesFle3S != null ? (
                        "(" + rolesFle3S.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistencia("rolesPagoMecanizado3S") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>
              </div>
              <p style={{ color: "#214088", marginBottom: "7px" }}>
                Mecanizado del IESS
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="mecanizadoS"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setMecanizadoS(e.target.files[0])}
                />
                <label htmlFor="mecanizadoS">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {mecanizadoS != null ? (
                        "(" + mecanizadoS.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistenciaS("mecanizadoS") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>

              {hasDependence.spouse != null ? (
                hasDependence.spouse.other_income != 0 &&
                hasDependence.spouse.other_income != null ? (
                  <div>
                    <p style={{ color: "#214088", marginBottom: "7px" }}>
                      Otros ingresos
                    </p>

                    <p style={{ color: "#214088", marginBottom: "7px" }}>
                      Copia del RUC o RISE
                    </p>
                    <div
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        padding: "6px",
                        width: "100%",
                      }}
                    >
                      <input
                        accept="image/*"
                        style={{ display: "none", marginRight: "5px" }}
                        id="rucOS"
                        type="file"
                        accept="application/pdf"
                      onChange={(e) => setRucFilesOS(e.target.files[0])}
                      />
                      <label htmlFor="rucOS">
                        <span
                          variant="contained"
                          color="primary"
                          component="span"
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <PublishIcon
                            style={{
                              color: "rgb(33, 64, 136)",
                              fontSize: "20px",
                              marginRight: "5px",
                              marginBottom: "3px",
                            }}
                          />{" "}
                          <span style={{ color: "#959595" }}>
                          {rucFilesOS != null ? (
                        "(" + rucFilesOS.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistenciaS("rucRiceOS") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                          </span>
                        </span>
                      </label>
                    </div>
                    <p style={{ color: "#214088", marginBottom: "7px" }}>
                      Declaración del IVA de los últimos 6 meses
                    </p>
                    {hasDependence.spouse != null ? (
              hasDependence.spouse.other_monthly_iva == null ? (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1OS"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFileOS(e.target.files[0])}
                    />
                    <label htmlFor="iva1OS">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFileOS != null ? (
                            "(" +
                            ivaDeclarationFileOS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIvaOS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              ) : hasDependence.spouse.other_monthly_iva == 0 ? (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1OS"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFileOS(e.target.files[0])}
                    />
                    <label htmlFor="iva1OS">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFileOS != null ? (
                            "(" +
                            ivaDeclarationFileOS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIvaOS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <div style={{width:'100%'}}>

                <div style={{ display: "flex",marginBottom:'5px' }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginRight:'5px'
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1OS"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFileOS(e.target.files[0])}
                    />
                    <label htmlFor="iva1OS">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFileOS != null ? (
                            "(" +
                            ivaDeclarationFileOS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIvaOS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva2OS"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile2OS(e.target.files[0])}
                    />
                    <label htmlFor="iva2OS">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile2OS != null ? (
                            "(" +
                            ivaDeclarationFile2OS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIva2OS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                <div style={{ display: "flex" ,marginBottom:'5px'}}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginRight:'5px'
                    }}
                  
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva3OS"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile3OS(e.target.files[0])}
                    />
                    <label htmlFor="iva3OS">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile3OS != null ? (
                            "(" +
                            ivaDeclarationFile3OS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIva3OS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva4OS"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile4OS(e.target.files[0])}
                    />
                    <label htmlFor="iva4OS">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile4OS != null ? (
                            "(" +
                            ivaDeclarationFile4OS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIva4OS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                <div style={{ display: "flex" ,marginBottom:'5px'}}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",  marginRight:'5px'
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva5OS"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile5OS(e.target.files[0])}
                    />
                    <label htmlFor="iva5OS">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile5OS != null ? (
                            "(" +
                            ivaDeclarationFile5OS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIva5OS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva6OS"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile6OS(e.target.files[0])}
                    />
                    <label htmlFor="iva6OS">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile6OS != null ? (
                            "(" +
                            ivaDeclarationFile6OS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIva6OS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                </div>
              )
            ) : null}

                    <p style={{ color: "#214088", marginBottom: "7px" }}>
                      Declaración del impuesto a la renta del último año
                    </p>
                    <div
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        padding: "6px",
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      <input
                        accept="image/*"
                        style={{ display: "none", marginRight: "5px" }}
                        type="file"
                        id="rentOS"
                        accept="application/pdf"
                           onChange={(e) => setRentaDeclarationFileOS(e.target.files[0])}
                      />
                      <label htmlFor="rentOS">
                        <span
                          variant="contained"
                          color="primary"
                          component="span"
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <PublishIcon
                            style={{
                              color: "rgb(33, 64, 136)",
                              fontSize: "20px",
                              marginRight: "5px",
                              marginBottom: "3px",
                            }}
                          />{" "}
                          <span style={{ color: "#959595" }}>
                          {rentaDeclarationFileOS != null ? (
                            "(" +
                            rentaDeclarationFileOS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionImpuestoRentaOS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                          </span>
                        </span>
                      </label>
                    </div>

                    <p style={{ color: "#214088", marginBottom: "7px" }}>
                      Movimientos de cuenta de los últimos 3 meses
                    </p>
                    <div
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        padding: "6px",
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      <input
                        accept="image/*"
                        style={{ display: "none", marginRight: "5px" }}
                        id="mov1OS"
                        type="file"
                        accept="application/pdf"
                       onChange={(e) => setAccountMovFileOS(e.target.files[0])}
                      />
                      <label htmlFor="mov1OS">
                        <span
                          variant="contained"
                          color="primary"
                          component="span"
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <PublishIcon
                            style={{
                              color: "rgb(33, 64, 136)",
                              fontSize: "20px",
                              marginRight: "5px",
                              marginBottom: "3px",
                            }}
                          />{" "}
                          <span style={{ color: "#959595" }}>
                          {accounMovFileOS != null ? (
                            "(" +
                            accounMovFileOS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("movimientosCuentaOS1") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                          </span>
                        </span>
                      </label>
                    </div>

                    <div
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        padding: "6px",
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      <input
                        accept="image/*"
                        style={{ display: "none", marginRight: "5px" }}
                        id="mov2OS"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setAccountMovFile2OS(e.target.files[0])}
                      />
                      <label htmlFor="mov2OS">
                        <span
                          variant="contained"
                          color="primary"
                          component="span"
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <PublishIcon
                            style={{
                              color: "rgb(33, 64, 136)",
                              fontSize: "20px",
                              marginRight: "5px",
                              marginBottom: "3px",
                            }}
                          />{" "}
                          <span style={{ color: "#959595" }}>
                          {accounMovFile2OS != null ? (
                            "(" +
                            accounMovFile2OS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("movimientosCuentaOS2") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                          </span>
                        </span>
                      </label>
                    </div>

                    <div
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        padding: "6px",
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      <input
                        accept="image/*"
                        style={{ display: "none", marginRight: "5px" }}
                        id="mov3OS"
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setAccountMovFile3OS(e.target.files[0])}
                      />
                      <label htmlFor="mov3OS">
                        <span
                          variant="contained"
                          color="primary"
                          component="span"
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <PublishIcon
                            style={{
                              color: "rgb(33, 64, 136)",
                              fontSize: "20px",
                              marginRight: "5px",
                              marginBottom: "3px",
                            }}
                          />{" "}
                          <span style={{ color: "#959595" }}>
                          {accounMovFile3OS != null ? (
                            "(" +
                            accounMovFile3OS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("movimientosCuentaOS3") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                ) : null
              ) : null}
            </div>
          ) : (
            <div>
              <p style={{ color: "#214088", marginBottom: "7px" }}>Cónyuge</p>
              <p style={{ color: "#214088", marginBottom: "7px" }}>Cédula</p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="templateFileS"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setDniFileS(e.target.files[0])}
                />
                <label htmlFor="templateFileS">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {" "}
                      {dniFileS != null ? (
                        "(" + dniFileS.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistenciaS("cedulaS") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>

              <p style={{ color: "#214088", marginBottom: "7px" }}>
                Buró de crédito
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="precaS"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPrecaFileS(e.target.files[0])}
                />
                <label htmlFor="precaS">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {precaFileS != null ? (
                        "(" + precaFileS.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistenciaS("precalificacionHipotecariaS") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>

              <p style={{ color: "#214088", marginBottom: "7px" }}>
                Copia del RUC o RISE
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="rucS"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setRucFilesS(e.target.files[0])}
                />
                <label htmlFor="rucS">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {rucFilesS != null ? (
                        "(" + rucFilesS.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistenciaS("rucRiceS") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>
              <p style={{ color: "#214088", marginBottom: "7px" }}>
                Declaración del IVA de los últimos 6 meses
              </p>
              {hasDependence.spouse != null ? (
              hasDependence.spouse.monthly_iva == null ? (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1S"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFileS(e.target.files[0])}
                    />
                    <label htmlFor="iva1S">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFileS != null ? (
                            "(" +
                            ivaDeclarationFileS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIvaS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              ) : hasDependence.spouse.monthly_iva == 0 ? (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1S"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFileS(e.target.files[0])}
                    />
                    <label htmlFor="iva1S">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFileS != null ? (
                            "(" +
                            ivaDeclarationFileS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIvaS") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <div style={{width:'100%'}}>

                <div style={{ display: "flex",marginBottom:'5px' }}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginRight:'5px'
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva1S"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFileS(e.target.files[0])}
                    />
                    <label htmlFor="iva1S">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFileS != null ? (
                            "(" +
                            ivaDeclarationFileS.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistenciaS("declaracionIva1S") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva2S"
                      multiple
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile2S(e.target.files[0])}
                    />
                    <label htmlFor="iva2S">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile2S != null ? (
                            "(" +
                            ivaDeclarationFile2S.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva2S") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                <div style={{ display: "flex" ,marginBottom:'5px'}}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                      marginRight:'5px'
                    }}
                  
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva3S"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile3S(e.target.files[0])}
                    />
                    <label htmlFor="iva3S">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile3S != null ? (
                            "(" +
                            ivaDeclarationFile3S.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva3S") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva4S"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile4S(e.target.files[0])}
                    />
                    <label htmlFor="iva4S">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile4S != null ? (
                            "(" +
                            ivaDeclarationFile4S.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva4S") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                <div style={{ display: "flex" ,marginBottom:'5px'}}>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",  marginRight:'5px'
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva5S"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile5S(e.target.files[0])}
                    />
                    <label htmlFor="iva5S">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile5S != null ? (
                            "(" +
                            ivaDeclarationFile5S.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva5S") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                  <div
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      padding: "6px",
                      width: "100%",
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none", marginRight: "5px" }}
                      id="iva6S"
                      
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setIvaDeclarationFile6S(e.target.files[0])}
                    />
                    <label htmlFor="iva6S">
                      <span
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <PublishIcon
                          style={{
                            color: "rgb(33, 64, 136)",
                            fontSize: "20px",
                            marginRight: "5px",
                            marginBottom: "3px",
                          }}
                        />{" "}
                        <span style={{ color: "#959595" }}>
                          {ivaDeclarationFile6S != null ? (
                            "(" +
                            ivaDeclarationFile6S.name.substring(0, 4) +
                            "..." +
                            ")"
                          ) : comprobarExistencia("declaracionIva6S") ? (
                            <span style={{ fontWeight: "bold" }}>
                              Archivo subido
                            </span>
                          ) : (
                            "Adjuntar archivo"
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
             
                </div>
                </div>
              )
            ) : null}
          

              <p style={{ color: "#214088", marginBottom: "7px" }}>
                Declaración del impuesto a la renta del último año
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="rent1S"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setRentaDeclarationFileS(e.target.files[0])}
                />
                <label htmlFor="rent1S">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {rentaDeclarationFileS != null ? (
                        "(" +
                        rentaDeclarationFileS.name.substring(0, 4) +
                        "..." +
                        ")"
                      ) : comprobarExistenciaS("declaracionImpuestoRentaS") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>

              <p style={{ color: "#214088", marginBottom: "7px" }}>
                Movimientos de cuenta de los últimos 3 meses
              </p>
              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="mov1S"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setAccountMovFile1S(e.target.files[0])}
                />
                <label htmlFor="mov1S">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {accounMovFile1S != null ? (
                        "(" + accounMovFile1S.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistenciaS("movimientosCuenta1S") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>

              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="mov2S"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setAccountMovFile2S(e.target.files[0])}
                />
                <label htmlFor="mov2S">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {accounMovFile2S != null ? (
                        "(" + accounMovFile2S.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistenciaS("movimientosCuenta2S") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>

              <div
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  padding: "6px",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none", marginRight: "5px" }}
                  id="mov3S"
                  multiple
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setAccountMovFile3S(e.target.files[0])}
                />
                <label htmlFor="mov3S">
                  <span
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PublishIcon
                      style={{
                        color: "rgb(33, 64, 136)",
                        fontSize: "20px",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />{" "}
                    <span style={{ color: "#959595" }}>
                      {accounMovFile3S != null ? (
                        "(" + accounMovFile3S.name.substring(0, 4) + "..." + ")"
                      ) : comprobarExistenciaS("movimientosCuenta3S") ? (
                        <span style={{ fontWeight: "bold" }}>
                          Archivo subido
                        </span>
                      ) : (
                        "Adjuntar archivo"
                      )}
                    </span>
                  </span>
                </label>
              </div>
            </div>
          )
        ) : null}
        <p style={{ textAlign: "center", fontSize: "12px", lineHeight: "1.2" }}>
          Esta información es confidencial y será utilizada por Ambiensa
          exclusivamente para los fines de adquisición de su casa. Al enviar
          este formulario está aceptando los{" "}
          <a href="">Terminos y condiciones</a>
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
          onClick={subirArchivos}
        >
          ENVIAR DOCUMENTOS
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
                backgroundColor: "#cbcbcb",
                borderRadius: "13px",
                height: "13px",
                width: "13px",
                cursor: "pointer",
              }}
              onClick={() => props.changeStep("2", client_id)}
            ></div>
            <div
              style={{
                backgroundColor: "#22428b",
                borderRadius: "13px",
                height: "13px",
                width: "13px",
              }}
            ></div>
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          ¿No tienes listos estos documentos?
          <a
            onClick={() => {
              initializer.mostrarNotificacion({
                type: "success",
                message:
                  "Te hemos enviado un correo electrónico para que cuando tengas tu documentación lista la puedas subir directamente presionando continuar.",
              });
              const timer = setTimeout(
                () => (window.location.href = "https://www.ambiensa.com/"),
                3000
              );
            }}
          >
            {" "}
            Presiona aquí
          </a>
        </p>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <img
            src={logoAmbiensa}
            alt=""
   
            style={{
              borderRightWidth: "1px",
              borderRightStyle: "solid",
              borderTopColor: "#ccc",
              objectFit: "cover",
              width: '25%',
    height: '34px'
            }}
          />

          <img
            src={logoPaseo}
            alt=""
       
            style={{
              objectFit: "cover",
              width: "35%",
              paddingBottom: "4px",
              height: "49px",
            }}
          />
          <img
            src={logoGeranio}
            alt=""
   
            style={{
              objectFit: "cover",
              width: "27%",
              height: "29px",
              marginTop: "5px",
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
