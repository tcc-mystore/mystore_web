import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import './index.css';

const PaginaInexistente = (props) => {

    return (
        <>
            <div className="error-template">
                <h1>Oops!</h1>
                <h2>Erro 500</h2>
                <div className="error-details">
                    Desculpe, ocorreu um erro, página solicitada não encontrada ou servidor temporariamente indisponível!
                </div>
                <div className="error-actions">
                    <span className='btn'>
                        <Link to="/mystore/" style={{ textDecoration: 'none' }}>
                            <Button
                                id="idPaginaInicial"
                                color="primary"
                                className="btn btn-lg" disabled={props.desabilitado}>
                                <HomeIcon />
                                <span className="text-white m-1">Página Inicial</span>
                            </Button>
                        </Link>
                    </span>
                    <span className='btn'>
                        <Button className='btn btn-lg' onClick={() => (alert("Tem que desenvolver um componente pra cá!"))} disabled={props.desabilitado}>
                            <InfoIcon />
                            <span className="text-white m-1">Contate o Suporte</span>
                        </Button>
                    </span>
                </div>
            </div>
        </>
    );
}

export default PaginaInexistente;