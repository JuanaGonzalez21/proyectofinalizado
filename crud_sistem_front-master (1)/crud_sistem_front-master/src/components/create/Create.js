import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from "../../servidor/api"
import { Link } from 'react-router-dom'
import { Form, FormGroup, Label, Input, FormText, Col, Row } from "reactstrap"
import { ToastHeader, Toast, ToastBody } from 'reactstrap';
import moment from 'moment';

import './Crear.css'
import api from '../../servidor/api'
import Cloneda from './Cloneda'


const Create = () => {

  const [ticket_problema, setTicket_problema] = useState('');
  const [ticket_envio, setTicket_envio] = useState('');
  const [fecha_llegada_correspondencia, setFecha_llegada_correspondencia] = useState(moment().toISOString(new Date()).toLocaleString());
  const [n_guia, setN_guia] = useState('');
  const [fecha_salida, setFecha_salida] = useState(new Date());
  const [destino, setDestino] = useState('');
  const [usuario_orden, setUsuario_orden] = useState('');
  const [n_contacto, setN_contacto] = useState(0);
  const [agente_envia, setAgente_envia] = useState('');
  const [consecutivo, setConsecutivo] = useState('');
  const [n_consecutivo, setN_consecutivo] = useState('');
  const [area_envia, setArea_envia] = useState('');
  const [inputDisp, setInputDisp] = useState([{ equipo: '', marca: '', modelo: '', serial: '', placa: '' }]);

  const navigate = useNavigate()


  //Obtener el consecutivo anterior

  useEffect(() => {
    getOrdenes()
  }, []);


  const getOrdenes = async () => {
    const res = await axios.get(Api + "/con")
    setConsecutivo((res.data[0].consecutivo) + 1)
  }

  //Convertir las iniciasles a el consecutivo 

  const [agentedos, setAgentedos] = useState('');

  useEffect(() => {
    if (agente_envia == 'Andres Cepeda') setAgentedos("AC")
    if (agente_envia == 'Duvan Gonzalez') setAgentedos("DG")
    if (agente_envia == 'Rafael Mindiola') setAgentedos("RF")
    if (agente_envia == 'Yeimi Wilches') setAgentedos("YW")
    if (agente_envia == 'Tatiana Mendoza') setAgentedos("TM")
    if (agente_envia == 'Juana Gonzalez') setAgentedos("JG")

    setN_consecutivo(consecutivo + agentedos)
  }, [agente_envia, agentedos])

  const handleFormChange = (index, event) => {
    let data = [...inputDisp];
    data[index][event.target.name] = event.target.value;
    setInputDisp(data);
  }

  const addFields = () => {
    let newfield = { equipo: '', marca: '' }
    setInputDisp([...inputDisp, newfield])
  }

  const store = async (e) => {
    e.preventDefault()

    //Conversion de fecha
    setFecha_salida(fecha_salida.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))
    await axios.post(Api + "/create",

      {
        ticket_problema: ticket_problema,
        ticket_envio: ticket_envio,
        fecha_llegada_correspondencia: fecha_llegada_correspondencia,
        n_guia: n_guia,
        fecha_salida: fecha_salida,
        destino: destino,
        usuario_orden: usuario_orden,
        n_contacto: n_contacto,
        agente_envia: agente_envia,
        consecutivo: consecutivo,
        n_consecutivo: n_consecutivo,
        area_envia: area_envia,
        equipos: inputDisp,

      })
    navigate('/')
  }

  return (
    <>
      <div className=" container__form">
        <Toast className='width__listado'>
          <div className="">
            <ToastBody className="espace__none" >
              <div className="container__form">
                <Form onSubmit={store}  >
                  {/* HEADER DEL FORMULARIO */}
                  <Row>
                    <div className="title__crear">
                      <h3> Registro de ordenes de salida</h3>
                      <div className="end__crear">
                        <div className="end__crear">
                          <h5>Consecutivo: </h5>
                          <h6>
                            <input className="input__crear" value={consecutivo}
                              onChange={(e) => setConsecutivo(e.target.value)}
                              type='text' />
                          </h6>
                        </div>
                        <div>
                          <h5>N_Consecutivo:</h5>
                          <h6><input readOnly className="input__crear" value={n_consecutivo}
                            onChange={(e) => setN_consecutivo(e.target.value)}
                            type='text' /></h6>
                        </div>
                        <div>
                          <h5>Fecha:</h5>
                          <h6><input className="input__crear" value={fecha_salida}
                            onChange={(e) => setFecha_salida(e.target.value)}
                            type='date' required pattern="\d{4}-\d{2}-\d{2}" /></h6>
                        </div>
                      </div>
                    </div>
                  </Row>
                  {/* HEADER DEL FORMULARIO ENDS */}
                  {/* INPUTS */}
                  <Row>
                    <Col md={4}>
                      <FormGroup >
                        <Label for="exampleEmail"> Se entrega a: </Label>
                        <Input className="input__crear" value={usuario_orden}
                          onChange={(e) => setUsuario_orden(e.target.value)}
                          type='text' />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label for="examplePassword">
                          Entrega:
                        </Label>
                        <Input className="input__crear"
                          onChange={(e) => setAgente_envia(e.target.value)}
                          type='select' >
                          <option></option>
                          <option>Andres Cepeda</option>
                          <option>Duvan Gonzalez</option>
                          <option>Rafael Mindiola</option>
                          <option>Yeimi Wilches</option>
                          <option>Tatiana Mendoza</option>
                          <option>Juana Gonzalez</option>

                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <Label for="exampleAddress2">
                        Área que envia
                      </Label>
                      <Input className="input__crear" value={area_envia}
                        onChange={(e) => setArea_envia(e.target.value)}
                        type='text' />
                    </Col>
                  </Row>
                  {/* FORMULARIO DEL ELEMENTO A ENTREGAR*/}

                  {inputDisp.map((input, index) => {
                    return (
                      <div key={index}>
                        <FormGroup>
                          <Row>
                            <Col md={3}>
                              <Label for="exampleAddress">Equipo: </Label>
                              <Input className="input__crear"
                                name='equipo'
                                value={input.equipo}
                                onChange={event => handleFormChange(index, event)}
                                type='text' />
                            </Col>

                            <Col md={2}>
                              <Label for="exampleAddress">Marca: </Label>
                              <Input className="input__crear"
                                name='marca'
                                value={input.marca}
                                onChange={event => handleFormChange(index, event)}
                                type='text' />
                            </Col>
                            <Col md={2}>
                              <Label for="exampleAddress">Modelo</Label>
                              <Input className="input__crear"
                                name='modelo'
                                value={input.modelo}
                                onChange={event => handleFormChange(index, event)}
                                type='text' />
                            </Col>
                            <Col md={2}>
                              <Label for="exampleAddress">Serial</Label>
                              <Input className="input__crear"
                                name='serial'
                                value={input.serial}
                                onChange={event => handleFormChange(index, event)}
                                type='text' />
                            </Col>
                            <Col md={3}>
                              <Label for="exampleAddress">Placa</Label>
                              <Input className="input__crear"
                                name='placa'
                                value={input.placa}
                                onChange={event => handleFormChange(index, event)}
                                type='text' />
                            </Col>
                          </Row>
                        </FormGroup>
                      </div>
                    )
                  })}



                  {/* ENDS */}
                  <FormGroup  >
                    <div>
                      <Row >
                        <Col md={3}>
                          <Label for="exampleAddress2">
                            Destino
                          </Label>
                          <Input className="input__crear" value={destino}
                            onChange={(e) => setDestino(e.target.value)}
                            type='text' />                                                        </Col>

                        <Col md={3}>
                          <Label for="exampleAddress2">
                            Número de contacto
                          </Label>
                          <Input className="input__crear" value={n_contacto}
                            onChange={(e) => setN_contacto(e.target.value)}
                            type='text' />                                                        </Col>
                        <Col md={3}>
                          <Label for="exampleAddress2">
                            Número de guía
                          </Label>
                          <Input className="input__crear" value={n_guia}
                            onChange={(e) => setN_guia(e.target.value)}
                            type='text' />                                                        </Col>

                        <Col md={3}>
                          <Label for="exampleAddress2">
                            Fecha de envio:
                          </Label>
                          <Input className="input__crear" value={fecha_llegada_correspondencia}
                            onChange={(e) => setFecha_llegada_correspondencia(e.target.value)}
                            type='date' />                                                        </Col>
                      </Row>
                    </div>
                  </FormGroup>
                  <FormGroup >
                    <Row >
                      <Col md={6}>
                        <Label for="exampleAddress2">
                          Ticket Raíz
                        </Label>
                        <Input className="input__crear" value={ticket_problema}
                          onChange={(e) => setTicket_problema(e.target.value)}
                          type='text' />
                      </Col>
                      <Col md={6}>
                        <Label for="exampleAddress2">
                          Ticket de envio
                        </Label>
                        <Input className="input__crear" value={ticket_envio}
                          onChange={(e) => setTicket_envio(e.target.value)}
                          type='text' />
                      </Col>

                    </Row>
                  </FormGroup>


                  <button type='submit' className='btn btn-primary'> Subir</button>
                </Form>
              </div>
            </ToastBody>
            <Link to={'/'} className='btn btn-info'>Volver</Link>
            <button onClick={addFields}>Agg Dispositivo</button>
          </div>
        </Toast>
      </div >

    </>

  )
}

export default Create