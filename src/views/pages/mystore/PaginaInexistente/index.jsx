import React from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import './index.css';

const PaginaInexistente = () => {

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
                            <Button label="Página Inicial" icon="pi pi-home" />
                        </Link>
                    </span>
                    <span className='btn'>
                        <Button label='Contate o Suporte' icon="pi pi-envelope" className='p-button-info' onClick={() => (alert("Tem que desenvolver um componente pra cá!"))} />
                    </span>
                </div>
            </div>
        </>
    );
}

export default PaginaInexistente;