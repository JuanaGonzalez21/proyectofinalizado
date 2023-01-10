import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Table } from 'reactstrap';
import Api from "../../servidor/api"
import moment from 'moment';
import ReactHtmlTableToExcel from 'react-html-table-to-excel'


const TableExport = () => {

    const URI = Api
    const [ordenes, setOrden] = useState([]);

    useEffect(() => {
        getOrdenes()
    }, [])
    //obtener datos de la base de datos
    const getOrdenes = async () => {
        const res = await axios.get(URI + "/asc")
        const result = res.data instanceof Array ? res.data : []
        setOrden(result)
        return;
    }

    const transformar = (idfecha) => {
        const fecha = moment.utc(idfecha).format('DD/MM/YYYY')
        return fecha;
    }
    return (
        <>
            <ReactHtmlTableToExcel
                id="buttonexportexcel"
                className='btn btn-primary'
                table="tableordenesalida"
                filename="ordenes_salida"
                sheet="pagina 1"
                buttonText="Exportar a excel"
            />
            <div style={{ display: 'none' }}>
                <Table striped id="tableordenesalida">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ticket Raiz</th>
                            <th>Ticket Envio</th>
                            <th>Fecha de salida</th>
                            <th>Entregado a</th>
                            <th>Agente que envia</th>
                            <th>consecutivo</th>
                            <th>n_consecutivo</th>
                            <th>Clase de equipo</th>
                            <th>MARCA</th>
                            <th>MODELO</th>
                            <th>SERIAL</th>
                            <th>PLACA</th>
                            <th>DESTINO</th>
                            <th>N CONTACTO</th>
                            <th>N GUIA</th>
                            <th>FECHA ENVIO</th>
                            <th>AREA QUE ENVIA</th>
                        </tr>
                    </thead>
                    <tbody>

                        {ordenes.map((orde) => (
                            <tr key={orde.id} className='table__medides'>
                                <td> {orde.id} </td>
                                <td> {orde.ticket_problema} </td>
                                <td> {orde.ticket_envio} </td>
                                <td> {transformar(orde.fecha_salida)}  </td>
                                <td> {orde.usuario_orden} </td>
                                <td> {orde.agente_envia} </td>
                                <td> {orde.consecutivo} </td>
                                <td> {orde.n_consecutivo} </td>
                                <td> {orde.equipo} </td>
                                <td> {orde.marca} </td>
                                <td> {orde.modelo} </td>
                                <td> {orde.serial} </td>
                                <td> {orde.placa} </td>
                                <td> {orde.destino} </td>
                                <td> {orde.n_contacto} </td>
                                <td> {orde.n_guia} </td>
                                <td> {transformar(orde.fecha_llegada_correspondencia)} </td>
                                <td> {orde.area_envia} </td>


                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableExport