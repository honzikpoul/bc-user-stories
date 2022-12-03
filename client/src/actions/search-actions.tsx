import axios, { AxiosResponse } from 'axios';
import objectAssign from 'object-assign';
import qs from 'query-string';
import { SearchActionTypes, ACTIONS } from './../types/redux/SearchTypes';

import IEventInfo from './../types/info/IEventInfo';
import IOpen511Response from './../types/IOpen511Response';


export function storeFoundEventList( foundEventList: IEventInfo[] ): SearchActionTypes {
    return {
        type: ACTIONS.STORE_FOUND_EVENTS,
        payload: foundEventList
    }
}

export const searchEventList = ( eventType: string, severity: string, startDate: string, limit: number, offset: number ): Promise<AxiosResponse<IOpen511Response<IEventInfo>>> => {

    let params = {
        limit,
        offset
    };
    
    
    if ( eventType ) {
        params = objectAssign( {}, params, {
            'event_type': eventType
        } );
    }
    if ( severity ) {
        params = objectAssign( {}, params, {
            'severity': severity
        } );
    }
    if ( startDate ) {
        params = objectAssign( {}, params, {
            'in_effect_on': startDate
        } );
    }



    return axios.get( `https://api.open511.gov.bc.ca/events?${ qs.stringify( params ) }` );
}
