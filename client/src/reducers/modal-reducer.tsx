import { ModalActionTypes, ACTIONS, ModalState } from './../types/redux/ModalTypes';

export default function modalReducer(
    state: ModalState = [],
    action: ModalActionTypes
): ModalState {
    switch ( action.type ) {
        case ACTIONS.ADD:
            return [ ...state, action.payload ]
        case ACTIONS.POP:
            return [ ...state.slice( 1, -1 ) ]
        default:
            return state;
    }
}
