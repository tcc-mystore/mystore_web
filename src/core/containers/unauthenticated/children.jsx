import React from 'react';
import '../../../assets/layout/login/index.css';

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