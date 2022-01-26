import React from 'react';
import logo from '../../../assets/images/logo.png';


const UnauthenticatedChildren = (props) => {
    return (
        <>
            <div className="p-grid p-mg-0">
                <div className="p-col-4"></div>
                <div className="p-col-4">
                    <div className="flex justify-content-center">
                        <div className="p-fluid">
                            <div
                                style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '1px', width: '200px', height: '200px' }}
                            ><img alt="Card" src={logo} /></div>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-col-4"></div>
        </>
    );
}

export default UnauthenticatedChildren;