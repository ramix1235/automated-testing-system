import React from 'react';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotForm from '../components/ForgotForm';

export default props => {
    let form = null;

    switch (props.type) {
        case 'login': form = <LoginForm />; break;
        case 'register': form = <RegisterForm />; break;
        case 'forgot': form = <ForgotForm />; break;
        default: break;
    }

    return (
        <div className="d-f f-d-column jc-c ai-c m-t-150">
            {form}
        </div>
    );
}