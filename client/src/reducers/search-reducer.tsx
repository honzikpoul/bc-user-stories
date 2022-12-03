import objectAssign from 'object-assign';

import { ACTIONS, SearchState, SearchActionTypes } from './../types/redux/SearchTypes';

const defaultState = {
    foundEventList: []
}

export default function searchReducer(
    state: SearchState = defaultState,
    action: SearchActionTypes
): SearchState {
    switch ( action.type ) {
        case ACTIONS.STORE_FOUND_EVENTS:
            return objectAssign( {}, state, {
                foundEventList: action.payload
            } );

        default:
            return state;
    }
}
