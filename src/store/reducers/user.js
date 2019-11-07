import * as actions from '../actions/user';

const initialState = {
    info: undefined
};

export default function (state = initialState, action) {
    const { user } = action.data || {};

    switch (action.type) {
        case actions.LOGIN_USER:
        case actions.REGISTER_USER:
        case actions.GET_USER: {
            localStorage.setItem('token', user.token);
            localStorage.setItem('userId', user.id);

            return { ...state, info: user };
        }

        case actions.LOGOUT_USER: {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');

            return { ...state, info: undefined };
        }

        default: {
            return state;
        }
    }
}