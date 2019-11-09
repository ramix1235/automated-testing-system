import * as actions from '../actions/passedTest';

const initialState = {
    passedTests: [],
    passedTest: undefined
};

export default function (state = initialState, action) {
    const { passedTests, passedTest } = action.data || {};

    switch (action.type) {
        case actions.CREATE_PASSED_TEST:
        case actions.REMOVE_PASSED_TEST:
        case actions.GET_ALL_PASSED_TESTS: {
            return { ...state, passedTests };
        }

        case actions.GET_PASSED_TEST: {
            return { ...state, passedTest };
        }

        default: {
            return state;
        }
    }
}