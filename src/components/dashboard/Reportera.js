import React, { useEffect, useState } from 'react'
import {  Box, Typography, Button } from '@mui/material'
import { db, auth } from '../../db/firebase'
import { DataGrid, GridToolbarExportContainer, GridToolbarContainer, GridCsvExportMenuItem } from '@mui/x-data-grid';
export const Reporteria = () => {
    const [data, setData] = useState('')
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        db.collection("usuarios").get().then((querySnapshot) => {
            const data = querySnapshot.docs.map(item => { return { ...item.data(), id: item.id } })
            setData(data)
            //console.log(data)
        });
    }
    const columns = [
        {
            field: 'created', headerName: 'INSCRIPCION', type: 'dateTime', width: 200,
            valueGetter: ({ value }) => value && value.toDate(),
        },
        { field: 'colegio', headerName: 'NOMBRE COLEGIO', width: 300 },
        { field: 'dTec', headerName: 'DESAFIO TECNOLOGICO', width: 200 },
        { field: 'dSeg', headerName: 'DESAFIO AMBIENTAL', width: 200 },
        { field: 'dEmp', headerName: 'DESAFIO EMPRENDIMIENTO', width: 200 },

        { field: 'docente', headerName: 'DOCENTE TUTOR', width: 200 },
        { field: 'correoDocente', headerName: 'CORREO DOCENTE', width: 200 },
        { field: 'telefono', headerName: 'TELEFONO', width: 200 },
        {
            field: 'correo0', headerName: 'Correo#1', width: 200,
            renderCell: (params) => {
                return params.row[0].correo0 === undefined ?    '' : params.row[0].correo0
            }
        },
        {
            field: 'fullName0', headerName: 'Nombre#1', width: 200,
            renderCell: (params) => {
                return params.row[0].fullName0 === undefined ?    '' : params.row[0].fullName0
            }
        }, {
            field: 'correo1', headerName: 'Correo#2', width: 200,
            renderCell: (params) => {
                return params.row[1].correo1 === undefined ?   '' : params.row[1].correo1
            }
        },
        {
            field: 'fullName1', headerName: 'Nombre#2', width: 200,
            renderCell: (params) => {
                return params.row[1].fullName1 === undefined ?    '' : params.row[1].fullName1
            }
        }, {
            field: 'correo2', headerName: 'Correo#3', width: 200,
            renderCell: (params) => {
                return params.row[2].correo2 === undefined ?   '' : params.row[2].correo2
            }
        },
        {
            field: 'fullName2', headerName: 'Nombre#3', width: 200,
            renderCell: (params) => {
                return params.row[2].fullName2 === undefined ?  '' : params.row[2].fullName2
            }
        }, {
            field: 'correo3', headerName: 'Correo#4', width: 200,
            renderCell: (params) => {
                return params.row[3] === undefined ? '' : params.row[3].correo3
            }
        },
        {
            field: 'fullName3', headerName: 'Nombre#4', width: 200,
            renderCell: (params) => {
                return params.row[3] === undefined ? '' : params.row[3].fullName3
            }
        }, {
            field: 'correo4', headerName: 'Correo#5', width: 200,
            renderCell: (params) => {
                return params.row[4] === undefined ?   '' : params.row[4].correo4
            }
        },
        {
            field: 'fullName4', headerName: 'Nombre#5', width: 200,
            renderCell: (params) => {
                return params.row[4] === undefined ? '' : params.row[4].fullName4
            }
        }
    ];
    const csvOptions = { delimiter: ';' };
    const CustomExportButton = (props) => (
        <GridToolbarExportContainer {...props}>
            <GridCsvExportMenuItem options={csvOptions} />
        </GridToolbarExportContainer>
    );
    const CustomToolbar = (props) => (
        <GridToolbarContainer {...props}>
            <CustomExportButton />
        </GridToolbarContainer>
    );
    const logout = () => (

        auth.signOut()
    )
    return (

        <Box px={2} sx={{ 
            height: 600, width: '100%', fontFamily: 'default'
            }}>
            <Box py={2}

                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',

                }}
            >
                <Typography>REPORTERIA</Typography>
                <Button color='error' onClick={() => logout()}>CERRAR SESION</Button>
            </Box>

            {data &&
                <DataGrid
                    rows={data}
                    columns={columns}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />}
        </Box>

    )
}