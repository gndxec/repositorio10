import React, { useState, useRef } from 'react'
import {
    Box, Grid, Button, MenuItem, Select,
    FormLabel, FormGroup, FormControlLabel, Checkbox, InputLabel, FormControl,
    FormHelperText, Autocomplete, TextField, IconButton, Divider
} from '@mui/material'
import InputValidation from './utils/InputValidations'
import { db, firebase } from '../db/firebase'
import recreate_titulo from '../assets/svg/recreate_letra.svg'
import Alert from '@mui/material/Alert';


import CloseIcon from '@mui/icons-material/Close';

export const Form = () => {
    const captchaRef = useRef(null)
    //

    const [colegio, setColegio] = useState({ campo: '', valido: true })
    const [nombres, setNombres] = useState({ campo: '', valido: true })

    const [correo, setCorreo] = useState({ campo: '', valido: true })
    const [telefono, setTelefono] = useState({ campo: '', valido: true })
    //
    const [captcha, setCaptcha] = useState(false)
    const [message, setMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    //
    const [desafio, setDesafio] = useState('')
    //
    const [dTec, setDtec] = useState(false)
    const [dSeg, setDseg] = useState(false)
    const [dEmp, setDemp] = useState(false)
    //
    const [desafioTec, setDesafioTec] = useState('')
    const [desafioSeg, setDesafioSeg] = useState('')
    const [desafioEmp, setDesafioEmp] = useState('')
    const [correoD, setCorreoD] = useState({ campo: '', valido: true })
    const [docente, setDocente] = useState({ campo: '', valido: true })
    //
    const [inputFields, setInputFields] = useState([
        {
            fullName: '',
            correo: ''
        },
        {
            fullName: '',
            correo: ''
        },
        {
            fullName: '',
            correo: ''
        }
    ]);
    //
    const onChange = (value) => {
        captchaRef.current = value
        if (captchaRef) {
            setCaptcha(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        //


        inputFields.forEach(function(obj, index) {
            obj['fullName'+index] = obj.fullName;
            obj['correo'+index] = obj.correo;
            delete obj.fullName;
            delete obj.correo;
          });
   

        //if (captcha) {
        setLoading(true)
        const data = {
            ...inputFields,
            colegio: colegio.campo,

            dTec: dTec ? 'SI' : 'NO',
            dSeg: dSeg ? 'SI' : 'NO',
            dEmp: dEmp ? 'SI' : 'NO',
            desafioTecnologico: desafioTec ? desafioTec : 'NO PARTICIPA',
            desafioSeguridad: desafioSeg ? desafioSeg : 'NO PARTICIPA',
            desafioEmprendimiento: desafioEmp ? desafioEmp : 'NO PARTICIPA',
            nombres: nombres.campo,
            correo: correo.campo,
            docente: docente.campo,
            correoDocente: correoD.campo,
            telefono: telefono.campo,
            created: firebase.firestore.FieldValue.serverTimestamp()
        }
        console.log(data)
        db.collection("usuarios").add(data)
            .then((docRef) => {
                setLoading(false)
                setMessage(true)
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                setLoading(false)
                alert("No se envio el formulario, comuniquese con soporte", error);
            });
        //} else {
        //    alert("Porfavor, acepte el captcha para enviar el formulario.");
        //}
    }

    const addInputField = () => {
        setInputFields([...inputFields, {
            fullName: '',
        }])
    }
    const removeInputFields = (index) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    }
    const handleChange = (index, evnt) => {
        if (evnt.target) {
            const { name, value } = evnt.target;
            const list = [...inputFields];
            list[index][name] = value;
            setInputFields(list);
        } else {
            const list = [...inputFields];
            list[index]['fullName'] = evnt;
            setInputFields(list);
        }


        // inputFields.forEach(function (part, index) {

        //     inputFields[part] = inputFields[part] + index;
        // }, inputFields);

        // const arr = [{"fullName":"5","correo":"Immidiate"},
        // {"fullName":"4","correo":"30 days"},
        // {"fullName":"3","correo":"21 days"},
        // {"fullName":"2","correo":"14 days"},
        // {"fullName":"1","correo":"7 days"},
        // {"fullName":"6","correo":"Custom"}];

        // arr.forEach(function(obj, index) {
        //     obj['fullName'+index] = obj.fullName;
        //     obj['correo'+index] = obj.correo;
        //     delete obj.fullName;
        //     delete obj.correo;
        //   });
        //   console.log(arr)

        //const resultArray = arr.map((item, index) => ({ "correo": item.id, "data": item.name}));

        // console.log(resultArray);

        // // console.log(resultArray)
        //    var a = inputFields.map((item, index) => {
        //     var correo = `correo${index}`;
        //     var fullName = `fullName${index}`;
        //     return { correo: item.correo, fullName: item.fullName}
        //    });

        //     console.log('hola',a);


      
        // var i;
        // for (i = 0; i < inputFields.length; i++) {
        //     inputFields[i].stroke = inputFields[i]['key1'];
        //     delete inputFields[i].key1;
        // }

  


    }
    return (
        <Box >
            {!message ?
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <img alt='recreate 2022' width='100%' src={recreate_titulo} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputValidation
                                estado={colegio}
                                cambiarEstado={setColegio}
                                label="Nombre del colegio*"
                                name="nombres"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box pb={2}>
                                <FormControl component="fieldset" variant="standard">
                                    <FormLabel component="legend">Selecciona el desafío en que participarás</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={dTec}
                                                    onChange={(e) => setDtec(e.target.checked)}
                                                    name="jason"
                                                />
                                            }
                                            label="Desafios tecnologicos"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={dSeg}
                                                    onChange={(e) => setDseg(e.target.checked)}
                                                    name="jason"
                                                />
                                            }
                                            label="Desafios de seguridad y sostenibilidad ambiental"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={dEmp}
                                                    onChange={(e) => setDemp(e.target.checked)}
                                                    name="jason"
                                                />
                                            }
                                            label="Desafios de emprendimiento   "
                                        />
                                    </FormGroup>
                                    <FormHelperText>Puede seleccionar varios</FormHelperText>
                                </FormControl>

                                {/* <FormControl fullWidth>
                                    <InputLabel id="l1">Selecciona el desafío en que participarás</InputLabel>
                                    <Select
                                        labelId="l1"
                                        id="l1"
                                        fullWidth
                                        value={desafio}
                                        label="Selecciona el desafío en que participarás"
                                        onChange={(e) => setDesafio(e.target.value)}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        <MenuItem value="Desafíos Tecnológicos">Desafíos Tecnológicos</MenuItem>
                                        <MenuItem value="Desafíos de seguridad y sostenibilidad ambiental">Desafíos de seguridad y sostenibilidad ambiental</MenuItem>
                                        <MenuItem value="Desafíos de emprendimientos">Desafíos de emprendimientos</MenuItem>
                                    </Select>
                                </FormControl> */}
                            </Box>

                        </Grid>
                        {
                            dTec === true &&
                            <Grid item xs={12}>
                                <Box pb={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="l1">Selecciona en que desafío tecnológico  participarás</InputLabel>
                                        <Select
                                            labelId="l1"
                                            id="l1"
                                            fullWidth
                                            value={desafioTec}
                                            label="Selecciona en que desafío tecnológico  participarás"
                                            onChange={(e) => setDesafioTec(e.target.value)}
                                        >
                                            <MenuItem value=""></MenuItem>
                                            <MenuItem value="Optimización de Energías Renovables">Optimización de Energías Renovables</MenuItem>
                                            <MenuItem value="Carrera de Robots Insecto">Carrera de Robots Insecto</MenuItem>
                                            <MenuItem value="Diseño óptimo de redes LAN/WLAN">Diseño óptimo de redes LAN/WLAN</MenuItem>
                                            <MenuItem value="Control de motores de forma inalámbrica">Control de motores de forma inalámbrica</MenuItem>
                                            <MenuItem value="Diseños prototipos Automotrices">Diseños prototipos Automotrices</MenuItem>
                                            <MenuItem value="Desarrollo de APPs">Desarrollo de APPs</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        }
                        {
                            dSeg === true &&
                            <Grid item xs={12}>
                                <Box pb={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="l1">Selecciona en que desafío de seguridad y sostenibilidad ambiental participarás</InputLabel>
                                        <Select
                                            labelId="l1"
                                            id="l1"
                                            fullWidth
                                            value={desafioSeg}
                                            label="Selecciona en que desafío de seguridad y sostenibilidad ambiental participarás"
                                            onChange={(e) => setDesafioSeg(e.target.value)}
                                        >
                                            <MenuItem value=""></MenuItem>
                                            <MenuItem value="Creando un ambiente seguro y sin accidentes">Creando un ambiente seguro y sin accidentes</MenuItem>
                                            <MenuItem value="BPA logrando un colegio verde">BPA logrando un colegio verde</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        }
                        {
                            dEmp === true &&
                            <Grid item xs={12}>
                                <Box pb={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="l1">Selecciona en que desafío emprendimiento</InputLabel>
                                        <Select
                                            labelId="l1"
                                            id="l1"
                                            fullWidth
                                            value={desafioEmp}
                                            label="Selecciona en que desafío emprendimiento"
                                            onChange={(e) => setDesafioEmp(e.target.value)}
                                        >
                                            <MenuItem value=""></MenuItem>
                                            <MenuItem value="Registros contables iniciales de un nuevo negocio">Registros contables iniciales de un nuevo negocio</MenuItem>
                                            <MenuItem value="Diseño de un Plan de Negocios para el microemprendimiento">Diseño de un Plan de Negocios para el microemprendimiento</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        }
                        <Grid item xs={12}>

                            <FormHelperText>Mínio 3, máximo 5 estudiantes</FormHelperText>
                            {
                                inputFields.map((data, index) => {
                                    const { correo, cedula } = data;
                                    return (
                                        <Box py={3} key={index}>
                                            <Box display='flex' >
                                                <Box pb={1} flexGrow={1}>
                                                    <Box pb={2}>
                                                        <TextField
                                                            name={"fullName"}
                                                            fullWidth
                                                            onChange={(e) => handleChange(index, e)}
                                                            value={cedula}
                                                            label={`Nombres del estudiante #${index + 1}`}
                                                        />
                                                    </Box>
                                                    <Box pb={2}>
                                                        <TextField
                                                            name="correo"
                                                            onChange={(e) => handleChange(index, e)}
                                                            value={correo}
                                                            fullWidth
                                                            label={`Correo electrónico del estudiante #${index + 1}`}
                                                        />
                                                    </Box>

                                                </Box>
                                                <Box pl={1}>
                                                    {(inputFields[3] === inputFields[index] || inputFields[4] === inputFields[index]) ?
                                                        <IconButton onClick={removeInputFields}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                        : ''}
                                                </Box>

                                            </Box>
                                            <Divider />
                                        </Box>

                                    )
                                })
                            }
                            {
                                inputFields.length < 5 &&
                                <Box pb={5}>
                                    <Button variant='outlined' fullWidth onClick={addInputField}>Agregar estudiante</Button>
                                </Box>
                            }


                        </Grid>

                        <Grid item xs={12}>
                            <InputValidation
                                estado={docente}
                                cambiarEstado={setDocente}
                                label="Docente tutor de la institución educativa*"
                                name="nombres"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputValidation
                                estado={correoD}
                                cambiarEstado={setCorreoD}
                                label="Correo electrónico del docente tutor de la institución*"
                                name="nombres"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputValidation
                                estado={telefono}
                                cambiarEstado={setTelefono}
                                label="Número de teléfono del docente tutor*"
                                name="nombres"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <ReCAPTCHA
                                sitekey="6LejvAQhAAAAAMF1hL5TlFjervd8E0z_YBiMrKk_"
                                onChange={onChange}
                            /> */}
                        </Grid>

                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="Quiero recibir inspiración, promociones de marketing y actualizaciones por correo electrónico." />
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={
                            loading ||
                            // || !nombres.campo || nombres.valido === false ||
                            // !desafio || 
                            // !correo.campo || correo.valido === false ||
                            // !telefono.campo || telefono.valido === false ||
                            !docente.campo || docente.valido === false ||
                            !telefono.campo || telefono.valido === false ||
                            !correoD.campo || correoD.valido === false ||
                            !colegio.campo || colegio.valido === false

                        }
                    >
                        REGISTRATE EN RECRÉATE SCHOOL
                    </Button>
                </Box>
                :
                <>
                    <img alt='recreate 2022' width='100%' src={recreate_titulo} />
                    <Alert variant="filled" severity="success">¡Te has registrado con éxito a “Recréate School 2022”!</Alert>

                </>
            }
        </Box>)
}