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

            return { ...state, info: user };
        }

        case actions.LOGOUT_USER: {
            localStorage.removeItem('token');

            return { ...state, info: undefined };
        }

        default: {
            return state;
        }
    }
}