import React from 'react'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Api from "../../servidor/api"
import { Table, ToastHeader, Toast, ToastBody, Pagination } from 'reactstrap';
import './Doc.css'
import { useReactToPrint } from 'react-to-print'
import moment from 'moment';
import TableExport from '../tabletoexport/TableExport'
import imgLog from '../assets/ah2c3-hrna4.001.jpeg'
import imgLin from '../assets/ah2c3-hrna4.002.png'

const URI = Api

const Showdb = () => {

  //Datos de impresion

  const [ticket_problema, setTicket_problema] = useState('');
  const [ticket_envio, setTicket_envio] = useState('');
  const [fecha_llegada_correspondencia, setFecha_llegada_correspondencia] = useState('');
  const [n_guia, setN_guia] = useState('');
  const [fecha_salida, setFecha_salida] = useState('');
  const [destino, setDestino] = useState('');
  const [usuario_orden, setUsuario_orden] = useState('');
  const [n_contacto, setN_contacto] = useState('');
  const [agente_envia, setAgente_envia] = useState('');
  const [consecutivo, setConsecutivo] = useState('');
  const [n_consecutivo, setN_consecutivo] = useState('');
  const [area_envia, setArea_envia] = useState('');
  const [equipo, setEquipo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [serial, setSerial] = useState('');
  const [placa, setPlaca] = useState('');


  //Funcion de impresion
  const componentRef = useRef()


  const FuncionPrint = async(id) => {
      const res =await axios.get(Api+id)
      setTicket_envio(res.data.ticket_envio)
      setTicket_problema(res.data.ticket_problema)
      setFecha_llegada_correspondencia(res.data.fecha_llegada_correspondencia)
      setN_guia(res.data.n_guia)
      setFecha_salida(res.data.fecha_salida)
      setDestino(res.data.destino)
      setUsuario_orden(res.data.usuario_orden)
      setN_contacto(res.data.n_contacto)
      setAgente_envia(res.data.agente_envia)
      setConsecutivo(res.data.consecutivo)
      setN_consecutivo(res.data.n_consecutivo)
      setArea_envia(res.data.area_envia)
      setEquipo(res.data.equipo)
      setMarca(res.data.marca)
      setModelo(res.data.modelo)
      setSerial(res.data.serial)
      setPlaca(res.data.placa)
    handlePrint();
    mostrar();
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'orden-salida'
  })

  const mostrar = () => {
    document.getElementById('documento').style.display = 'block'
  }

  //Variables 
  const [ordenes, setOrden] = useState([]);
  useEffect(() => {
    getOrdenes()
  }, [])


  //obtener datos de la base de datos
  const getOrdenes = async () => {
    const res = await axios.get(URI)
    const result = res.data instanceof Array ? res.data : []
    setOrden(result)
    return;
  }

  //Cambiar formato de fecha ISO a día/mes/año
  const transformar = (idfecha) => {
    const fecha = moment.utc(idfecha).format('DD/MM/YYYY')
    return fecha;
  }

  //Eliminar datos de la base de datos

  const deleteOrden = async (id) => {
    await axios.delete(`${URI}${id}`)
    getOrdenes()
  }

  //Vista del componente
  return (
    <>

      <div className=" container__form">
        <Toast className='width__listado'> <div className="p-3  rounded">
          <ToastHeader className='center__title'>
            <h3>Listado Registro de Salidas</h3>
          </ToastHeader>
          <ToastBody >
            <Table >
              <thead className='table__medides'>
                <tr className='table__medides'>

                  <th>N. Consecutivo</th>
                  <th>Entregado a</th>
                  <th>Enviado por</th>
                  <th>Fecha</th>
                  <th className='ultimo__espacio'>Action</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map((orde) => (
                  <tr key={orde.id} className='table__medides'>
                    <td> {orde.n_consecutivo} </td>
                    <td> {orde.usuario_orden} </td>
                    <td> {orde.agente_envia} </td>
                    <td> {transformar(orde.fecha_salida)} </td>

                    <td>
                      <Link to={`/editar/${orde.id}`} className='btn btn-info'><i className="fa-solid fa-file-pen"></i></Link>
                      <button onClick={() => deleteOrden(orde.id)} className='btn btn-danger'><i className="fa-sharp fa-solid fa-trash"></i></button>
                      <button className='btn btn-primary' onClick={() => FuncionPrint(orde.id)}><i className="fa-solid fa-print"></i></button></td>

                    <td>
                    <div id="documento" >
                      <div style={{ display: 'none' }}>
                        <div ref={componentRef} className='document'>
                          <p className="p__uno"></p>
                          <p className="p__uno"></p>
                          <table >
                            <tbody><tr style={{ height: '32.3pt' }}>
                              <td rowSpan={2} style={{ width: '17.08%', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p className="p__dos"><span style={{ height: '0pt', display: 'block', position: 'absolute', zIndex: 0 }}><img src={imgLog} width="75pt" height="60" alt="" style={{ marginTop: '5.75pt', marginLeft: '7.3pt', AwLeftPos: '7.3pt', AwRelHpos: 'column', AwRelVpos: 'paragraph', AwTopPos: '5.75pt', AwWrapType: 'none', position: 'absolute' }} /></span><span >&nbsp;</span></p>
                              </td>
                              <td style={{ width: '45.24%', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p className="p__dos"><span >&nbsp;</span></p>
                                <p className="p__dos"><span >BOGOTA</span></p>
                              </td>
                              <td style={{ width: '37.68%', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'right', fontSize: '10pt' }}><span >Anexo Norma Nᵃ 088-89 </span></p>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'right', fontSize: '10pt' }}><span >Forma 25-08 89</span></p>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'right', fontSize: '10pt' }}><span >Consecutivo </span>
                                  <span >{n_consecutivo}</span>
                                </p>
                              </td>
                            </tr>
                              <tr style={{ height: '20.7pt' }}>
                                <td colSpan={2} style={{ borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '10pt' }}><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>ORDEN DE SALID</span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>A </span></p>
                                </td>
                              </tr>
                            </tbody></table>
                          <p className="p__dos"><a name="_Hlk47000084"><span >&nbsp;</span></a></p>
                          <p className="p_dos"><a name="_Hlk89329548"><span >Fecha: </span><span > {transformar(fecha_salida)}</span></a></p>
                          <p className="p__dos"><span >&nbsp;</span></p>
                          <p className="p__dos"><a name="_Hlk87338091" /><a name="_Hlk87604585"><span style={{ AwBookmarkEnd: '_Hlk47000084' }} /><span style={{ AwBookmarkEnd: '_Hlk89329548' }} /><span >El portador
                            de la presente: {agente_envia} </span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}>
                            </span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}>
                            </span><span > Identificado</span><span > con la C.C. No</span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}> </span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}>1</span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}>.</span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}>014</span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}>.</span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}>295</span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}>.</span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}>012</span><span style={{ fontFamily: '"Times New Roman"', textDecoration: 'underline' }}>.</span><span > </span><span >Realiza
                              entrega en </span><span >las dependencias de Caracol PISO7 los elementos relacionados a continuación:</span></a></p>
                          <p style={{ marginTop: '0pt', marginBottom: '10pt', lineHeight: '115%', fontSize: '11pt' }}><a name="_Hlk113271667" /><a name="_Hlk108177278" /><a name="_Hlk108086898"><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}>Recibe: </span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt' }}>{usuario_orden}</span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt' }}>,</span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt' }}> </span></a><a name="_Hlk89329621" /><a name="_Hlk88044633" /><a name="_Hlk90460178" /><a name="_Hlk92361505" /><a name="_Hlk94609246"><span style={{ AwBookmarkEnd: '_Hlk87338091' }} /><span style={{ AwBookmarkEnd: '_Hlk87604585' }} /><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}>Destino</span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}> </span>{destino}<span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}> </span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}>Contacto:</span><span style={{ fontFamily: 'Calibri' }}> {n_contacto}</span> </a></p>
                          <table cellSpacing={0} cellPadding={0} style={{ width: '537.85pt', borderCollapse: 'collapse' }}>
                            <tbody><tr style={{ height: '15.5pt' }}>
                              <td style={{ width: '75.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ AwBookmarkEnd: '_Hlk113271667' }} /><span style={{ AwBookmarkEnd: '_Hlk89329621' }} /><span style={{ AwBookmarkEnd: '_Hlk88044633' }} /><span style={{ fontFamily: 'Calibri', fontWeight: 'bold' }}>EQUIPO</span></p>
                              </td>
                              <td style={{ width: '49.2pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri', fontWeight: 'bold' }}>MARCA</span></p>
                              </td>
                              <td style={{ width: '152.25pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri', fontWeight: 'bold' }}>MODELO</span></p>
                              </td>
                              <td style={{ width: '85pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri', fontWeight: 'bold' }}>SERIAL</span></p>
                              </td>
                              <td style={{ width: '121.1pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri', fontWeight: 'bold' }}>PLACA INV</span></p>
                              </td>
                            </tr>
                              <tr style={{ height: '16.3pt' }}>
                                <td style={{ width: '75.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}>{equipo}</span></p>
                                </td>
                                <td style={{ width: '49.2pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}>{marca}</span></p>
                                </td>
                                <td style={{ width: '152.25pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}> {modelo} </span></p>
                                </td>
                                <td style={{ width: '85pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}>{serial}</span></p>
                                </td>
                                <td style={{ width: '121.1pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}>{placa}</span></p>
                                </td>
                              </tr>

                              <tr style={{ height: '15.5pt' }}>
                                <td colSpan={5} style={{ width: '526.3pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}>Para evitar adiciones no autorizadas, trazar </span><span style={{ fontFamily: 'Calibri' }}>xxxx</span><span style={{ fontFamily: 'Calibri' }}> o rayas al
                                    finalizar la relación</span></p>
                                </td>
                              </tr>
                            </tbody></table>
                          <p className="p__uno"><span >&nbsp;</span><span >&nbsp; </span><span style={{ AwBookmarkEnd: '_Hlk90460178' }} /><span > </span><span >&nbsp;</span><span > </span></p>
                          <p className="p__uno"><span style={{ AwBookmarkEnd: '_Hlk108177278' }} /><span style={{ AwBookmarkEnd: '_Hlk92361505' }} /><span > </span><span style={{ AwBookmarkEnd: '_Hlk94609246' }} /><span > </span><span >&nbsp;</span><span > </span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', fontSize: '10pt' }}><span style={{ AwBookmarkEnd: '_Hlk108086898' }} /><span >&nbsp;</span>
                          </p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', fontSize: '10pt' }}><span >&nbsp;</span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', fontSize: '10pt' }}><span style={{ width: '163.35pt', display: 'inline-block', AwTabstopAlign: 'left', AwTabstopPos: '198.75pt' }}>&nbsp;</span><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', textIndent: '35.4pt', fontSize: '10pt' }}><span style={{ height: '0pt', display: 'block', position: 'absolute', zIndex: 6 }}><img src={imgLin} width={186} height={1} alt="" style={{ marginTop: '2.99pt', marginLeft: '122.9pt', AwLeftPos: '0pt', AwRelHpos: 'page', AwRelVpos: 'paragraph', AwTopPos: '3.37pt', AwWrapType: 'none', position: 'absolute' }} /></span><span style={{ height: '0pt', display: 'block', position: 'absolute', zIndex: 2 }}><img src={imgLin} width={186} height={1} alt="" style={{ marginTop: '2.93pt', marginLeft: '304.04pt', AwLeftPos: '375.21pt', AwRelHpos: 'column', AwRelVpos: 'paragraph', AwTopPos: '3.31pt', AwWrapType: 'none', position: 'absolute' }} /></span><span style={{ height: '0pt', display: 'block', position: 'absolute', zIndex: 1 }}><img src={imgLin} width={186} height={1} alt="" style={{ marginTop: '3.62pt', marginLeft: '-43.96pt', AwLeftPos: '27.22pt', AwRelHpos: 'column', AwRelVpos: 'paragraph', AwTopPos: '4pt', AwWrapType: 'none', position: 'absolute' }} /></span><span >&nbsp;</span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', textIndent: '14.25pt', fontSize: '10pt' }}><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>Firma del autorizado.</span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}> </span><span style={{ width: '31.81pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ width: '35.4pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>Firma </span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>quien recibe</span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}></span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>.</span><span style={{ width: '4pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ width: '35.4pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ width: '35.4pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>Firma de quien autoriza.</span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', textIndent: '14.25pt', fontSize: '10pt' }}><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>&nbsp;</span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', textIndent: '14.25pt', fontSize: '10pt' }}><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>&nbsp;</span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', textIndent: '14.25pt', fontSize: '10pt' }}><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>&nbsp;</span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', textIndent: '14.25pt', fontSize: '10pt' }}><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>&nbsp;</span></p>
                          
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <table cellSpacing={0} cellPadding={0} style={{ width: '98.66%', borderCollapse: 'collapse' }}>
                            <tbody><tr style={{ height: '32.3pt' }}>
                              <td rowSpan={2} style={{ width: '17.3%', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p className="p__dos"><span style={{ height: '0pt', display: 'block', position: 'absolute', zIndex: 5 }}><img src={imgLog} width={75} height={60} style={{ marginTop: '5.75pt', marginLeft: '7.3pt', AwLeftPos: '7.3pt', AwRelHpos: 'column', AwRelVpos: 'paragraph', AwTopPos: '5.75pt', AwWrapType: 'none', position: 'absolute' }} /></span>
                                </p>
                              </td>
                              <td style={{ width: '45.82%', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p className="p__dos"><span >&nbsp;</span></p>
                                <p className="p__dos"><span >BOGOTA</span></p>
                              </td>
                              <td style={{ width: '36.88%', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'right', fontSize: '10pt' }}><span >Anexo Norma Nᵃ 088-89 </span></p>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'right', fontSize: '10pt' }}><span >Forma 25-08 89</span></p>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'right', fontSize: '10pt' }}><span >Consecutivo </span><span >{n_consecutivo}</span></p>
                              </td>
                            </tr>
                              <tr style={{ height: '20.7pt' }}>
                                <td colSpan={2} style={{ borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '10pt' }}><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>ORDEN DE SALID</span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>A </span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>PARA SEGURIDAD</span></p>
                                </td>
                              </tr>
                            </tbody></table>
                          <p className="p__dos"><span >&nbsp;</span></p>
                          <p className="p__dos"><span >Fecha:
                          </span><span >{transformar(fecha_salida)}</span></p>
                          <p className="p_dos"><span >El portador de la presente: </span><span >_______________________________________</span><span > Identificado con la C.C. </span><span >N°</span><span > </span><span >_____________________________</span><span >. </span><span >Realiza
                            entrega en las dependencias de Caracol PISO 7 los elementos relacionados a continuación:</span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}> </span></p>
                          <p style={{ marginTop: '0pt', marginBottom: '10pt', lineHeight: '115%', fontSize: '11pt' }}><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}>Recibe: </span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt' }}>{usuario_orden}</span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt' }}>,</span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt' }}> </span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}>Destino final</span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}> </span><span>{destino}</span>
                            <span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}>&nbsp;</span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}> </span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}>&nbsp;</span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}> </span><span style={{ fontFamily: 'Calibri' }}> </span><span style={{ fontFamily: '"Times New Roman"', fontSize: '10pt', fontWeight: 'bold' }}>Contacto:</span><span style={{ fontFamily: 'Calibri' }}>{n_contacto} </span></p>
                          <table cellSpacing={0} cellPadding={0} style={{ width: '509.75pt', borderCollapse: 'collapse' }}>
                            <tbody><tr style={{ height: '15pt' }}>
                              <td style={{ width: '76pt', borderTopStyle: 'solid', borderTopWidth: '0.75pt', borderRightStyle: 'solid', borderRightWidth: '0.75pt', borderLeftStyle: 'solid', borderLeftWidth: '0.75pt', paddingRight: '3.12pt', paddingLeft: '3.12pt', verticalAlign: 'middle', backgroundColor: '#ffffff' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri', fontWeight: 'bold' }}>EQUIPO</span></p>
                              </td>
                              <td style={{ width: '47pt', borderTopStyle: 'solid', borderTopWidth: '0.75pt', borderRightStyle: 'solid', borderRightWidth: '0.75pt', paddingRight: '3.12pt', paddingLeft: '3.5pt', verticalAlign: 'middle', backgroundColor: '#ffffff' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri', fontWeight: 'bold' }}>MARCA</span></p>
                              </td>
                              <td style={{ width: '150pt', borderTopStyle: 'solid', borderTopWidth: '0.75pt', borderRightStyle: 'solid', borderRightWidth: '0.75pt', paddingRight: '3.12pt', paddingLeft: '3.5pt', verticalAlign: 'middle', backgroundColor: '#ffffff' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri', fontWeight: 'bold' }}>MODELO</span></p>
                              </td>
                              <td style={{ width: '81pt', borderTopStyle: 'solid', borderTopWidth: '0.75pt', borderRightStyle: 'solid', borderRightWidth: '0.75pt', paddingRight: '3.12pt', paddingLeft: '3.5pt', verticalAlign: 'middle', backgroundColor: '#ffffff' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri', fontWeight: 'bold' }}>SERIAL</span></p>
                              </td>
                              <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '0.75pt', borderRightStyle: 'solid', borderRightWidth: '0.75pt', paddingRight: '3.12pt', paddingLeft: '3.5pt', verticalAlign: 'middle', backgroundColor: '#ffffff' }}>
                                <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri', fontWeight: 'bold' }}>PLACA INV</span></p>
                              </td>
                            </tr>
                              <tr style={{ height: '16.3pt' }}>
                                <td style={{ width: '75.4pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}>{equipo}</span></p>
                                </td>
                                <td style={{ width: '49.2pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}>{marca}</span></p>
                                </td>
                                <td style={{ width: '152.25pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}> {modelo}</span></p>
                                </td>
                                <td style={{ width: '85pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}>{serial}</span></p>
                                </td>
                                <td style={{ width: '121.1pt', borderStyle: 'solid', borderWidth: '0.75pt', paddingRight: '5.03pt', paddingLeft: '5.03pt', verticalAlign: 'top' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}>{placa}</span></p>
                                </td>
                              </tr>
                              <tr style={{ height: '15pt' }}>
                                <td colSpan={5} style={{ width: '502pt', borderLeftStyle: 'solid', borderLeftWidth: '0.75pt', borderBottomStyle: 'solid', borderBottomWidth: '0.75pt', paddingRight: '3.5pt', paddingLeft: '3.12pt', verticalAlign: 'bottom' }}>
                                  <p style={{ marginTop: '0pt', marginBottom: '0pt', textAlign: 'center', fontSize: '11pt' }}><span style={{ fontFamily: 'Calibri' }}>Para evitar adiciones no autorizadas, trazar </span><span style={{ fontFamily: 'Calibri' }}>xxxx</span><span style={{ fontFamily: 'Calibri' }}> o rayas al
                                    finalizar la relación</span></p>
                                </td>
                              </tr>
                            </tbody></table>
                          <p className="p__uno"><span >&nbsp;</span><span >&nbsp;&nbsp;&nbsp;&nbsp; </span>
                          </p>
                          <p className="p__uno"><span >&nbsp;</span></p>
                          <p className="p__uno"><span >&nbsp;</span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', fontSize: '10pt' }}><span style={{ width: '163.35pt', display: 'inline-block', AwTabstopAlign: 'left', AwTabstopPos: '198.75pt' }}>&nbsp;</span><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', textIndent: '35.4pt', fontSize: '10pt' }}><span style={{ height: '0pt', display: 'block', position: 'absolute', zIndex: 3 }}><img src={imgLin} width={186} height={1} alt="" style={{ marginTop: '3.62pt', marginLeft: '-42.55pt', AwLeftPos: '28.63pt', AwRelHpos: 'column', AwRelVpos: 'paragraph', AwTopPos: '4pt', AwWrapType: 'none', position: 'absolute' }} /></span><span style={{ height: '0pt', display: 'block', position: 'absolute', zIndex: 4 }}><img src={imgLin} width={186} height={1} alt="" style={{ marginTop: '3.62pt', marginLeft: '300.59pt', AwLeftPos: '371.77pt', AwRelHpos: 'column', AwRelVpos: 'paragraph', AwTopPos: '4pt', AwWrapType: 'none', position: 'absolute' }} /></span><span >&nbsp;</span></p>
                          <p style={{ marginTop: '0pt', marginLeft: '35.4pt', marginBottom: '0pt', textIndent: '14.25pt', fontSize: '10pt' }}><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>Firma del autorizado.</span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}> </span><span style={{ width: '31.81pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ width: '35.4pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ width: '35.4pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ width: '35.4pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ width: '35.4pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ width: '35.4pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ width: '35.4pt', textIndent: '0pt', display: 'inline-block' }}>&nbsp;</span><span style={{ fontFamily: '"Times New Roman"', fontWeight: 'bold' }}>Firma de quien autoriza.</span></p>


                        </div>
                      </div>
                    </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Paginacion */}
            <Pagination />

          </ToastBody>
        </div>
        </Toast>
      </div >
      <Link to='/crear' className='btn btn-primary'> Crear</Link>
      {/* Boton exportar exel */}

      <TableExport />

    </>

  )
}

export default Showdb