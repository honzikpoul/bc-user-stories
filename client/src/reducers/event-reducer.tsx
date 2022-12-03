import IEventInfo from './../types/info/IEventInfo';

import { ACTIONS, EventState, EventActionTypes } from './../types/redux/EventTypes';

export default function modalReducer(
    state: EventState = [],
    action: EventActionTypes
): EventState {
    switch ( action.type ) {
        case ACTIONS.ADD:
            if ( state.filter( ( e: IEventInfo ) => e.id === action.payload.id ).length === 0 ){
                return [ ...state, action.payload ];
            }
            return state;
        case ACTIONS.REMOVE:
            return [ ...state.filter( ( e: IEventInfo ) => e.id !== action.payload.id ) ];
        default:
            return state;
    }
}
