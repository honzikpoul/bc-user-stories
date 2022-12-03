import { EventActionTypes, ACTIONS } from './../types/redux/EventTypes';
import IEventInfo from './../types/info/IEventInfo';

export function addEventInfo( event: IEventInfo ): EventActionTypes {
    return {
        type: ACTIONS.ADD,
        payload: event
    }
}

export function removeEventInfo( event: IEventInfo ): EventActionTypes {
    return {
        type: ACTIONS.REMOVE,
        payload: event
    }
}
