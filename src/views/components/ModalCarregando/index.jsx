import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import './index.css';

const ModalCarregando = (props) => {
    if (props.aguardando) {
        return (
            <>
                <div className="carregamento">
                    <main className="conteudo">
                        <div className="subconteudo">
                            <ProgressSpinner
                                strokeWidth="8"
                                style={
                                    {
                                        width: '5rem', height: '5rem',
                                        color: '#FFF'
                                    }
                                }
                            />
                        </div>
                        <div className="subconteudo">
                            <h1 style={
                                {
                                    //    width: '5rem', height: '5rem', 
                                    color: '#FFF'
                                }
                            } >
                                Carregando...
                            </h1>
                        </div>
                        <div className="subconteudo">
                            <h3 style={
                                {
                                    //    width: '5rem', height: '5rem', 
                                    color: '#FFF'
                                }
                            }>
                                {props.pagina}
                            </h3>
                        </div>
                    </main>
                </div>
            </>
        );
    } else {
        return null;
    }
}

export default ModalCarregando;