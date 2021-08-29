import React, { useState, useEffect, useContext } from "react";
import datos from "../../assets/datos.JPG";
import PublishIcon from "@material-ui/icons/Publish";
import Box from "@material-ui/core/Box";
import Initializer from "../../store/Initializer";
import {
    editarCliente,
    uploadFiles,
    registrarCliente,
    tieneArchivos, tieneArchivosS,
    upload,
    obtenerDataCliente,
    crearCodigo,
    tieneDependencia, uploadConyuge,
    editarIngresos,
    obtenerReward,
} from "../../utils/API/clientes";
import Skeleton from '@material-ui/lab/Skeleton';
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import "./style/Main.css";

import ModalVerificarCorreo from "./Components/ModalVerificarCorreo";
import { InsertCommentSharp } from "@material-ui/icons";
import logoAmbiensa from "../../assets/LogoAmbiensa.png";
import logoPaseo from "../../assets/Paseo-Sol-Horizontal.png";
import logoGeranio from "../../assets/Villa-Geranio-Horizontal.png";
import { obtenerDocumentosFormulario } from "../../utils/API/sgi";
export default function Paso3(props) {
    const initializer = useContext(Initializer);
    const [documents, setDocuments] = useState([])
    const [documentsS, setDocumentsS] = useState([])

    const [filesSelected, setFilesSelected] = useState([])
    const [filesSelectedS, setFilesSelectedS] = useState([])

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
        client: null,
        spouse: null,
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
            obtenerDocumentosFormulario({ tipo_iva: hasDependence.spouse.iva_mensual == 1 ? 'M' : 'S', id_labor: hasDependence.spouse.dependencia == 1 ? 1 : 2, id_estado_civil: hasDependence.client.id_estado_civil }, setDocumentsS)
        }
        if (hasDependence.client != null) {
            obtenerDocumentosFormulario({ tipo_iva:hasDependence.client.iva_mensual == 1 ? 'M' : 'S', id_labor: hasDependence.client.dependencia == 1 ? 1 : 2, id_estado_civil: hasDependence.client.id_estado_civil  }, setDocuments)
        


        }
    }, [hasDependence]);
    const retornoDocumentosPorId=(val,tipo)=>{
        let fil = null
        if(tipo=="cli"){
            filesSelected.map((e)=>{
                if(val==e.id){
                    fil=e.file
                }
            })
        }else{
            filesSelectedS.map((e)=>{
                if(val==e.id){
                    fil=e.file
                }
            })
        }
        
        return fil
    }
    const retornoOtrosArchivos=(tipo)=>{
        let fil = null
        let ar=[1,3,2,4,9,50,51,52,53,54,55,6,7,80,81,82]
        let ret = []
        if(tipo=="cli"){
            filesSelected.map((e)=>{
       
                if(ar.includes(parseInt(e.id))==false){
                    let tn =e.nombre.split(' ');
                    let tf = tn.join(",");
                   ret.push({nombre:tf,id:parseInt(e.id),file:e.file});
                }
            })
        }else{
            filesSelectedS.map((e)=>{
                if(ar.includes(parseInt(e.id))==false){
                    let tn =e.nombre.split(' ');
                    let tf = tn.join(",");
                    ret.push({nombre:tf,id:parseInt(e.id),file:e.file});
                }
            })
        }
        
        return ret
    }
    const subirArchivos = () => {
        let url = new URL(window.location);
        let c = url.searchParams.get("client_id");
        let client_id = props.client_id != null ? props.client_id : c;

        upload(
            {
                monthly_iva: hasDependence.client != null ? hasDependence.client.iva_mensual : 0,
                monthly_ivaO: hasDependence.client != null ? hasDependence.client.iva_mensual_otros_ingresos : 0,
                client_id: client_id,
                dependencia: hasDependence.has_dependence == 1 ? 0 : 1,
                dni: null,
                dni_file: retornoDocumentosPorId(1,"cli"),
                roles_file: rolesFle,
                roles_file2: rolesFle2,
                roles_file3: rolesFle3,
                preca_file: retornoDocumentosPorId(3,"cli"),
                mecanizado: retornoDocumentosPorId(2,"cli"),
                precalification_file: retornoDocumentosPorId(4,"cli"),
                ruc_filesi:  retornoDocumentosPorId(9,"cli"),
                decla_filesi: hasDependence.client.iva_mensual==1?retornoDocumentosPorId(50,"cli"):retornoDocumentosPorId(6,"cli"),

                decla_filesi2: retornoDocumentosPorId(51,"cli"),
                decla_filesi3: retornoDocumentosPorId(52,"cli"),
                decla_filesi4: retornoDocumentosPorId(53,"cli"),
                decla_filesi5: retornoDocumentosPorId(54,"cli"),
                decla_filesi6: retornoDocumentosPorId(55,"cli"),

                renta_filesi:retornoDocumentosPorId(7,"cli"),
                mov_filesi: retornoDocumentosPorId(80,"cli"),
                mov_filesi2: retornoDocumentosPorId(81,"cli"),
                mov_filesi3: retornoDocumentosPorId(82,"cli"),
                other_files:retornoOtrosArchivos('cli'),
                ruc_filesiO: rucFilesO != null ? rucFilesO : null,
                decla_filesiO: ivaDeclarationFileO != null ? ivaDeclarationFileO : null,
                decla_filesi2O: ivaDeclarationFile2O != null ? ivaDeclarationFile2O : null,
                decla_filesi3O: ivaDeclarationFile3O != null ? ivaDeclarationFile3O : null,
                decla_filesi4O: ivaDeclarationFile4O != null ? ivaDeclarationFile4O : null,
                decla_filesi5O: ivaDeclarationFile5O != null ? ivaDeclarationFile5O : null,
                decla_filesi6O: ivaDeclarationFile6O != null ? ivaDeclarationFile6O : null,
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
        if(documentsS.length != 0){
            subirConyuge()
        }
        
        vaciarCampos();
        props.changeStep("-2", client_id);
    };
    const subirConyuge = () => {

        uploadConyuge(
            {
                dependencia: hasDependence.has_dependence_spouse == 1 ? 0 : 1,
                monthly_iva: hasDependence.spouse != null ? hasDependence.spouse.iva_mensual : 0,
                monthly_ivaO: hasDependence.spouse != null ? hasDependence.spouse.iva_mensual_otros_ingresos : 0,
                spouse_id: hasDependence.spouse != null ? hasDependence.spouse.id : 0,
                dni: null,
                dni_file: retornoDocumentosPorId(1,"con"),
                roles_file: rolesFleS,
                roles_file2: rolesFle2S,
                roles_file3: rolesFle3S,
                preca_file: retornoDocumentosPorId(3,"con"),
                mecanizado: retornoDocumentosPorId(2,"con"),
                ruc_filesi:  retornoDocumentosPorId(9,"con"),
                decla_filesi: hasDependence.spouse.iva_mensual==1?retornoDocumentosPorId(50,"con"):retornoDocumentosPorId(6,"con"),

                decla_filesi2: retornoDocumentosPorId(51,"con"),
                decla_filesi3: retornoDocumentosPorId(52,"con"),
                decla_filesi4: retornoDocumentosPorId(53,"con"),
                decla_filesi5: retornoDocumentosPorId(54,"con"),
                decla_filesi6: retornoDocumentosPorId(55,"con"),

                renta_filesi:retornoDocumentosPorId(7,"con"),
                mov_filesi: retornoDocumentosPorId(80,"con"),
                mov_filesi2: retornoDocumentosPorId(81,"con"),
                mov_filesi3: retornoDocumentosPorId(82,"con"),
                other_files:retornoOtrosArchivos('con'),
                ruc_filesiO: rucFilesOS != null ? rucFilesOS : null,
                decla_filesiO: ivaDeclarationFileOS != null ? ivaDeclarationFileOS : null,
                decla_filesi2O: ivaDeclarationFile2OS != null ? ivaDeclarationFile2OS : null,
                decla_filesi3O: ivaDeclarationFile3OS != null ? ivaDeclarationFile3OS : null,
                decla_filesi4O: ivaDeclarationFile4OS != null ? ivaDeclarationFile4OS : null,
                decla_filesi5O: ivaDeclarationFile5OS != null ? ivaDeclarationFile5OS : null,
                decla_filesi6O: ivaDeclarationFile6OS != null ? ivaDeclarationFile6OS : null,
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
    function esImpar(numero) {
        if (numero % 2 == 0) {
            return false;
        }
        else {
            return true;
        }
    }
  
    const obtenerNombre = (val) => {
        let nombre = ""
        filesSelected.map((e) => {
           
            if (val == e.name) {
                nombre = e.file.name
            }
        })
        return nombre
    }
    const obtenerNombreS = (val) => {
        let nombre = ""
        filesSelectedS.map((e) => {
          
            if (val == e.name) {
                nombre = e.file.name
            }
        })
        return nombre
    }

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
                <p style={{ padding: 0, marginBottom: 10 }}>En formato pdf y máximo 2MB</p>
                <div>
                    {
                        documents.length != 0 ?
                            documents.map((e) => (

                                e.numero_archivos == 1||e.numero_archivos==null ||e.numero_archivos==undefined ?
                                    <div style={{ marginBottom: 10 }} >
                                        <p style={{ color: "#214088", marginBottom: "7px", marginTop: 0 }}>{e.nombre}</p>
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
                                                id={"cli" + e.nombre}
                                                multiple
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(a) => {
                                                    let temp = filesSelected.slice()
                                                    temp.push({nombre:e.nombre, id:e.id_tipo_documento!=5&&e.id_tipo_documento!=8?e.id_tipo_documento:e.id_tipo_documento+""+0,name: "cli" + e.id_tipo_documento + e.nombre, file: a.target.files[0] })
                                                    setFilesSelected(temp)
                                                }}
                                            />
                                            <label htmlFor={"cli" + e.nombre}>
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
                                                        {obtenerNombre("cli" + e.id_tipo_documento + e.nombre) != "" ? (
                                                            "(" + obtenerNombre("cli" + e.id_tipo_documento + e.nombre).substring(0, 4) + "..." + ")"
                                                        ) : "Adjuntar archivo"}
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    :
                                    <div style={{ marginBottom: 10 }} >
                                        <p style={{ color: "#214088", marginBottom: "7px", marginTop: 0 }}>{e.nombre}</p>
                                        <div style={{
                                            display: "flex", flexWrap: 'wrap', justifyContent: 'space-between',
                                            gap: 5
                                        }}>
                                            {
                                                Array(e.numero_archivos).fill(1).map((u, i) => (
                                                    <div
                                                        style={{
                                                            borderWidth: "1px",
                                                            borderStyle: "solid",
                                                            padding: "6px",
                                                            width: esImpar(e.numero_archivos) && i == (e.numero_archivos - 1) ? '100%' : 147,
                                                            marginBottom: 2
                                                        }}

                                                    >
                                                        <input
                                                            accept="image/*"
                                                            style={{ display: "none", marginRight: "5px" }}
                                                            id={"cli" + e.nombre + i}
                                                            multiple
                                                            type="file"
                                                            accept="application/pdf"
                                                            onChange={(a) => {
                                                                let temp = filesSelected.slice()
                                                                temp.push({nombre:e.nombre,id:e.id_tipo_documento!=5&&e.id_tipo_documento!=8?e.id_tipo_documento:e.id_tipo_documento+""+i, name: "cli" + i + "" + e.id_tipo_documento + e.nombre, file: a.target.files[0] })
                                                                setFilesSelected(temp)
                                                            }}
                                                        />
                                                        <label htmlFor={"cli" + e.nombre + i}>
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
                                                                    {obtenerNombre("cli" + i + "" + e.id_tipo_documento + e.nombre) != "" ? (
                                                                        "(" + obtenerNombre("cli" + i + "" + e.id_tipo_documento + e.nombre).substring(0, 4) + "..." + ")"
                                                                    ) : "Adjuntar archivo"}
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                            )
                            )
                            :
                            Array(4).fill(1).map((e) => (
                                <div style={{ marginBottom: 10 }} >
                                    <Skeleton animation="wave" width="60%" height={27} />
                                    <Skeleton animation="wave" height={36} />
                                </div>
                            ))

                    }
                </div>

                <div>
                    {
                        documentsS.length != 0 ?
                            <React.Fragment>
                                <p style={{ color: "#214088", marginBottom: "7px" }}>Cónyuge</p>
                                {
                                    documentsS.map((e) => (

                                        e.numero_archivos == 1||e.numero_archivos==null ||e.numero_archivos==undefined?
                                            <div style={{ marginBottom: 10 }} >
                                                <p style={{ color: "#214088", marginBottom: "7px", marginTop: 0 }}>{e.nombre}</p>
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
                                                        id={"con" + e.nombre}
                                                        type="file"
                                                        accept="application/pdf"
                                                        onChange={(a) => {

                                                            let temp = filesSelectedS.slice()
                                                            temp.push({ nombre:e.nombre,id:e.id_tipo_documento!=5&&e.id_tipo_documento!=8?e.id_tipo_documento:e.id_tipo_documento+""+0,name: "con" + e.id_tipo_documento + e.nombre, file: a.target.files[0] })
                                                            setFilesSelectedS(temp)
                                                        }}
                                                    />
                                                    <label htmlFor={"con" + e.nombre}>
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
                                                                {obtenerNombreS("con" + e.id_tipo_documento + e.nombre) != "" ? (
                                                                    "(" + obtenerNombreS("con" + e.id_tipo_documento + e.nombre).substring(0, 4) + "..." + ")"
                                                                ) : "Adjuntar archivo"}
                                                            </span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>

                                            :
                                            <div style={{ marginBottom: 10 }} >
                                                <p style={{ color: "#214088", marginBottom: "7px", marginTop: 0 }}>{e.nombre}</p>
                                                <div style={{
                                                    display: "flex", flexWrap: 'wrap', justifyContent: 'space-between',
                                                    gap: 5
                                                }}>
                                                    {
                                                        Array(e.numero_archivos).fill(1).map((a, i) => (
                                                            <div
                                                                style={{
                                                                    borderWidth: "1px",
                                                                    borderStyle: "solid",
                                                                    padding: "6px",
                                                                    width: esImpar(e.numero_archivos) && i == (e.numero_archivos - 1) ? '100%' : 147,
                                                                    marginBottom: 2
                                                                }}

                                                            >
                                                                <input
                                                                    accept="image/*"
                                                                    style={{ display: "none", marginRight: "5px" }}
                                                                    id={"con" + e.nombre + i}
                                                                    multiple
                                                                    type="file"
                                                                    accept="application/pdf"
                                                                    onChange={(a) => {
                                                                        let temp = filesSelectedS.slice()
                                                                        temp.push({nombre:e.nombre, id:e.id_tipo_documento!=5&&e.id_tipo_documento!=8?e.id_tipo_documento:e.id_tipo_documento+""+i,name: "con" + i + "" + e.id_tipo_documento + e.nombre, file: a.target.files[0] })
                                                                        setFilesSelectedS(temp)
                                                                    }}
                                                                />
                                                                <label htmlFor={"con" + e.nombre + i}>
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
                                                                            {obtenerNombreS("con" + i + "" + e.id_tipo_documento + e.nombre) != "" ? (
                                                                                "(" + obtenerNombreS("con" + i + "" + e.id_tipo_documento + e.nombre).substring(0, 4) + "..." + ")"
                                                                            ) : "Adjuntar archivo"}
                                                                        </span>
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>

                                    ))
                                }
                            </React.Fragment>

                            :
                            null

                    }
                </div>

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
