import React, { useState} from 'react'
import { Form, FormGroup, Label, Input, FormText, Col, Row } from "reactstrap"


const Cloneda = () => {

    const [equipo, setEquipo] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [serial, setSerial] = useState('');
    const [placa, setPlaca] = useState('');
    return (
        <>
            <Col md={3}>
                <Label for="exampleAddress">Equipo: </Label>
                <Input className="input__crear" value={equipo}
                    onChange={(e) => setEquipo(e.target.value)}
                    type='text' />
            </Col>
            <Col md={2}>
                <Label for="exampleAddress">Marca:</Label>
                <Input className="input__crear" value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    type='text' />
            </Col>
            <Col md={2}>
                <Label for="exampleAddress">Modelo</Label>
                <Input className="input__crear" value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    type='text' />
            </Col>
            <Col md={2}>
                <Label for="exampleAddress">Serial</Label>
                <Input className="input__crear" value={serial}
                    onChange={(e) => setSerial(e.target.value)}
                    type='text' />
            </Col>
            <Col md={3}>
                <Label for="exampleAddress">Placa</Label>
                <Input className="input__crear" value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                    type='text' />
            </Col>
        </>
    )
}

export default Cloneda