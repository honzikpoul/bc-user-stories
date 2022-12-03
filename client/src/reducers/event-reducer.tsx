
import IEventInfo from './../types/info/IEventInfo';

import { ACTIONS, EventState, EventActionTypes } from './../types/redux/EventTypes';

export default function modalReducer(
    state: EventState = [],
    action: EventActionTypes
): EventState {
    switch ( action.type ) {
        case ACTIONS.ADD:
            return [ ...state, action.payload ]
        case ACTIONS.REMOVE:
            return [ ...state.filter( ( e: IEventInfo ) => e.id !== action.payload.id ) ]
        default:
            return state;
    }
}
