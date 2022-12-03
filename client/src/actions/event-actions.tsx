import axios, { AxiosResponse } from 'axios';
import { EventActionTypes, ACTIONS } from './../types/redux/EventTypes';
import IEventInfo from './../types/info/IEventInfo';
import { fixJsonServerId } from './../utils/index';

export function removeEventInfo( eventInfo: IEventInfo ): EventActionTypes {
    return {
        type: ACTIONS.REMOVE,
        payload: eventInfo
    }
}

export function addEventInfo( eventInfo: IEventInfo ): EventActionTypes {
    return {
        type: ACTIONS.ADD,
        payload: eventInfo
    }
}

export function addEventInfoToDatabase( eventInfo: IEventInfo ) {
    eventInfo = fixJsonServerId( eventInfo );
    return axios.post( 'http://localhost:3001/events', eventInfo );
}

export function removeEventInfoToDatabase( eventInfo: IEventInfo ) {
    eventInfo = fixJsonServerId( eventInfo );
    return axios.delete( `http://localhost:3001/events/${ eventInfo.id }` );
}

export function fetchEventInfoListFromDatabase() {
    return axios.get( 'http://localhost:3001/events' );
}