import * as actions from '../actions/test';

const initialState = {
    tests: [],
    test: undefined
};

export default function (state = initialState, action) {
    const { tests, test } = action.data || {};

    switch (action.type) {
        case actions.CREATE_TEST:
        case actions.EDIT_TEST:
        case actions.REMOVE_TEST:
        case actions.GET_ALL_TESTS: {
            return { ...state, tests };
        }

        case actions.GET_TEST: {
            return { ...state, test };
        }

        default: {
            return state;
        }
    }
}