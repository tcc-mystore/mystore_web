import React from 'react';
import { Card } from 'primereact/card';
import logo from '../../../assets/images/logo.png';


const UnauthenticatedChildren = (props) => {
    const header = (
        <div 
        style={{ marginLeft: 'auto', marginRight: 'auto', marginTop:'1px', width: '200px', height: '200px' }}
        ><img alt="Card" src={logo} /></div>
    );

    return (
        <>
            <div className="p-grid p-mg-0">
                <div className="p-col-12"></div>
                <div className="p-col-4"></div>
                <div className="p-col-4">
                    <Card header={header}>
                        {props.children}
                    </Card>
                </div>
                <div className="p-col-4"></div>
                <div className="p-col-12"></div>
            </div>
        </>
    );
}

export default UnauthenticatedChildren;