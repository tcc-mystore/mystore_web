import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';

const PaginaInexistente = () => {

    return (
        <>
            <div className="error-template">
                <h1>
                    Oops!
                </h1>
                <h2>
                    Erro 500</h2>
                <div className="error-details">
                    Desculpe, ocorreu um erro, página solicitada não encontrada ou servidor temporariamente indisponível!
                </div>
                <div className="error-actions">
                    <span className='btn'>
                        <Button variant="contained" startIcon={<HomeIcon />}>
                            <Link to="/mystore/" variant="contained">
                                Página Inicial
                            </Link>
                        </Button>
                    </span>

                    <span className='btn'>
                        <Button className='btn' onClick={() => (alert("Tem que desenvolver um componente pra cá!"))} variant="contained" startIcon={<EmailIcon />}>
                            Contate o Suporte
                        </Button>
                    </span>
                </div>
            </div>
        </>
    );
}

export default PaginaInexistente;