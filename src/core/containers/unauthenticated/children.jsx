import React from 'react';
import './index.css';

const UnauthenticatedChildren = (props) => {
    return (
        <>
            <div className="container-login">
                <div className="login card shadow">
                    {props.children}
                </div>
            </div>
        </>
    );
}

export default UnauthenticatedChildren;