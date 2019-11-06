import * as actions from '../actions/user';

const initialState = {
    user: null
};

export default function (state = initialState, action) {
    const { user } = action.data || {};

    switch (action.type) {
        case actions.LOGIN_USER:
        case actions.REGISTER_USER:
        case actions.GET_USER: {
            localStorage.setItem('token', user.token);

            return { ...state, user };
        }

        default: {
            return state;
        }
    }
}