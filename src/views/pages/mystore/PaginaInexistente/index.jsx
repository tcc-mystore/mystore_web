import React from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import './index.css';
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
                        <Link to="/mystore/" variant="contained" style={{ textDecoration: 'none' }}>
                            <Button label="Página Inicial" icon="pi pi-home" />
                        </Link>
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