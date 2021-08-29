import React, { useState, useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ClearIcon from '@material-ui/icons/Clear';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { convertirDate, dateFormatA } from "../../utils/Date";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { obtenerTodos } from "../../utils/API/ciudades";
import { obtenerRecomendaciones } from "../../utils/API/recomendaciones";
import { obtenerTodosProvincia } from "../../utils/API/provinces";
import Paper from "@material-ui/core/Paper";
import { obtenerTodos as obtenerTodosAsesor } from "../../utils/API/asessors.js";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { desencriptarJson } from '../../utils/security'
import {obtenerProyectos} from '../../utils/API/villas'


import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
  editarCliente,
  uploadFiles, uploadConyuge,
  registrarClienteAuth,
  upload,
  obtenerDataCliente,
} from "../../utils/API/clientes";
import { obtenerVillas } from "../../utils/API/villas";
import InputAdornment from "@material-ui/core/InputAdornment";
import { obtenerEstadoCivil } from "../../utils/API/civil";

import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import Initializer from "../../store/Initializer";
import Checkbox from "@material-ui/core/Checkbox";
import RefreshIcon from "@material-ui/icons/Refresh";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import { SwapVerticalCircleSharp } from "@material-ui/icons";
export default function Editar(props) {
  const initializer = useContext(Initializer);

  const dato = props.location.state;
  const edicion = props.location.pathname == "/clientes/crear" ? true : false;
  const [tipo, setTipo] = React.useState("client")
  const [asesorData, setAsesorData] = React.useState([])
  const [asesor, setAsesor] = React.useState('')
  const [cedula, setCedula] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [nacimiento, setNacimiento] = useState(new Date());
  const [celular, setCelular] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [ciudadData, setCiudadData] = useState({ data: [], backup: [] });
  const [ciudad, setCiudad] = useState("");
  const [lugarTrabajo, setLugarTrabajo] = useState("");
  const [recomendationData, setRecomendationData] = useState([]);
  const [recomendation, setRecomendation] = useState("");
  const [villageData, setVillageData] = useState([]);
  const [village, setVillage] = useState("");
  const [civil, setCivil] = useState("");
  const [autorization, setAutorization] = useState(false);
  const [email, setEmail] = useState("");
  const [cedulaR, setCedulaR] = useState("");
  const [ivaMensual, setIvaMensual] = React.useState(false);
  const [ivaMensualS, setIvaMensualS] = React.useState(false);

  const [ivaMensualO, setIvaMensualO] = React.useState(false);
  const [ivaMensualOS, setIvaMensualOS] = React.useState(false);

  const [nombreR, setNombreR] = useState("");
  const [proyectoR, setProyectoR] = useState("");

  const [dependencia, setDependencia] = useState(true);
  const [proyectoData, setProyectoData] = useState([]);
  const [dniFile, setDniFile] = useState(null);
  const [rolesFle, setRolesFile] = useState(null);
  const [rolesFle2, setRolesFile2] = useState(null);
  const [rolesFle3, setRolesFile3] = useState(null);
  const [mecanizado, setMecanizado] = useState(null);
  const [mecanizadoS, setMecanizadoS] = useState(null);
  const [precaFile, setPrecaFile] = useState(null);
  const [precalificationFile, setPrecalificationFile] = useState(null);
  const [rucFiles, setRucFiles] = useState(null);
  const [ivaDeclarationFile, setIvaDeclarationFile] = useState(null);
  const [ivaDeclarationFile2, setIvaDeclarationFile2] = useState(null);
  const [ivaDeclarationFile3, setIvaDeclarationFile3] = useState(null);
  const [ivaDeclarationFile4, setIvaDeclarationFile4] = useState(null);
  const [ivaDeclarationFile5, setIvaDeclarationFile5] = useState(null);
  const [ivaDeclarationFile6, setIvaDeclarationFile6] = useState(null);
  const [accounMovFile, setAccountMovFile] = useState(null);
  const [accounMovFile2, setAccountMovFile2] = useState(null);
  const [accounMovFile3, setAccountMovFile3] = useState(null);

  const [rentaDeclarationFile, setRentaDeclarationFile] = useState(null);

  const [ingresos, setIngresos] = useState(0);
  const [referencia, setReferencia] = React.useState("");
  const [villa, setVilla] = React.useState("");
  const [manzana, setManzana] = React.useState("");
  const [ciudadela, setCiudadela] = React.useState("");

  const [income, setIncome] = React.useState(0);
  const [otherIncome, setOtherIncome] = React.useState(0);
  const [otherExpenses, setOtherExpenses] = React.useState(0);

  const [rentExpenses, setRentExpenses] = React.useState(0);
  const [foodExpenses, setFoodExpenses] = React.useState(0);
  const [clothingExpenses, setClothingExpenses] = React.useState(0);
  const [basicExpenses, setBasicExpenses] = React.useState(0);
  const [educationExpenses, setEducationExpenses] = React.useState(0);
  const [transporte, setTransporte] = React.useState(0);

  const [position, setPosition] = React.useState("");
  const [cedulaS, setCedulaS] = useState("");
  const [nombresS, setNombresS] = useState();
  const [apellidosS, setApellidosS] = useState();
  const [nacimientoS, setNacimientoS] = useState('');
  const [celularS, setCelularS] = useState("");
  const [telefonoS, setTelefonoS] = useState("");
  const [emailS, setEmailS] = useState("");
  const [incomeS, setIncomeS] = React.useState(0);
  const [otherIncomeS, setOtherIncomeS] = React.useState(0);
  const [rentExpensesS, setRentExpensesS] = React.useState(0);
  const [foodExpensesS, setFoodExpensesS] = React.useState(0);
  const [clothingExpensesS, setClothingExpensesS] = React.useState(0);
  const [basicExpensesS, setBasicExpensesS] = React.useState(0);
  const [educationExpensesS, setEducationExpensesS] = React.useState(0);
  const [transporteS, setTransporteS] = React.useState(0);
  const [dniFileS, setDniFileS] = useState(null);
  const [rolesFleS, setRolesFileS] = useState(null);
  const [rolesFle2S, setRolesFile2S] = useState(null);

  const [rolesFle3S, setRolesFile3S] = useState(null);

  const [accounMovFileS, setAccountMovFileS] = useState(null);

  const [accounMovFile2S, setAccountMovFile2S] = useState(null);
  const [accounMovFile3S, setAccountMovFile3S] = useState(null);


  const [precaFileS, setPrecaFileS] = useState(null);
  const [rucFilesS, setRucFilesS] = useState(null);
  const [ivaDeclarationFileS, setIvaDeclarationFileS] = useState(null);
  const [ivaDeclarationFile2S, setIvaDeclarationFile2S] = useState(null);
  const [ivaDeclarationFile3S, setIvaDeclarationFile3S] = useState(null);
  const [ivaDeclarationFile4S, setIvaDeclarationFile4S] = useState(null);
  const [ivaDeclarationFile5S, setIvaDeclarationFile5S] = useState(null);
  const [ivaDeclarationFile6S, setIvaDeclarationFile6S] = useState(null);
  const [rentaDeclarationFileS, setRentaDeclarationFileS] = useState(null);


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
  const [dependenciaS, setDependenciaS] = useState(true);
  const [civilData, setCivilData] = useState([]);

  const [provinciaData, setProvinciaData] = useState({ data: [], backup: [] });
  const [provincia, setProvincia] = useState("");

  const [dataCliente, setDataCliente] = useState(null);

  const [reward, setReward] = useState(null);

  const [validation, setValidation] = useState({
    dni: 1,
    names: 1,
    last_names: 1,
    cellphone: 1,
    landline: 1,
    email: 1,
    civil_name: 1,
    recomendation_id: 1,
    spouse_dni: 1,
    spouse_names: 1,
    spouse_email: 1,
    spouse_last_names: 1,
  });
  const [hasValidation, setHasValidation] = useState(false);
  const getId = (nombre) => {
    let datos = [
      {
        id: 1,
        name: "SOLTERO",
      },
      {
        id: 2,
        name: "CASADO",
      },
      {
        id: 3,
        name: "UNION LIBRE",
      },
      {
        id: 4,
        name: "DIVORCIADO",
      },
      {
        id: 5,
        name: "VIUDO",
      },
      {
        id: 6,
        name: "CASADO - SEPARACIÓN DE BIENES",
      },
    ];
    let id_civil = "";
    datos.map((e) => {
      if (nombre == e.name) {
        id_civil = e.id;
      }
    });
    return id_civil;
  };
  const getName = (id) => {
    let datos = [
      {
        id: 1,
        name: "SOLTERO",
      },
      {
        id: 2,
        name: "CASADO",
      },
      {
        id: 3,
        name: "UNION LIBRE",
      },
      {
        id: 4,
        name: "DIVORCIADO",
      },
      {
        id: 5,
        name: "VIUDO",
      },
      {
        id: 6,
        name: "CASADO - SEPARACIÓN DE BIENES",
      },
    ];
    let id_civil = "";
    datos.map((e) => {
      if (id == e.id) {
        id_civil = e.name;
      }
    });
    return id_civil;
  };
  const changeProvince = (id) => {
    let data = [];
    ciudadData.backup.slice().map((e) => {
      if (e.id_provincia == id) {
        data.push({ ...e });
      }
    });

    setCiudadData({ ...ciudadData, data: data });
    setProvincia(id);
  };
  React.useEffect(() => {
    if (initializer.usuario != null) {
      setTipo(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user)

    }




  }, [initializer.usuario])
  React.useEffect(() => {
    if (tipo == "supervisor") {
      obtenerTodosAsesor(setAsesorData, initializer);

    }




  }, [tipo])
  useEffect(() => {
    if (dataCliente != null) {
      setNombres(dataCliente.client.names);
      setApellidos(dataCliente.client.last_names);
      setEmail(dataCliente.client.email);
      setCelular(dataCliente.client.cellphone);
      setTelefono(dataCliente.client.landline);
      setDireccion(dataCliente.client.address);
      setVilla(dataCliente.client.town);
      setManzana(dataCliente.client.block);
      setCiudadela(dataCliente.client.citadel);
      setBarrio(dataCliente.client.neighborhood);
      setReferencia(dataCliente.client.reference);
      // setNacimiento(convertirDate(dataCliente.client.born_date));
      setCiudad(dataCliente.client.city_id);
      setRecomendation(dataCliente.client.recomendation_id);
      setProvincia(dataCliente.client.province);
      setCivil(dataCliente.client.civil);
      setIncome(dataCliente.client.month_income);
      setOtherIncome(dataCliente.client.other_income);
      setOtherExpenses(dataCliente.client.other_expenses);
      setRentExpenses(dataCliente.client.rent_expenses);
      setFoodExpenses(dataCliente.client.food_expenses);
      setClothingExpenses(dataCliente.client.clothing_expenses);
      setBasicExpenses(dataCliente.client.basic_expenses);
      setEducationExpenses(dataCliente.client.education_expenses);
      setTransporte(dataCliente.client.transport_expenses);
      setReward(dataCliente.client.work_place);
      setCedulaR(dataCliente.client.referred_dni);
      setNombreR(dataCliente.client.referred_names);
      setProyectoR(dataCliente.client.referred_proyect);
      setDependencia(dataCliente.client.dependence == 1 ? true : false);

      setIvaMensual(dataCliente.client.monthly_iva != null ? (dataCliente.client.monthly_iva == 1 ? true : false) : false);


      if (dataCliente.spouse != null) {
        setEmailS(dataCliente.spouse.email);
        setCedulaS(dataCliente.spouse.dni);
        setNombresS(dataCliente.spouse.names);
        setApellidosS(dataCliente.spouse.last_names);
        setNacimientoS(dataCliente.spouse.born_date);
        setCelularS(dataCliente.spouse.cellphone);
        setTelefonoS(dataCliente.spouse.landline);
        setIvaMensualS(dataCliente.spouse.monthly_iva != null ? (dataCliente.spouse.monthly_iva == 1 ? true : false) : false);
        setIncomeS(dataCliente.spouse.month_income);
        setOtherIncomeS(dataCliente.spouse.other_income);
        setRentExpensesS(dataCliente.spouse.rent_expenses);
        setFoodExpensesS(dataCliente.spouse.food_expenses);
        setClothingExpensesS(dataCliente.spouse.clothing_expenses);
        setBasicExpensesS(dataCliente.spouse.basic_expenses);
        setEducationExpensesS(dataCliente.spouse.education_expenses);
        setTransporteS(dataCliente.spouse.transport_expenses);
      }
    }
  }, [dataCliente]);
  useEffect(() => {
    obtenerTodos(setCiudadData);
    obtenerTodosProvincia(setProvinciaData, initializer);
    obtenerRecomendaciones(setRecomendationData);
    obtenerVillas(setVillageData);
    obtenerEstadoCivil(setCivilData)
    
    obtenerProyectos(setProyectoData)
  }, []);
  const changeP = (e) => {
    return e;
  };
  const editarDatos = () => {
    if (validarCedula(cedula)) {
      editarCliente(
        {
          monthly_iva: ivaMensual == true ? 1 : 0,
          monthly_ivaS: ivaMensualS == true ? 1 : 0,
          other_monthly_iva: ivaMensualO == true ? 1 : 0,
          other_monthly_ivaS: ivaMensualOS == true ? 1 : 0,
          client_id: dataCliente.client.id,
          dni: cedula,
          names: nombres,
          last_names: apellidos,
          cellphone: celular,
          reference: referencia,
          born_date: dateFormatA(nacimiento),
          city_id: ciudad,
          recomendation_id: recomendation,
          civil: civil,
          civil_name: getName(civil),
          referred_dni: cedulaR,
          referred_names: nombreR,
          referred_proyect: proyectoR,
          work_place: reward,
          landline: telefono,
          address: direccion,
          neighborhood: "N/A",
          block: manzana,
          town: villa,
          citadel: ciudadela,
          position: dataCliente.client.position,
          email: email,
          income: income,
          month_income: income,
          other_income: otherIncome,
          other_expenses: otherExpenses,
          rent_expenses: rentExpenses,
          food_expenses: foodExpenses,
          clothing_expenses: clothingExpenses,
          basic_expenses: basicExpenses,
          education_expenses: educationExpenses,
          transport_expenses: transporte,

          spouse_id: dataCliente.spouse != null ? dataCliente.spouse.id : "",
          spouse_dni: cedulaS,
          spouse_names: nombresS,
          spouse_last_names: apellidosS,
          spouse_born_date: nacimientoS,
          spouse_cellphone: celularS,
          spouse_email: emailS,

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
        changeP,
        setValidation,
        setHasValidation
      );
      subirArchivos();
    } else {
      initializer.mostrarNotificacion({
        type: "error",
        message: "Conyuge: Cédula inválida",
      });
    }
  };
  const subirConyuge = () => {
    if (civil == 2 || civil == 3||civil==6) {


      uploadConyuge(
        {
          monthly_iva: ivaMensualS == true ? 1 : 0,
          monthly_ivaO: ivaMensualOS == true ? 1 : 0,
          dependencia: dependenciaS ? 0 : 1,
          dni: cedulaS,
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
          mov_filesi: accounMovFileS,

          ruc_filesiO: rucFilesOS != null ? rucFilesOS : null,
          decla_filesiO: ivaDeclarationFileOS != null ? ivaDeclarationFileOS : null,
          decla_filesi2O: ivaDeclarationFile2OS != null ? ivaDeclarationFile2OS : null,
          decla_filesi3O: ivaDeclarationFile3OS != null ? ivaDeclarationFile3OS : null,
          decla_filesi4O: ivaDeclarationFile4OS != null ? ivaDeclarationFile4OS : null,
          decla_filesi5O: ivaDeclarationFile5OS != null ? ivaDeclarationFile5OS : null,
          decla_filesi6O: ivaDeclarationFile6OS != null ? ivaDeclarationFile6OS : null,
          renta_filesiO:
            rentaDeclarationFileOS != null ? rentaDeclarationFileOS : null,
          mov_filesiO: accounMovFileOS != null ? accounMovFileOS : null,
        },
        initializer
      );


    }
  }
  const editar = () => {
    if (validarCedula(cedula)) {
      if (civil == 2 || civil == 3||civil==6) {
        if (validarCedula(cedulaS)) {
          if (validacionSpouse()) {
            registrarClienteAuth(
              {
                asesor_id: asesor,
                monthly_iva: ivaMensual == true ? 1 : 0,
                monthly_ivaS: ivaMensualS == true ? 1 : 0,
                other_monthly_iva: ivaMensualO == true ? 1 : 0,
                other_monthly_ivaS: ivaMensualOS == true ? 1 : 0,
                email: email,
                authorization: autorization,
                civil: civil,
                civil_name: getName(civil),
                position: ".",
                spouse_email: emailS,
                dependence: dependencia == true ? 0 : 1,
                village_id: village,
                dni: cedula,
                names: nombres,
                last_names: apellidos,
                born_date: dateFormatA(nacimiento),
                cellphone: celular,
                landline: telefono,
                address: direccion,
                neighborhood: "N/A",
                town: villa,
                block: manzana,
                citadel: ciudadela,
                city_id: ciudad,
                dependencia: dependencia == true ? 0 : 1,
                recomendation_id: recomendation,
                work_place: reward,
                month_income: income,
                other_income: otherIncome,
                other_expenses: otherExpenses,
                rent_expenses: rentExpenses,
                food_expenses: foodExpenses,
                clothing_expenses: clothingExpenses,
                basic_expenses: basicExpenses,
                education_expenses: educationExpenses,
                transport_expenses: transporte,

                spouse_dni: cedulaS,
                spouse_names: nombresS,
                spouse_last_names: apellidosS,
                spouse_born_date: nacimientoS,
                spouse_cellphone: celularS,
                spouse_landline: telefonoS,
                month_income_spouse: incomeS,
                other_income_spouse: otherIncomeS,
                rent_expenses_spouse: rentExpensesS,
                food_expenses_spouse: foodExpensesS,
                clothing_expenses_spouse: clothingExpensesS,
                basic_expenses_spouse: basicExpensesS,
                education_expenses_spouse: educationExpensesS,

                transport_expenses_spouse: transporteS,
              }, atras,
              initializer,
              setValidation,
              setHasValidation, subirConyuge
            );
            subirArchivos();
          }

        } else {
          initializer.mostrarNotificacion({
            type: "error",
            message: "Conyuge: Cédula inválida",
          });
        }
      } else {
        if (validacion()) {
          registrarClienteAuth(
            {
              asesor_id: asesor,
              monthly_iva: ivaMensual == true ? 1 : 0,
              monthly_ivaS: ivaMensualS == true ? 1 : 0,
              other_monthly_iva: ivaMensualO == true ? 1 : 0,
              other_monthly_ivaS: ivaMensualOS == true ? 1 : 0,
              email: email,
              dni: cedula,
              civil: civil,
              civil_name: getName(civil),
              names: nombres,

              position: ".",
              last_names: apellidos,
              born_date: dateFormatA(nacimiento),
              cellphone: celular,
              landline: telefono,
              address: direccion,
              neighborhood: "N/A",
              city_id: ciudad,
              town: villa,
              block: manzana,
              citadel: ciudadela,
              dependencia: dependencia == true ? 0 : 1,
              recomendation_id: recomendation,
              work_place: reward,
              month_income: income,
              other_income: otherIncome,
              other_expenses: otherExpenses,
              rent_expenses: rentExpenses,
              food_expenses: foodExpenses,
              clothing_expenses: clothingExpenses,
              basic_expenses: basicExpenses,
              education_expenses: educationExpenses,
              transport_expenses: transporte,

              spouse_dni: cedulaS,
              spouse_names: nombresS,
              spouse_last_names: apellidosS,
              spouse_born_date: nacimientoS,
              spouse_cellphone: celularS,
              spouse_landline: telefonoS,
              month_income_spouse: incomeS,
              other_income_spouse: otherIncomeS,
              rent_expenses_spouse: rentExpensesS,
              food_expenses_spouse: foodExpensesS,
              clothing_expenses_spouse: clothingExpensesS,
              basic_expenses_spouse: basicExpensesS,
              education_expenses_spouse: educationExpensesS,
              transport_expenses_spouse: transporteS,
            }, atras,
            initializer,
            setValidation,
            setHasValidation, subirConyuge
          );
          subirArchivos();
        }

      }
    } else {
      initializer.mostrarNotificacion({
        type: "error",
        message: "Cédula inválida",
      });
    }
  };
  const confirmar = () => {
    if (dataCliente != null) {
      editarDatos();
    } else {
      editar();
    }
  };
  const atras = () => {
    props.history.push("/clientes")
  }
  const subirArchivos = () => {
    upload(
      {
        monthly_iva: ivaMensual == true ? 1 : 0,
        monthly_ivaO: ivaMensualO == true ? 1 : 0,
        dependencia: dependencia ? 0 : 1,
        dni: cedula,
        dni_file: dniFile,
        roles_file: rolesFle,
        roles_file2: rolesFle2,
        roles_file3: rolesFle3,
        preca_file: precaFile,
        mecanizado: mecanizado,
        precalification_file: precalificationFile,
        ruc_filesi: rucFiles,
        decla_filesi: ivaDeclarationFile,

        decla_filesi2: ivaDeclarationFile2,
        decla_filesi3: ivaDeclarationFile3,
        decla_filesi4: ivaDeclarationFile4,
        decla_filesi5: ivaDeclarationFile5,
        decla_filesi6: ivaDeclarationFile6,



        renta_filesi: rentaDeclarationFile,
        mov_filesi: accounMovFile,

        ruc_filesiO: rucFilesO != null ? rucFilesO : null,
        decla_filesiO: ivaDeclarationFileO != null ? ivaDeclarationFileO : null,
        decla_filesi2O: ivaDeclarationFile2O != null ? ivaDeclarationFile2O : null,
        decla_filesi3O: ivaDeclarationFile3O != null ? ivaDeclarationFile3O : null,
        decla_filesi4O: ivaDeclarationFile4O != null ? ivaDeclarationFile4O : null,
        decla_filesi5O: ivaDeclarationFile5O != null ? ivaDeclarationFile5O : null,
        decla_filesi6O: ivaDeclarationFile6O != null ? ivaDeclarationFile6O : null,
        renta_filesiO:
          rentaDeclarationFileO != null ? rentaDeclarationFileO : null,
        mov_filesiO: accounMovFileO != null ? accounMovFileO : null,
      },
      initializer
    );
  };
  function validarCedula(cad) {
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
      for (let i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
        }
      }

      total = total % 10 ? 10 - (total % 10) : 0;

      if (cad.charAt(longitud - 1) == total) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const obtenerClienteData = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      if (cedula != "") {
        obtenerDataCliente(cedula, 0, setDataCliente, initializer);
      }
    }
  };
  const validacionSpouse = () => {
    let pass = true
    let msg = 'Cónyuge: '
    if (!validarEmail(email) || !validarEmail(emailS)) {
      pass = false
      msg += '\n* Email inválido'
    }
    if (celular.length != 10 || celularS.length != 10) {
      pass = false
      msg += '\n* Longitud del celular'
    }
    if (telefono.length != 9 || telefonoS.length != 9) {
      pass = false
      msg += '\n* Longitud del convencional'
    }
    if (pass == false) {
      const timer = setTimeout(() => {
        initializer.mostrarNotificacion({ type: "error", message: msg });
        clearTimeout(timer);
      }, 1500);



    }
    return pass
  }
  const validacion = () => {
    let pass = true
    let msg = ''
    if (!validarEmail(email)) {
      pass = false
      msg += '\n* Email inválido'
    }
    if (celular.length != 10) {
      pass = false
      msg += '\n* Longitud del celular'
    }
    if (telefono.length != 9) {
      pass = false
      msg += '\n* Longitud del convencional'
    }
    if (pass == false) {
      initializer.mostrarNotificacion({ type: "error", message: msg });

    }
    return pass
  }
  const validarEmail = (valor) => {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
      return true;
    } else {
      return false;
    }
  }
  const vaciar = () => {
    setCedula("");
    setDataCliente(null);
    setNombres("");
    setNacimiento(new Date())
    setNacimientoS(new Date())
    setApellidos("");
    setEmail("");
    setCelular("");
    setTelefono("");
    setDireccion("");
    setVilla("");
    setManzana("");
    setCiudadela("");
    setBarrio("");
    setReferencia("");

    setCiudad("");
    setRecomendation("");

    setCivil("");
    setIncome(0);
    setOtherIncome(0);
    setRentExpenses(0);
    setFoodExpenses(0);
    setClothingExpenses(0);
    setBasicExpenses(0);
    setEducationExpenses(0);

    setCedulaR("");
    setNombreR("");
    setProyectoR("");
    setDependencia(true);
    setEmailS("");
    setCedulaS("");
    setNombresS("");
    setApellidosS("");

    setCelularS("");
    setTelefonoS("");

    setIncomeS(0);
    setOtherIncomeS(0);
    setRentExpensesS(0);
    setFoodExpensesS(0);
    setClothingExpensesS(0);
    setBasicExpensesS(0);
    setEducationExpensesS(0);
  };

  const generar = () => {
    let premios = [
      "ESCOGE TÚ EL PREMIO",
      "OLLA ARROCERA",
      "JUEGO DE OLLAS",
      "HORNO",
      "ESCOGE DOS PREMIOS",
      "LICUADORA",
      "PARRILLA",
    ];
    let index = premios[Math.floor(Math.random() * premios.length)];
    setReward(index);
  };
  return (
    <Box mt={2} mb={2} ml={2} mr={2}>
      <Grid container container justify="center" alignItems="center">
        <Box mb={2} mt={1}>
          <Typography variant="h6" component="h6">
            Crear Interesado
          </Typography>
        </Box>


      </Grid>

      <Card>
        <CardContent>
          <form noValidate autoComplete="off">
            <Grid container spacing={1}>
              <Grid item md={4} xs={12}>
                <TextField
                  label="Cédula"
                  variant="outlined"
                  error={!validarCedula(cedula) && cedula != ""}
                  helperText={!validarCedula(cedula) && cedula != "" ? "Cédula inválida." : ""}
                  style={{ width: "100%" }}
                  /*  onBlur={() => {
                     if (cedula != "") {
                       obtenerDataCliente(
                         cedula,
                         0,
                         setDataCliente,
                         initializer
                       );
                     }
                   }} */
                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setCedula(e.target.value);
                    }
                  }}
                  // onKeyDown={obtenerClienteData}
                  value={cedula}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  label="Nombres"
                  error={validation.names == null}
                  helperText={validation.names == null ? "Requerido" : ""}
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                      setNombres(e.target.value)
                    }
                  }}
                  value={nombres}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  label="Apellidos"
                  error={validation.last_names == null}
                  helperText={validation.last_names == null ? "Rquerido" : ""}
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                      setApellidos(e.target.value)
                    }
                  }}
                  value={apellidos}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  label="Email"
                  error={validation.email == null}
                  helperText={validation.email == null ? "Rquerido" : ""}
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  label="Celular"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setCelular(e.target.value);
                    }
                  }}
                  value={celular}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  label="Teléfono fijo"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setTelefono(e.target.value);
                    }
                  }}
                  value={telefono}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  label="Calle 1"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setDireccion(e.target.value)}
                  value={direccion}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Calle 2"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setManzana(e.target.value)}
                  value={manzana}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Número de villa"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setVilla(e.target.value)}
                  value={villa}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Otra descripción de dirección"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setCiudadela(e.target.value)}
                  value={ciudadela}
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    variant="dialog"
                    inputVariant="outlined"
                    label="Fecha de nacimiento"
                    style={{ width: "100%" }}
                    format="dd/MM/yyyy"
                    value={nacimiento}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={date => setNacimiento(date)}
                  />


                </MuiPickersUtilsProvider>

              </Grid>
              {/*    <Grid item md={6} xs={12}>
                <TextField
                  label="Barrio"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => setBarrio(e.target.value)}
                  value={barrio}
                />
              </Grid> */}
              <Grid item md={4} xs={12}>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel id="provin">Provincia</InputLabel>
                  <Select
                    labelId="provin"
                    value={provincia}
                    onChange={(e) => changeProvince(e.target.value)}
                    label="provin"
                  >
                    <MenuItem value="">
                      <em>Seleccione una provincia</em>
                    </MenuItem>
                    {provinciaData.data.map((e) => (
                      <MenuItem key={e.id_provincia} value={e.id_provincia}>
                        <em>{e.pv_descrip}</em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={12}>
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <InputLabel id="label">Cantón</InputLabel>
                  <Select
                    labelId="label"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    label="ciu"
                  >
                    <MenuItem value="">
                      <em>Seleccione un cantón</em>
                    </MenuItem>
                    {ciudadData.data.map((e) => (
                      <MenuItem key={e.id_ciudad} value={e.id_ciudad}>
                        <em>{e.cd_descrip}</em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={4} xs={12}>
                <FormControl
                  variant="outlined"
                  style={{ width: "100%" }}
                  error={validation.recomendation_id == null}
                >
                  <InputLabel id="label1">
                    ¿Cómo se entero de nosotros?
                  </InputLabel>
                  <Select
                    labelId="label1"
                    value={recomendation}
                    onChange={(e) => setRecomendation(e.target.value)}
                    label="re"
                  >
                    <MenuItem value="">
                      <em>Seleccione una opción</em>
                    </MenuItem>
                    {recomendationData.map((e) => (
                      <MenuItem key={e.id_medios} value={e.id_medios}>
                        <em>{e.med_descrip}</em>
                      </MenuItem>
                    ))}
                  </Select>
                  {validation.recomendation_id == null ? (
                    <FormHelperText>Requerido</FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item md={4} xs={12}>
                <FormControl
                  variant="outlined"
                  style={{ width: "100%" }}
                  error={validation.civil_name == null}
                >
                  <InputLabel id="label1">Estado civil</InputLabel>
                  <Select
                    labelId="label1"
                    value={civil}
                    onChange={(e) => setCivil(e.target.value)}
                    label="re"
                  >
                    <MenuItem value="">
                      <em>Seleccione una opción</em>
                    </MenuItem>

                    {civilData.map((e) => (

                      <MenuItem key={e.id_estacivil} value={e.id_estacivil}>
                        <em>{e.est_descrip}</em>
                      </MenuItem>
                    ))}
                  </Select>
                  {validation.civil_name == null ? (
                    <FormHelperText>Requerido</FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>
              {recomendation == 4 ? (
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Datos del referidor
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Cédula"
                      error={!validarCedula(cedulaR)}
                      helperText={
                        !validarCedula(cedulaR) ? "Cédula inválida." : ""
                      }
                      variant="outlined"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        const re = /^[0-9\b]+$/;

                        if (e.target.value === "" || re.test(e.target.value)) {
                          setCedulaR(e.target.value)
                        }
                      }}
                      value={cedulaR}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Nombres completos"
                      variant="outlined"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                          setNombreR(e.target.value)
                        }
                      }
                      }
                      value={nombreR}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <select
                      name=""
                      id=""
                      style={{
                        width: "100%",
                        padding: "6px",
                        marginTop: "10px",
                        color: "#959595",
                      }}
                      onChange={(e) => setProyectoR(e.target.value)}
                      value={proyectoR}
                    >
                      <option value="">Proyecto donde compro</option>
                      {proyectoData.map((e) => (
                        <option key={e.id_proyecto} value={e.id_proyecto}>
                          {e.pry_descrip}
                        </option>
                      ))}
                    </select>
                  </Grid>
                </Grid>
              ) : null}
            

              <Grid item xs={12} md={6}>
                <TextField
                  label="Ingresos"
                  variant="outlined"
                  style={{ width: "100%" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}

                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setIncome(e.target.value);
                    }
                  }}
                  value={income}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Otros ingresos"
                  variant="outlined"
                  style={{ width: "100%" }}

                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setOtherIncome(e.target.value);
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={otherIncome}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography style={{ fontWeight: "bold" }} color="textPrimary">
                  Egresos:
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Renta"
                  variant="outlined"
                  style={{ width: "100%" }}

                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setRentExpenses(e.target.value);
                    }
                  }}
                  value={rentExpenses}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Comida"
                  variant="outlined"
                  style={{ width: "100%" }}

                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setFoodExpenses(e.target.value);
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={foodExpenses}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Ropa"
                  variant="outlined"
                  style={{ width: "100%" }}

                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setClothingExpenses(e.target.value);
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={clothingExpenses}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Servicios básicos"
                  variant="outlined"
                  style={{ width: "100%" }}

                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setBasicExpenses(e.target.value);
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={basicExpenses}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Educación"
                  variant="outlined"
                  style={{ width: "100%" }}

                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setEducationExpenses(e.target.value);
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={educationExpenses}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Transporte"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setTransporte(e.target.value);
                    }
                  }}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={transporte}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Otros gastos"
                  variant="outlined"
                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;

                    if (e.target.value === "" || re.test(e.target.value)) {
                      setOtherExpenses(e.target.value);
                    }
                  }}
                  style={{ width: "100%" }}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={otherExpenses}
                />
              </Grid>
              {/*  <Grid item md={4} xs={12}>
                <TextField
                  label="Ingresos mensuales"
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    
                    const amount = e.target.value;
                    if (
                        !amount ||
                        amount.match(/^\d{1,}(\.\d{0,4})?$/)
                    ) {
                       
                      setIngresos(e.target.value)
                    }
                  }}
                  value={ingresos}
                />
              </Grid>
           
            */}
              <Grid item xs={12} md={12}>
                {
                  tipo == "supervisor" &&
                  <Autocomplete
                    style={{ width: '100%' }}
                    key={1}
                    id={1}
                    options={asesorData}

                    getOptionLabel={(option) => option.dni + " - " + option.names + " " + option.last_names}
                    onChange={(event, value) => {
                      if (value != null) {
                        setAsesor(value.id)

                      } else {
                        setAsesor('')

                      }

                    }} // prints the selected value
                    renderInput={params => (
                      <TextField {...params} label="Asignar  asesor" variant="outlined" fullWidth />
                    )}
                  />
                }
              </Grid>
              {/*  <Grid item md={6} xs={6}>
                <div>
                  <Button
                    disabled={
                      dataCliente != null
                        ? dataCliente.client.work_place != null &&
                          dataCliente.client.work_place != ""
                          ? true
                          : false
                        : false
                    }
                    startIcon={<GroupWorkIcon />}
                    variant="contained"
                    color="secondary"
                    onClick={() => generar()}
                  >
                    Generar premio
                  </Button>
                  {reward != null ? (
                    <p style={{ fontWeight: "bold" }}>Ha ganado: {reward}</p>
                  ) : null}
                </div>
              </Grid> */}
              <Grid item md={12} xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={dependencia}
                      onChange={() => {
                        setDependencia(!dependencia);
                        setLugarTrabajo("");
                        if (!dependencia == true) {
                          setRucFiles(null);
                          setIvaDeclarationFile(null);
                          setAccountMovFile(null);
                        } else {
                          setRolesFile(null);
                          setPrecaFile(null);
                        }
                      }}
                      name="checkedA"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  }
                  label="¿Posee relación de dependencia?"
                />
              </Grid>
              {
                otherIncome != 0 ?
                  <Grid item md={12} xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={ivaMensualO}
                          onChange={() => {
                            setIvaMensualO(!ivaMensualO);


                          }}

                          inputProps={{
                            "aria-label": "secondary checkbox",
                          }}
                        />
                      }
                      label="Otros ingresos: ¿Declara IVA mensualmente?"
                    />
                  </Grid>
                  : null
              }
              <Grid container item md={12} xs={12}>
                {dependencia == true ? (
                  <div style={{ width: '100%' }}>

                    <TableContainer component={Paper}>
                      <Table aria-label="simple table" size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Nombre
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: "bold" }}
                              align="right"
                            >
                              Archivo
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Cèdula
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              <div
                                style={{
                                  marginRight: "5px",
                                }}
                              >
                                <input
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  id="dniFile"
                                  accept="application/pdf"
                                  type="file"
                                  onChange={(e) => setDniFile(e.target.files[0])}
                                />
                                <label htmlFor="dniFile">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Subir{" "}
                                    {dniFile != null
                                      ? "(" + dniFile.name + ")"
                                      : ""}
                                  </Button>
                                </label>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow style={{ display: 'none' }}>
                            <TableCell>
                              3 Últimos Roles de Pago:
                            </TableCell>
                            <TableCell align="right">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <div style={{ marginRight: "5px" }}>
                                  <input
                                    accept="image/*"
                                    style={{
                                      display: "none",
                                      marginRight: "5px",
                                    }}
                                    id="rolesFle"
                                    multiple
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                      setRolesFile(e.target.files[0])
                                    }
                                  />
                                  <label htmlFor="rolesFle">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                    >
                                      Subir
                                      {rolesFle != null
                                        ? "(" +
                                        rolesFle.name.substring(-1, 5) +
                                        ")"
                                        : ""}
                                    </Button>
                                  </label>
                                </div>
                                <div style={{ marginRight: "5px" }}>
                                  <input
                                    accept="image/*"
                                    style={{
                                      display: "none",
                                      marginRight: "5px",
                                    }}
                                    id="rolesFle2"
                                    multiple
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                      setRolesFile2(e.target.files[0])
                                    }
                                  />
                                  <label htmlFor="rolesFle2">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                    >
                                      Subir
                                      {rolesFle2 != null
                                        ? "(" +
                                        rolesFle2.name.substring(-1, 5) +
                                        ")"
                                        : ""}
                                    </Button>
                                  </label>
                                </div>
                                <div style={{ marginRight: "5px" }}>
                                  <input
                                    accept="image/*"
                                    style={{
                                      display: "none",
                                      marginRight: "5px",
                                    }}
                                    id="rolesFle3"
                                    multiple
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                      setRolesFile3(e.target.files[0])
                                    }
                                  />
                                  <label htmlFor="rolesFle3">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                    >
                                      Subir
                                      {rolesFle3 != null
                                        ? "(" +
                                        rolesFle3.name.substring(-1, 5) +
                                        ")"
                                        : ""}
                                    </Button>
                                  </label>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Mecanizado del IESS</TableCell>
                            <TableCell align="right">
                              <div style={{ marginRight: "5px" }}>
                                <input
                                  accept="image/*"
                                  style={{
                                    display: "none",
                                    marginRight: "5px",
                                  }}
                                  id="mecanizado"
                                  multiple
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) =>
                                    setMecanizado(e.target.files[0])
                                  }
                                />
                                <label htmlFor="mecanizado">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Subir
                                    {mecanizado != null ? mecanizado.name : ""}
                                  </Button>
                                </label>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Buró de crédito
                            </TableCell>
                            <TableCell align="right">
                              <div style={{ marginRight: "5px" }}>
                                <input
                                  accept="image/*"
                                  style={{ display: "none", marginRight: "5px" }}
                                  id="precaFile"
                                  multiple
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) =>
                                    setPrecaFile(e.target.files[0])
                                  }
                                />
                                <label htmlFor="precaFile">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Subir
                                    {precaFile != null ? precaFile.name : ""}
                                  </Button>
                                </label>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Precalificación hipotecaria
                            </TableCell>
                            <TableCell align="right">
                              <div style={{ marginRight: "5px" }}>
                                <input
                                  accept="image/*"
                                  style={{
                                    display: "none",
                                    marginRight: "5px",
                                  }}
                                  id="precalificationFile"
                                  multiple
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) =>
                                    setPrecalificationFile(e.target.files[0])
                                  }
                                />
                                <label htmlFor="precalificationFile">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Subir
                                    {precalificationFile != null ? precalificationFile.name : ""}
                                  </Button>
                                </label>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {
                      otherIncome != 0 && otherIncome != null ?
                        <TableContainer component={Paper}>
                          <Table aria-label="simple table" size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>
                                  Otros ingresos
                          </TableCell>
                                <TableCell
                                  style={{ fontWeight: "bold" }}
                                  align="right"
                                >
                                  Archivo
                          </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>RUC / RICE</TableCell>

                                <TableCell align="right">
                                  <div style={{ marginRight: "5px" }}>
                                    <input
                                      accept="image/*"
                                      style={{
                                        display: "none",
                                        marginRight: "5px",
                                      }}
                                      id="rucFilesO"
                                      accept="application/pdf"
                                      type="file"
                                      onChange={(e) =>
                                        setRucFilesO(e.target.files[0])
                                      }
                                    />
                                    <label htmlFor="rucFilesO">
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                      >
                                        Subir
                                  {rucFilesO != null ? rucFilesO.name : ""}
                                      </Button>
                                    </label>
                                  </div>
                                </TableCell>
                              </TableRow>


                              {
                                ivaMensualO ?
                                  <TableRow>
                                    <TableCell>Declaración del IVA (6 meses)</TableCell>
                                    <TableCell align="right">
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <div style={{ marginRight: "5px" }}>
                                          <input
                                            accept="image/*"
                                            style={{
                                              display: "none",
                                              marginRight: "5px",
                                            }}
                                            id="ivaFileO"
                                            accept="application/pdf"
                                            type="file"
                                            onChange={(e) =>
                                              setIvaDeclarationFileO(e.target.files[0])
                                            }
                                          />
                                          <label htmlFor="ivaFileO">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              component="span"
                                            >
                                              Subir
                                      {ivaDeclarationFileO != null
                                                ? "(" + ivaDeclarationFileO.name.substring(0, 4) + '...' + ")"
                                                : ""}
                                            </Button>
                                          </label>
                                        </div>
                                        <div style={{ marginRight: "5px" }}>
                                          <input
                                            accept="image/*"
                                            style={{
                                              display: "none",
                                              marginRight: "5px",
                                            }}
                                            id="ivaFile2O"
                                            accept="application/pdf"
                                            type="file"
                                            onChange={(e) =>
                                              setIvaDeclarationFile2O(e.target.files[0])
                                            }
                                          />
                                          <label htmlFor="ivaFile2O">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              component="span"
                                            >
                                              Subir
                                      {ivaDeclarationFile2O != null
                                                ? "(" + ivaDeclarationFile2O.name.substring(0, 4) + '...' + ")"
                                                : ""}
                                            </Button>
                                          </label>
                                        </div>

                                        <div style={{ marginRight: "5px" }}>
                                          <input
                                            accept="image/*"
                                            style={{
                                              display: "none",
                                              marginRight: "5px",
                                            }}
                                            id="ivaFile3O"
                                            accept="application/pdf"
                                            type="file"
                                            onChange={(e) =>
                                              setIvaDeclarationFile3O(e.target.files[0])
                                            }
                                          />
                                          <label htmlFor="ivaFile3O">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              component="span"
                                            >
                                              Subir
                                      {ivaDeclarationFile3O != null
                                                ? "(" + ivaDeclarationFile3O.name.substring(0, 4) + '...' + ")"
                                                : ""}
                                            </Button>
                                          </label>
                                        </div>

                                        <div style={{ marginRight: "5px" }}>
                                          <input
                                            accept="image/*"
                                            style={{
                                              display: "none",
                                              marginRight: "5px",
                                            }}
                                            id="ivaFile4O"
                                            accept="application/pdf"
                                            type="file"
                                            onChange={(e) =>
                                              setIvaDeclarationFile4O(e.target.files[0])
                                            }
                                          />
                                          <label htmlFor="ivaFile4O">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              component="span"
                                            >
                                              Subir
                                      {ivaDeclarationFile4O != null
                                                ? "(" + ivaDeclarationFile4O.name.substring(0, 4) + '...' + ")"
                                                : ""}
                                            </Button>
                                          </label>
                                        </div>
                                        <div style={{ marginRight: "5px" }}>
                                          <input
                                            accept="image/*"
                                            style={{
                                              display: "none",
                                              marginRight: "5px",
                                            }}
                                            id="ivaFile5O"
                                            accept="application/pdf"
                                            type="file"
                                            onChange={(e) =>
                                              setIvaDeclarationFile5O(e.target.files[0])
                                            }
                                          />
                                          <label htmlFor="ivaFile5O">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              component="span"
                                            >
                                              Subir
                                      {ivaDeclarationFile5O != null
                                                ? "(" + ivaDeclarationFile5O.name.substring(0, 4) + '...' + ")"
                                                : ""}
                                            </Button>
                                          </label>
                                        </div>
                                        <div style={{ marginRight: "5px" }}>
                                          <input
                                            accept="image/*"
                                            style={{
                                              display: "none",
                                              marginRight: "5px",
                                            }}
                                            id="ivaFile6O"
                                            accept="application/pdf"
                                            type="file"
                                            onChange={(e) =>
                                              setIvaDeclarationFile6O(e.target.files[0])
                                            }
                                          />
                                          <label htmlFor="ivaFile6O">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              component="span"
                                            >
                                              Subir
                                      {ivaDeclarationFile6O != null
                                                ? "(" + ivaDeclarationFile6O.name.substring(0, 4) + '...' + ")"
                                                : ""}
                                            </Button>
                                          </label>
                                        </div>

                                      </div>
                                    </TableCell>
                                  </TableRow>

                                  :
                                  <TableRow>
                                    <TableCell>
                                      Declaración del IVA (6 meses)
                          </TableCell>
                                    <TableCell align="right">
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <div style={{ marginRight: "5px" }}>
                                          <input
                                            accept="image/*"
                                            style={{
                                              display: "none",
                                              marginRight: "5px",
                                            }}
                                            id="ivaDeclarationFileO"
                                            accept="application/pdf"
                                            type="file"
                                            onChange={(e) =>
                                              setIvaDeclarationFileO(
                                                e.target.files[0]
                                              )
                                            }
                                          />
                                          <label htmlFor="ivaDeclarationFileO">
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              component="span"
                                            >
                                              Subir
                                    {ivaDeclarationFileO != null
                                                ? ivaDeclarationFileO.name
                                                : ""}
                                            </Button>
                                          </label>
                                        </div>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                              }

                              <TableRow>
                                <TableCell>
                                  Declaración del impuesto a la renta (último año)
                          </TableCell>
                                <TableCell align="right">
                                  <div style={{ marginRight: "5px" }}>
                                    <input
                                      accept="image/*"
                                      style={{
                                        display: "none",
                                        marginRight: "5px",
                                      }}
                                      id="rentaDeclarationFileO"
                                      accept="application/pdf"
                                      type="file"
                                      onChange={(e) =>
                                        setRentaDeclarationFileO(
                                          e.target.files[0]
                                        )
                                      }
                                    />
                                    <label htmlFor="rentaDeclarationFileO">
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                      >
                                        Subir
                                  {rentaDeclarationFileO != null
                                          ? rentaDeclarationFileO.name
                                          : ""}
                                      </Button>
                                    </label>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>
                                  Movimientos cuenta (3 meses):
                          </TableCell>
                                <TableCell align="right">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <div style={{ marginRight: "5px" }}>
                                      <input
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        accept="application/pdf"
                                        type="file"
                                        id="accounMovFileO"
                                        onChange={(e) =>
                                          setAccountMovFileO(e.target.files[0])
                                        }
                                      />
                                      <label htmlFor="accounMovFileO">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component="span"
                                        >
                                          Subir
                                    {accounMovFileO != null
                                            ? accounMovFileO.name
                                            : ""}
                                        </Button>
                                      </label>
                                    </div>
                                    <div style={{ marginRight: "5px" }}>
                                      <input
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        accept="application/pdf"
                                        type="file"
                                        id="accounMovFile2O"
                                        onChange={(e) =>
                                          setAccountMovFile2O(e.target.files[0])
                                        }
                                      />
                                      <label htmlFor="accounMovFile2O">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component="span"
                                        >
                                          Subir
                                    {accounMovFile2O != null
                                            ? accounMovFile2O.name
                                            : ""}
                                        </Button>
                                      </label>
                                    </div>
                                    <div style={{ marginRight: "5px" }}>
                                      <input
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        accept="application/pdf"
                                        type="file"
                                        id="accounMovFile3O"
                                        onChange={(e) =>
                                          setAccountMovFile3O(e.target.files[0])
                                        }
                                      />
                                      <label htmlFor="accounMovFile3O">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component="span"
                                        >
                                          Subir
                                    {accounMovFile3O != null
                                            ? accounMovFile3O.name
                                            : ""}
                                        </Button>
                                      </label>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>

                        : null

                    }
                  </div>

                ) : (
                  <div style={{ width: '100%' }}>
                    <Grid item md={6} xs={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={ivaMensual}
                            onChange={() => {
                              setIvaMensual(!ivaMensual);

                            }}
                            name="checkedA"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        }
                        label="¿Declara IVA mensualmente?"
                      />
                    </Grid>

                    <TableContainer component={Paper}>
                      <Table aria-label="simple table" size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Nombre
                          </TableCell>
                            <TableCell
                              style={{ fontWeight: "bold" }}
                              align="right"
                            >
                              Archivo
                          </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Cèdula
                          </TableCell>
                            <TableCell align="right">
                              {" "}
                              <div
                                style={{
                                  marginRight: "5px",
                                }}
                              >
                                <input
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  id="dniFile"
                                  accept="application/pdf"
                                  type="file"
                                  onChange={(e) => setDniFile(e.target.files[0])}
                                />
                                <label htmlFor="dniFile">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Subir{" "}
                                    {dniFile != null
                                      ? "(" + dniFile.name + ")"
                                      : ""}
                                  </Button>
                                </label>
                              </div>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>
                              Buró de crédito
                          </TableCell>
                            <TableCell align="right">
                              <div style={{ marginRight: "5px" }}>
                                <input
                                  accept="image/*"
                                  style={{ display: "none", marginRight: "5px" }}
                                  id="precaFile"
                                  multiple
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) =>
                                    setPrecaFile(e.target.files[0])
                                  }
                                />
                                <label htmlFor="precaFile">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Subir
                                  {precaFile != null ? precaFile.name : ""}
                                  </Button>
                                </label>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Precalificación hipotecaria
                              </TableCell>
                            <TableCell align="right">
                              <div style={{ marginRight: "5px" }}>
                                <input
                                  accept="image/*"
                                  style={{
                                    display: "none",
                                    marginRight: "5px",
                                  }}
                                  id="precalificationFile"
                                  multiple
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) =>
                                    setPrecalificationFile(e.target.files[0])
                                  }
                                />
                                <label htmlFor="precalificationFile">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Subir
                                      {precalificationFile != null ? precalificationFile.name : ""}
                                  </Button>
                                </label>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              RUC / RICE
                          </TableCell>
                            <TableCell align="right">
                              <div style={{ marginRight: "5px" }}>
                                <input
                                  accept="image/*"
                                  style={{ display: "none", marginRight: "5px" }}
                                  id="rucFiles"
                                  accept="application/pdf"
                                  type="file"
                                  onChange={(e) => setRucFiles(e.target.files[0])}
                                />
                                <label htmlFor="rucFiles">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Subir {rucFiles != null ? rucFiles.name : ""}
                                  </Button>
                                </label>
                              </div>
                            </TableCell>
                          </TableRow>

                          {
                            ivaMensual ?
                              <TableRow>
                                <TableCell>Declaración del IVA (6 meses)</TableCell>
                                <TableCell align="right">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <div style={{ marginRight: "5px" }}>
                                      <input
                                        accept="image/*"
                                        style={{
                                          display: "none",
                                          marginRight: "5px",
                                        }}
                                        id="ivaFile"
                                        accept="application/pdf"
                                        type="file"
                                        onChange={(e) =>
                                          setIvaDeclarationFile(e.target.files[0])
                                        }
                                      />
                                      <label htmlFor="ivaFile">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component="span"
                                        >
                                          Subir
                                        {ivaDeclarationFile != null
                                            ? "(" + ivaDeclarationFile.name.substring(0, 4) + '...' + ")"
                                            : ""}
                                        </Button>
                                      </label>
                                    </div>
                                    <div style={{ marginRight: "5px" }}>
                                      <input
                                        accept="image/*"
                                        style={{
                                          display: "none",
                                          marginRight: "5px",
                                        }}
                                        id="ivaFile2"
                                        accept="application/pdf"
                                        type="file"
                                        onChange={(e) =>
                                          setIvaDeclarationFile2(e.target.files[0])
                                        }
                                      />
                                      <label htmlFor="ivaFile2">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component="span"
                                        >
                                          Subir
                                        {ivaDeclarationFile2 != null
                                            ? "(" + ivaDeclarationFile2.name.substring(0, 4) + '...' + ")"
                                            : ""}
                                        </Button>
                                      </label>
                                    </div>

                                    <div style={{ marginRight: "5px" }}>
                                      <input
                                        accept="image/*"
                                        style={{
                                          display: "none",
                                          marginRight: "5px",
                                        }}
                                        id="ivaFile3"
                                        accept="application/pdf"
                                        type="file"
                                        onChange={(e) =>
                                          setIvaDeclarationFile3(e.target.files[0])
                                        }
                                      />
                                      <label htmlFor="ivaFile3">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component="span"
                                        >
                                          Subir
                                        {ivaDeclarationFile3 != null
                                            ? "(" + ivaDeclarationFile3.name.substring(0, 4) + '...' + ")"
                                            : ""}
                                        </Button>
                                      </label>
                                    </div>

                                    <div style={{ marginRight: "5px" }}>
                                      <input
                                        accept="image/*"
                                        style={{
                                          display: "none",
                                          marginRight: "5px",
                                        }}
                                        id="ivaFile4"
                                        accept="application/pdf"
                                        type="file"
                                        onChange={(e) =>
                                          setIvaDeclarationFile4(e.target.files[0])
                                        }
                                      />
                                      <label htmlFor="ivaFile4">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component="span"
                                        >
                                          Subir
                                        {ivaDeclarationFile4 != null
                                            ? "(" + ivaDeclarationFile4.name.substring(0, 4) + '...' + ")"
                                            : ""}
                                        </Button>
                                      </label>
                                    </div>
                                    <div style={{ marginRight: "5px" }}>
                                      <input
                                        accept="image/*"
                                        style={{
                                          display: "none",
                                          marginRight: "5px",
                                        }}
                                        id="ivaFile5"
                                        accept="application/pdf"
                                        type="file"
                                        onChange={(e) =>
                                          setIvaDeclarationFile5(e.target.files[0])
                                        }
                                      />
                                      <label htmlFor="ivaFile5">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component="span"
                                        >
                                          Subir
                                        {ivaDeclarationFile5 != null
                                            ? "(" + ivaDeclarationFile5.name.substring(0, 4) + '...' + ")"
                                            : ""}
                                        </Button>
                                      </label>
                                    </div>
                                    <div style={{ marginRight: "5px" }}>
                                      <input
                                        accept="image/*"
                                        style={{
                                          display: "none",
                                          marginRight: "5px",
                                        }}
                                        id="ivaFile6"
                                        accept="application/pdf"
                                        type="file"
                                        onChange={(e) =>
                                          setIvaDeclarationFile6(e.target.files[0])
                                        }
                                      />
                                      <label htmlFor="ivaFile6">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component="span"
                                        >
                                          Subir
                                        {ivaDeclarationFile6 != null
                                            ? "(" + ivaDeclarationFile6.name.substring(0, 4) + '...' + ")"
                                            : ""}
                                        </Button>
                                      </label>
                                    </div>

                                  </div>
                                </TableCell>
                              </TableRow>
                              :

                              <TableRow>
                                <TableCell>Declaración del IVA (6 meses)</TableCell>
                                <TableCell align="right">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <div style={{ marginRight: "5px" }}>
                                      <input
                                        accept="image/*"
                                        style={{
                                          display: "none",
                                          marginRight: "5px",
                                        }}
                                        id="ivaFile"
                                        accept="application/pdf"
                                        type="file"
                                        onChange={(e) =>
                                          setIvaDeclarationFile(e.target.files[0])
                                        }
                                      />
                                      <label htmlFor="ivaFile">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component="span"
                                        >
                                          Subir
                                        {ivaDeclarationFile != null
                                            ? ivaDeclarationFile.name
                                            : ""}
                                        </Button>
                                      </label>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>

                          }


                          <TableRow>
                            <TableCell>
                              Declaración del impuesto a la renta (último año)
                          </TableCell>
                            <TableCell align="right">
                              <div style={{ marginRight: "5px" }}>
                                <input
                                  accept="image/*"
                                  style={{ display: "none", marginRight: "5px" }}
                                  id="ivaDeclarationFile"
                                  accept="application/pdf"
                                  type="file"
                                  onChange={(e) =>
                                    setRentaDeclarationFile(e.target.files[0])
                                  }
                                />
                                <label htmlFor="ivaDeclarationFile">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Subir
                                {rentaDeclarationFile != null
                                      ? rentaDeclarationFile.name
                                      : ""}
                                  </Button>
                                </label>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>

                              Movimientos cuenta (3 meses):
                            </TableCell>
                            <TableCell align="right">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <div style={{ marginRight: "5px" }}>
                                  <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="accounMovFile"
                                    accept="application/pdf"
                                    type="file"
                                    multiple
                                    onChange={(e) => setAccountMovFile(e.target.files[0])}
                                  />
                                  <label htmlFor="accounMovFile">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                    >
                                      Subir{" "}
                                      {accounMovFile != null ? accounMovFile.name : ""}
                                    </Button>
                                  </label>
                                </div>
                                <div style={{ marginRight: "5px" }}>
                                  <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="accounMovFile2"
                                    accept="application/pdf"
                                    type="file"
                                    multiple
                                    onChange={(e) => setAccountMovFile2(e.target.files[0])}
                                  />
                                  <label htmlFor="accounMovFile2">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                    >
                                      Subir{" "}
                                      {accounMovFile2 != null ? accounMovFile2.name : ""}
                                    </Button>
                                  </label>
                                </div>
                                <div style={{ marginRight: "5px" }}>
                                  <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="accounMovFile3"
                                    accept="application/pdf"
                                    type="file"
                                    multiple
                                    onChange={(e) => setAccountMovFile3(e.target.files[0])}
                                  />
                                  <label htmlFor="accounMovFile3">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      component="span"
                                    >
                                      Subir{" "}
                                      {accounMovFile3 != null ? accounMovFile3.name : ""}
                                    </Button>
                                  </label>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                  </div>
                )}
              </Grid>

              {civil == 2 || civil == 3||civil==6 ? (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography style={{ fontWeight: "bold" }} gutterBottom>
                        Datos del conyuge
                      </Typography>
                      <Box mb={2} mt={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Cédula"
                              variant="outlined"
                              error={!validarCedula(cedulaS)}
                              helperText={
                                !validarCedula(cedulaS)
                                  ? "Cédula inválida."
                                  : ""
                              }
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (
                                  e.target.value === "" ||
                                  re.test(e.target.value)
                                ) {
                                  setCedulaS(e.target.value);
                                }
                              }}
                              value={cedulaS}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Nombres"
                              error={validation.spouse_names == null}
                              helperText={
                                validation.spouse_names == null
                                  ? "Rquerido"
                                  : ""
                              }
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                                  setNombresS(e.target.value)
                                }
                              }}
                              value={nombresS}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Apellidos"
                              error={validation.spouse_last_names == null}
                              helperText={
                                validation.spouse_last_names == null
                                  ? "Rquerido"
                                  : ""
                              }
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                if (new RegExp("^[a-zA-Z ]+$").test(e.target.value)) {
                                  setApellidosS(e.target.value)
                                }
                              }}
                              value={apellidosS}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Box>
                        <Grid container spacing={2}>

                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Celular"
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (
                                  e.target.value === "" ||
                                  re.test(e.target.value)
                                ) {
                                  setCelularS(e.target.value);
                                }
                              }}
                              value={celularS}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Teléfono fijo"
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (
                                  e.target.value === "" ||
                                  re.test(e.target.value)
                                ) {
                                  setTelefonoS(e.target.value);
                                }
                              }}
                              value={telefonoS}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <TextField
                              label="Email"
                              error={validation.spouse_email == null}
                              helperText={
                                validation.spouse_email == null
                                  ? "Rquerido"
                                  : ""
                              }
                              variant="outlined"
                              style={{ width: "100%" }}
                              onChange={(e) => setEmailS(e.target.value)}
                              value={emailS}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Ingresos"
                              variant="outlined"
                              style={{ width: "100%" }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}

                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === "" || re.test(e.target.value)) {
                                  setIncomeS(e.target.value);
                                }
                              }}
                              value={incomeS}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Otros ingresos"
                              variant="outlined"
                              style={{ width: "100%" }}

                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === "" || re.test(e.target.value)) {
                                  setOtherIncomeS(e.target.value);
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                              value={otherIncomeS}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Typography
                              style={{ fontWeight: "bold" }}
                              color="textPrimary"
                            >
                              Egresos:
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Renta"
                              variant="outlined"
                              style={{ width: "100%" }}

                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === "" || re.test(e.target.value)) {
                                  setRentExpensesS(e.target.value);
                                }
                              }}
                              value={rentExpensesS}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Comida"
                              variant="outlined"
                              style={{ width: "100%" }}

                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === "" || re.test(e.target.value)) {
                                  setFoodExpensesS(e.target.value);
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                              value={foodExpensesS}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Ropa"
                              variant="outlined"
                              style={{ width: "100%" }}

                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === "" || re.test(e.target.value)) {
                                  setClothingExpensesS(e.target.value);
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                              value={clothingExpensesS}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Servicios básicos"
                              variant="outlined"
                              style={{ width: "100%" }}

                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === "" || re.test(e.target.value)) {
                                  setBasicExpensesS(e.target.value);
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                              value={basicExpensesS}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Educación"
                              variant="outlined"
                              style={{ width: "100%" }}

                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === "" || re.test(e.target.value)) {
                                  setEducationExpensesS(e.target.value);
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                              value={educationExpensesS}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Transporte"
                              variant="outlined"
                              style={{ width: "100%" }}

                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;

                                if (e.target.value === "" || re.test(e.target.value)) {
                                  setTransporteS(e.target.value);
                                }
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                              value={transporteS}
                            />
                          </Grid>
                          <Grid item md={6} xs={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={dependenciaS}
                                  onChange={() => {
                                    setDependenciaS(!dependenciaS);

                                    if (!dependenciaS == true) {
                                      setRucFilesS(null);
                                      setIvaDeclarationFileS(null);
                                      setAccountMovFileS(null);
                                    } else {
                                      setRolesFileS(null);
                                      setPrecaFileS(null);
                                    }
                                  }}
                                  name="checkedA"
                                  inputProps={{
                                    "aria-label": "secondary checkbox",
                                  }}
                                />
                              }
                              label="¿Posee relación de dependencia?"
                            />
                          </Grid>
                          {
                            otherIncomeS != 0 ?
                              <Grid item md={12} xs={12}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={ivaMensualOS}
                                      onChange={() => {
                                        setIvaMensualOS(!ivaMensualOS);


                                      }}

                                      inputProps={{
                                        "aria-label": "secondary checkbox",
                                      }}
                                    />
                                  }
                                  label="Otros ingresos: ¿Declara IVA mensualmente?"
                                />
                              </Grid>
                              : null
                          }
                          <Grid container item md={12} xs={12}>
                            {dependenciaS == true ? (
                              <div style={{ width: '100%' }}>
                                <TableContainer component={Paper}>
                                  <Table aria-label="simple table" size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="right">Archivo</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow >
                                        <TableCell component="th" scope="row">Cèdula</TableCell>
                                        <TableCell align="right">
                                          {" "}
                                          <div
                                            style={{
                                              marginRight: "5px",

                                            }}
                                          >
                                            <input
                                              accept="image/*"
                                              style={{ display: "none" }}
                                              id="dniFileS"
                                              accept="application/pdf"
                                              type="file"
                                              onChange={(e) => setDniFileS(e.target.files[0])}
                                            />
                                            <label htmlFor="dniFileS">
                                              <Button
                                                variant="contained"
                                                color="primary"
                                                component="span"
                                              >
                                                Subir{" "}
                                                {dniFileS != null
                                                  ? "(" + dniFileS.name + ")"
                                                  : ""}
                                              </Button>
                                            </label>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow style={{ display: 'none' }}>
                                        <TableCell>
                                          3 Últimos Roles de Pago:
                                      </TableCell>
                                        <TableCell align="right">
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "flex-end",
                                            }}
                                          >
                                            <div style={{ marginRight: "5px" }}>
                                              <input
                                                accept="image/*"
                                                style={{
                                                  display: "none",
                                                  marginRight: "5px",
                                                }}
                                                id="rolesFleS"
                                                multiple
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) =>
                                                  setRolesFileS(e.target.files[0])
                                                }
                                              />
                                              <label htmlFor="rolesFleS">
                                                <Button
                                                  variant="contained"
                                                  color="primary"
                                                  component="span"
                                                >
                                                  Subir
                                                {rolesFleS != null
                                                    ? "(" +
                                                    rolesFleS.name.substring(-1, 5) +
                                                    ")"
                                                    : ""}
                                                </Button>
                                              </label>
                                            </div>
                                            <div style={{ marginRight: "5px" }}>
                                              <input
                                                accept="image/*"
                                                style={{
                                                  display: "none",
                                                  marginRight: "5px",
                                                }}
                                                id="rolesFle2S"
                                                multiple
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) =>
                                                  setRolesFile2S(e.target.files[0])
                                                }
                                              />
                                              <label htmlFor="rolesFle2S">
                                                <Button
                                                  variant="contained"
                                                  color="primary"
                                                  component="span"
                                                >
                                                  Subir
                                                {rolesFle2S != null
                                                    ? "(" +
                                                    rolesFle2S.name.substring(-1, 5) +
                                                    ")"
                                                    : ""}
                                                </Button>
                                              </label>
                                            </div>
                                            <div style={{ marginRight: "5px" }}>
                                              <input
                                                accept="image/*"
                                                style={{
                                                  display: "none",
                                                  marginRight: "5px",
                                                }}
                                                id="rolesFle3S"
                                                multiple
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) =>
                                                  setRolesFile3S(e.target.files[0])
                                                }
                                              />
                                              <label htmlFor="rolesFle3S">
                                                <Button
                                                  variant="contained"
                                                  color="primary"
                                                  component="span"
                                                >
                                                  Subir
                                                {rolesFle3S != null
                                                    ? "(" +
                                                    rolesFle3S.name.substring(-1, 5) +
                                                    ")"
                                                    : ""}
                                                </Button>
                                              </label>
                                            </div>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>Mecanizado del IESS</TableCell>
                                        <TableCell align="right">
                                          <div style={{ marginRight: "5px" }}>
                                            <input
                                              accept="image/*"
                                              style={{
                                                display: "none",
                                                marginRight: "5px",
                                              }}
                                              id="mecanizadoS"
                                              multiple
                                              type="file"
                                              accept="application/pdf"
                                              onChange={(e) =>
                                                setMecanizadoS(e.target.files[0])
                                              }
                                            />
                                            <label htmlFor="mecanizadoS">
                                              <Button
                                                variant="contained"
                                                color="primary"
                                                component="span"
                                              >
                                                Subir
                                    {mecanizadoS != null ? mecanizadoS.name : ""}
                                              </Button>
                                            </label>
                                          </div>
                                        </TableCell>
                                      </TableRow>

                                      <TableRow>
                                        <TableCell>Buró de crédito</TableCell>
                                        <TableCell align="right">
                                          <div
                                            style={{ marginRight: "5px", }}
                                          >
                                            <input
                                              accept="image/*"
                                              style={{ display: "none", marginRight: "5px" }}
                                              id="precaFileS"
                                              multiple
                                              type="file"
                                              accept="application/pdf"
                                              onChange={(e) =>
                                                setPrecaFileS(e.target.files[0])
                                              }
                                            />
                                            <label htmlFor="precaFileS">
                                              <Button
                                                variant="contained"
                                                color="primary"
                                                component="span"
                                              >
                                                Subir
                                              {precaFileS != null ? precaFileS.name : ""}
                                              </Button>
                                            </label>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                                {
                                  otherIncomeS != 0 && otherIncomeS != null ?
                                    <TableContainer component={Paper}>
                                      <Table
                                        aria-label="simple table"
                                        size="small"
                                      >
                                        <TableHead>
                                          <TableRow>
                                            <TableCell
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Otros ingresos
                                      </TableCell>
                                            <TableCell
                                              style={{ fontWeight: "bold" }}
                                              align="right"
                                            >
                                              Archivo
                                      </TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          <TableRow>
                                            <TableCell>RUC / RICE</TableCell>

                                            <TableCell align="right">
                                              <div style={{ marginRight: "5px" }}>
                                                <input
                                                  accept="image/*"
                                                  style={{
                                                    display: "none",
                                                    marginRight: "5px",
                                                  }}
                                                  id="rucFilesOS"
                                                  accept="application/pdf"
                                                  type="file"
                                                  onChange={(e) =>
                                                    setRucFilesOS(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                />
                                                <label htmlFor="rucFilesOS">
                                                  <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component="span"
                                                  >
                                                    Subir
                                              {rucFilesOS != null
                                                      ? rucFilesOS.name
                                                      : ""}
                                                  </Button>
                                                </label>
                                              </div>
                                            </TableCell>
                                          </TableRow>

                                          {
                                            ivaMensualOS ?
                                              <TableRow>
                                                <TableCell>Declaración del IVA (6 meses)</TableCell>
                                                <TableCell align="right">
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      justifyContent: "flex-end",
                                                    }}
                                                  >
                                                    <div style={{ marginRight: "5px" }}>
                                                      <input
                                                        accept="image/*"
                                                        style={{
                                                          display: "none",
                                                          marginRight: "5px",
                                                        }}
                                                        id="ivaFileOS"
                                                        accept="application/pdf"
                                                        type="file"
                                                        onChange={(e) =>
                                                          setIvaDeclarationFileOS(e.target.files[0])
                                                        }
                                                      />
                                                      <label htmlFor="ivaFileOS">
                                                        <Button
                                                          variant="contained"
                                                          color="primary"
                                                          component="span"
                                                        >
                                                          Subir
                                      {ivaDeclarationFileOS != null
                                                            ? "(" + ivaDeclarationFileOS.name.substring(0, 4) + '...' + ")"
                                                            : ""}
                                                        </Button>
                                                      </label>
                                                    </div>
                                                    <div style={{ marginRight: "5px" }}>
                                                      <input
                                                        accept="image/*"
                                                        style={{
                                                          display: "none",
                                                          marginRight: "5px",
                                                        }}
                                                        id="ivaFile2OS"
                                                        accept="application/pdf"
                                                        type="file"
                                                        onChange={(e) =>
                                                          setIvaDeclarationFile2OS(e.target.files[0])
                                                        }
                                                      />
                                                      <label htmlFor="ivaFile2OS">
                                                        <Button
                                                          variant="contained"
                                                          color="primary"
                                                          component="span"
                                                        >
                                                          Subir
                                      {ivaDeclarationFile2OS != null
                                                            ? "(" + ivaDeclarationFile2OS.name.substring(0, 4) + '...' + ")"
                                                            : ""}
                                                        </Button>
                                                      </label>
                                                    </div>

                                                    <div style={{ marginRight: "5px" }}>
                                                      <input
                                                        accept="image/*"
                                                        style={{
                                                          display: "none",
                                                          marginRight: "5px",
                                                        }}
                                                        id="ivaFile3OS"
                                                        accept="application/pdf"
                                                        type="file"
                                                        onChange={(e) =>
                                                          setIvaDeclarationFile3OS(e.target.files[0])
                                                        }
                                                      />
                                                      <label htmlFor="ivaFile3OS">
                                                        <Button
                                                          variant="contained"
                                                          color="primary"
                                                          component="span"
                                                        >
                                                          Subir
                                      {ivaDeclarationFile3OS != null
                                                            ? "(" + ivaDeclarationFile3OS.name.substring(0, 4) + '...' + ")"
                                                            : ""}
                                                        </Button>
                                                      </label>
                                                    </div>

                                                    <div style={{ marginRight: "5px" }}>
                                                      <input
                                                        accept="image/*"
                                                        style={{
                                                          display: "none",
                                                          marginRight: "5px",
                                                        }}
                                                        id="ivaFile4OS"
                                                        accept="application/pdf"
                                                        type="file"
                                                        onChange={(e) =>
                                                          setIvaDeclarationFile4OS(e.target.files[0])
                                                        }
                                                      />
                                                      <label htmlFor="ivaFile4OS">
                                                        <Button
                                                          variant="contained"
                                                          color="primary"
                                                          component="span"
                                                        >
                                                          Subir
                                      {ivaDeclarationFile4OS != null
                                                            ? "(" + ivaDeclarationFile4OS.name.substring(0, 4) + '...' + ")"
                                                            : ""}
                                                        </Button>
                                                      </label>
                                                    </div>
                                                    <div style={{ marginRight: "5px" }}>
                                                      <input
                                                        accept="image/*"
                                                        style={{
                                                          display: "none",
                                                          marginRight: "5px",
                                                        }}
                                                        id="ivaFile5OS"
                                                        accept="application/pdf"
                                                        type="file"
                                                        onChange={(e) =>
                                                          setIvaDeclarationFile5OS(e.target.files[0])
                                                        }
                                                      />
                                                      <label htmlFor="ivaFile5OS">
                                                        <Button
                                                          variant="contained"
                                                          color="primary"
                                                          component="span"
                                                        >
                                                          Subir
                                      {ivaDeclarationFile5OS != null
                                                            ? "(" + ivaDeclarationFile5OS.name.substring(0, 4) + '...' + ")"
                                                            : ""}
                                                        </Button>
                                                      </label>
                                                    </div>
                                                    <div style={{ marginRight: "5px" }}>
                                                      <input
                                                        accept="image/*"
                                                        style={{
                                                          display: "none",
                                                          marginRight: "5px",
                                                        }}
                                                        id="ivaFile6OS"
                                                        accept="application/pdf"
                                                        type="file"
                                                        onChange={(e) =>
                                                          setIvaDeclarationFile6OS(e.target.files[0])
                                                        }
                                                      />
                                                      <label htmlFor="ivaFile6OS">
                                                        <Button
                                                          variant="contained"
                                                          color="primary"
                                                          component="span"
                                                        >
                                                          Subir
                                      {ivaDeclarationFile6OS != null
                                                            ? "(" + ivaDeclarationFile6OS.name.substring(0, 4) + '...' + ")"
                                                            : ""}
                                                        </Button>
                                                      </label>
                                                    </div>

                                                  </div>
                                                </TableCell>
                                              </TableRow>

                                              :
                                              <TableRow>
                                                <TableCell>
                                                  Declaración del IVA (6 meses)
                                      </TableCell>
                                                <TableCell align="right">
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      justifyContent: "flex-end",
                                                    }}
                                                  >
                                                    <div
                                                      style={{ marginRight: "5px" }}
                                                    >
                                                      <input
                                                        accept="image/*"
                                                        style={{
                                                          display: "none",
                                                          marginRight: "5px",
                                                        }}
                                                        id="ivaDeclarationFileOS"
                                                        accept="application/pdf"
                                                        type="file"
                                                        onChange={(e) =>
                                                          setIvaDeclarationFileOS(
                                                            e.target.files[0]
                                                          )
                                                        }
                                                      />
                                                      <label htmlFor="ivaDeclarationFileOS">
                                                        <Button
                                                          variant="contained"
                                                          color="primary"
                                                          component="span"
                                                        >
                                                          Subir
                                                {ivaDeclarationFileOS !=
                                                            null
                                                            ? ivaDeclarationFileOS.name
                                                            : ""}
                                                        </Button>
                                                      </label>
                                                    </div>
                                                  </div>
                                                </TableCell>
                                              </TableRow>

                                          }
                                          <TableRow>
                                            <TableCell>
                                              Declaración del impuesto a la renta
                                              (último año)
                                      </TableCell>
                                            <TableCell align="right">
                                              <div style={{ marginRight: "5px" }}>
                                                <input
                                                  accept="image/*"
                                                  style={{
                                                    display: "none",
                                                    marginRight: "5px",
                                                  }}
                                                  id="rentaDeclarationFileOS"
                                                  accept="application/pdf"
                                                  type="file"
                                                  onChange={(e) =>
                                                    setRentaDeclarationFileOS(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                />
                                                <label htmlFor="rentaDeclarationFileOS">
                                                  <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component="span"
                                                  >
                                                    Subir
                                              {rentaDeclarationFileOS !=
                                                      null
                                                      ? rentaDeclarationFileOS.name
                                                      : ""}
                                                  </Button>
                                                </label>
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell>
                                              Movimientos cuenta (3 meses):
                                      </TableCell>
                                            <TableCell align="right">
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "flex-end",
                                                }}
                                              >
                                                <div
                                                  style={{ marginRight: "5px" }}
                                                >
                                                  <input
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    accept="application/pdf"
                                                    type="file"
                                                    id="accounMovFileOS"
                                                    onChange={(e) =>
                                                      setAccountMovFileOS(
                                                        e.target.files[0]
                                                      )
                                                    }
                                                  />
                                                  <label htmlFor="accounMovFileOS">
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component="span"
                                                    >
                                                      Subir
                                                {accounMovFileOS != null
                                                        ? accounMovFileOS.name
                                                        : ""}
                                                    </Button>
                                                  </label>
                                                </div>
                                                <div
                                                  style={{ marginRight: "5px" }}
                                                >
                                                  <input
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    accept="application/pdf"
                                                    type="file"
                                                    id="accounMovFile2OS"
                                                    onChange={(e) =>
                                                      setAccountMovFile2OS(
                                                        e.target.files[0]
                                                      )
                                                    }
                                                  />
                                                  <label htmlFor="accounMovFile2OS">
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component="span"
                                                    >
                                                      Subir
                                                {accounMovFile2OS != null
                                                        ? accounMovFile2OS.name
                                                        : ""}
                                                    </Button>
                                                  </label>
                                                </div>
                                                <div
                                                  style={{ marginRight: "5px" }}
                                                >
                                                  <input
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    accept="application/pdf"
                                                    type="file"
                                                    id="accounMovFile3OS"
                                                    onChange={(e) =>
                                                      setAccountMovFile3OS(
                                                        e.target.files[0]
                                                      )
                                                    }
                                                  />
                                                  <label htmlFor="accounMovFile3OS">
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component="span"
                                                    >
                                                      Subir
                                                {accounMovFile3OS != null
                                                        ? accounMovFile3OS.name
                                                        : ""}
                                                    </Button>
                                                  </label>
                                                </div>
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                    : null

                                }
                              </div>

                            ) : (
                              <div style={{ width: '100%' }}>
                                <Grid item md={6} xs={6}>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={ivaMensualS}
                                        onChange={() => {
                                          setIvaMensualS(!ivaMensualS);

                                        }}
                                        name="checkedAS"
                                        inputProps={{ "aria-label": "secondary checkbox" }}
                                      />
                                    }
                                    label="¿Declara IVA mensualmente?"
                                  />
                                </Grid>

                                <TableContainer component={Paper}>
                                  <Table aria-label="simple table" size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell style={{ fontWeight: "bold" }}>
                                          Nombre
                                   </TableCell>
                                        <TableCell
                                          style={{ fontWeight: "bold" }}
                                          align="right"
                                        >
                                          Archivo
                                   </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell component="th" scope="row">
                                          Cèdula
                                   </TableCell>
                                        <TableCell align="right">
                                          {" "}
                                          <div
                                            style={{
                                              marginRight: "5px",
                                            }}
                                          >
                                            <input
                                              accept="image/*"
                                              style={{ display: "none" }}
                                              id="dniFileS"
                                              accept="application/pdf"
                                              type="file"
                                              onChange={(e) => setDniFileS(e.target.files[0])}
                                            />
                                            <label htmlFor="dniFileS">
                                              <Button
                                                variant="contained"
                                                color="primary"
                                                component="span"
                                              >
                                                Subir{" "}
                                                {dniFileS != null
                                                  ? "(" + dniFileS.name + ")"
                                                  : ""}
                                              </Button>
                                            </label>
                                          </div>
                                        </TableCell>
                                      </TableRow>

                                      <TableRow>
                                        <TableCell>
                                          Buró de crédito
                                   </TableCell>
                                        <TableCell align="right">
                                          <div style={{ marginRight: "5px" }}>
                                            <input
                                              accept="image/*"
                                              style={{ display: "none", marginRight: "5px" }}
                                              id="precaFileS"
                                              multiple
                                              type="file"
                                              accept="application/pdf"
                                              onChange={(e) =>
                                                setPrecaFileS(e.target.files[0])
                                              }
                                            />
                                            <label htmlFor="precaFileS">
                                              <Button
                                                variant="contained"
                                                color="primary"
                                                component="span"
                                              >
                                                Subir
                                           {precaFileS != null ? precaFileS.name : ""}
                                              </Button>
                                            </label>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>
                                          RUC / RICE
                                   </TableCell>
                                        <TableCell align="right">
                                          <div style={{ marginRight: "5px" }}>
                                            <input
                                              accept="image/*"
                                              style={{ display: "none", marginRight: "5px" }}
                                              id="rucFilesS"
                                              accept="application/pdf"
                                              type="file"
                                              onChange={(e) => setRucFilesS(e.target.files[0])}
                                            />
                                            <label htmlFor="rucFilesS">
                                              <Button
                                                variant="contained"
                                                color="primary"
                                                component="span"
                                              >
                                                Subir {rucFilesS != null ? rucFilesS.name : ""}
                                              </Button>
                                            </label>
                                          </div>
                                        </TableCell>
                                      </TableRow>


                                      {
                                        ivaMensualS ?

                                          <TableRow>
                                            <TableCell>
                                              Declaración del IVA (6 meses)
                            </TableCell>
                                            <TableCell align="right">
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "flex-end",
                                                }}
                                              >
                                                <div style={{ marginRight: "5px" }}>
                                                  <input
                                                    accept="image/*"
                                                    style={{
                                                      display: "none",
                                                      marginRight: "5px",
                                                    }}
                                                    id="ivaFileS"
                                                    accept="application/pdf"
                                                    type="file"
                                                    onChange={(e) =>
                                                      setIvaDeclarationFileS(
                                                        e.target.files[0]
                                                      )
                                                    }
                                                  />
                                                  <label htmlFor="ivaFileS">
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component="span"
                                                    >
                                                      Subir
                                      {ivaDeclarationFileS != null
                                                        ? "(" + ivaDeclarationFileS.name.substring(0, 4) + '...' + ")"
                                                        : ""}
                                                    </Button>
                                                  </label>
                                                </div>
                                                <div style={{ marginRight: "5px" }}>
                                                  <input
                                                    accept="image/*"
                                                    style={{
                                                      display: "none",
                                                      marginRight: "5px",
                                                    }}
                                                    id="ivaFile2S"
                                                    accept="application/pdf"
                                                    type="file"
                                                    onChange={(e) =>
                                                      setIvaDeclarationFile2S(
                                                        e.target.files[0]
                                                      )
                                                    }
                                                  />
                                                  <label htmlFor="ivaFile2S">
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component="span"
                                                    >
                                                      Subir
                                      {ivaDeclarationFile2S != null
                                                        ? "(" + ivaDeclarationFile2S.name.substring(0, 4) + '...' + ")"
                                                        : ""}
                                                    </Button>
                                                  </label>
                                                </div>
                                                <div style={{ marginRight: "5px" }}>
                                                  <input
                                                    accept="image/*"
                                                    style={{
                                                      display: "none",
                                                      marginRight: "5px",
                                                    }}
                                                    id="ivaFile3S"
                                                    accept="application/pdf"
                                                    type="file"
                                                    onChange={(e) =>
                                                      setIvaDeclarationFile3S(
                                                        e.target.files[0]
                                                      )
                                                    }
                                                  />
                                                  <label htmlFor="ivaFile3S">
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component="span"
                                                    >
                                                      Subir
                                      {ivaDeclarationFile3S != null
                                                        ? "(" + ivaDeclarationFile3S.name.substring(0, 4) + '...' + ")"
                                                        : ""}
                                                    </Button>
                                                  </label>
                                                </div>
                                                <div style={{ marginRight: "5px" }}>
                                                  <input
                                                    accept="image/*"
                                                    style={{
                                                      display: "none",
                                                      marginRight: "5px",
                                                    }}
                                                    id="ivaFile4S"
                                                    accept="application/pdf"
                                                    type="file"
                                                    onChange={(e) =>
                                                      setIvaDeclarationFile4S(
                                                        e.target.files[0]
                                                      )
                                                    }
                                                  />
                                                  <label htmlFor="ivaFile4S">
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component="span"
                                                    >
                                                      Subir
                                      {ivaDeclarationFile4S != null
                                                        ? "(" + ivaDeclarationFile4S.name.substring(0, 4) + '...' + ")"
                                                        : ""}
                                                    </Button>
                                                  </label>
                                                </div>
                                                <div style={{ marginRight: "5px" }}>
                                                  <input
                                                    accept="image/*"
                                                    style={{
                                                      display: "none",
                                                      marginRight: "5px",
                                                    }}
                                                    id="ivaFile5S"
                                                    accept="application/pdf"
                                                    type="file"
                                                    onChange={(e) =>
                                                      setIvaDeclarationFile5S(
                                                        e.target.files[0]
                                                      )
                                                    }
                                                  />
                                                  <label htmlFor="ivaFile5S">
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component="span"
                                                    >
                                                      Subir
                                      {ivaDeclarationFile5S != null
                                                        ? "(" + ivaDeclarationFile5S.name.substring(0, 4) + '...' + ")"
                                                        : ""}
                                                    </Button>
                                                  </label>
                                                </div>
                                                <div style={{ marginRight: "5px" }}>
                                                  <input
                                                    accept="image/*"
                                                    style={{
                                                      display: "none",
                                                      marginRight: "5px",
                                                    }}
                                                    id="ivaFile6S"
                                                    accept="application/pdf"
                                                    type="file"
                                                    onChange={(e) =>
                                                      setIvaDeclarationFile6S(
                                                        e.target.files[0]
                                                      )
                                                    }
                                                  />
                                                  <label htmlFor="ivaFile6S">
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component="span"
                                                    >
                                                      Subir
                                      {ivaDeclarationFile6S != null
                                                        ? "(" + ivaDeclarationFile6S.name.substring(0, 4) + '...' + ")"
                                                        : ""}
                                                    </Button>
                                                  </label>
                                                </div>
                                              </div>
                                            </TableCell>
                                          </TableRow>


                                          :

                                          <TableRow>
                                            <TableCell>Declaración del IVA (6 meses)</TableCell>
                                            <TableCell align="right">
                                              <div
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "flex-end",
                                                }}
                                              >
                                                <div style={{ marginRight: "5px" }}>
                                                  <input
                                                    accept="image/*"
                                                    style={{
                                                      display: "none",
                                                      marginRight: "5px",
                                                    }}
                                                    id="ivaFileS"
                                                    accept="application/pdf"
                                                    type="file"
                                                    onChange={(e) =>
                                                      setIvaDeclarationFileS(e.target.files[0])
                                                    }
                                                  />
                                                  <label htmlFor="ivaFileS">
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      component="span"
                                                    >
                                                      Subir
                                      {ivaDeclarationFileS != null
                                                        ? ivaDeclarationFileS.name
                                                        : ""}
                                                    </Button>
                                                  </label>
                                                </div>
                                              </div>
                                            </TableCell>
                                          </TableRow>

                                      }

                                      <TableRow>
                                        <TableCell>
                                          Declaración del impuesto a la renta (último año)
                                   </TableCell>
                                        <TableCell align="right">
                                          <div style={{ marginRight: "5px" }}>
                                            <input
                                              accept="image/*"
                                              style={{ display: "none", marginRight: "5px" }}
                                              id="ivaDeclarationFileS"
                                              accept="application/pdf"
                                              type="file"
                                              onChange={(e) =>
                                                setRentaDeclarationFileS(e.target.files[0])
                                              }
                                            />
                                            <label htmlFor="ivaDeclarationFileS">
                                              <Button
                                                variant="contained"
                                                color="primary"
                                                component="span"
                                              >
                                                Subir
                                         {rentaDeclarationFileS != null
                                                  ? rentaDeclarationFileS.name
                                                  : ""}
                                              </Button>
                                            </label>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>

                                          Movimientos cuenta (3 meses):
                                     </TableCell>
                                        <TableCell align="right">
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "flex-end",
                                            }}
                                          >
                                            <div style={{ marginRight: "5px" }}>
                                              <input
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                id="accounMovFileS"
                                                accept="application/pdf"
                                                type="file"
                                                multiple
                                                onChange={(e) => setAccountMovFileS(e.target.files[0])}
                                              />
                                              <label htmlFor="accounMovFileS">
                                                <Button
                                                  variant="contained"
                                                  color="primary"
                                                  component="span"
                                                >
                                                  Subir{" "}
                                                  {accounMovFileS != null ? accounMovFileS.name : ""}
                                                </Button>
                                              </label>
                                            </div>
                                            <div style={{ marginRight: "5px" }}>
                                              <input
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                id="accounMovFile2S"
                                                accept="application/pdf"
                                                type="file"
                                                multiple
                                                onChange={(e) => setAccountMovFile2S(e.target.files[0])}
                                              />
                                              <label htmlFor="accounMovFile2S">
                                                <Button
                                                  variant="contained"
                                                  color="primary"
                                                  component="span"
                                                >
                                                  Subir{" "}
                                                  {accounMovFile2S != null ? accounMovFile2S.name : ""}
                                                </Button>
                                              </label>
                                            </div>
                                            <div style={{ marginRight: "5px" }}>
                                              <input
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                id="accounMovFile3S"
                                                accept="application/pdf"
                                                type="file"
                                                multiple
                                                onChange={(e) => setAccountMovFile3S(e.target.files[0])}
                                              />
                                              <label htmlFor="accounMovFile3S">
                                                <Button
                                                  variant="contained"
                                                  color="primary"
                                                  component="span"
                                                >
                                                  Subir{" "}
                                                  {accounMovFile3S != null ? accounMovFile3S.name : ""}
                                                </Button>
                                              </label>
                                            </div>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </TableContainer>

                              </div>
                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ) : null}
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Button
            startIcon={<SaveOutlinedIcon />}
            variant="contained"
            color="secondary"
            onClick={() => confirmar()}
          >
            Guardar
          </Button>
          <Button startIcon={<DeleteOutlineIcon />} variant="contained" color="default" onClick={() => vaciar()}>
            Limpiar
                    </Button>
          <Button startIcon={<ClearIcon />} variant="contained" color="default" onClick={() => atras()}>
            Cancelar
                    </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
