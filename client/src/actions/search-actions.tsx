import axios, { AxiosResponse } from 'axios';
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

export const searchEventList = ( limit: number, offset: number ): Promise<AxiosResponse<IOpen511Response<IEventInfo>>> => {

    const params = {
        limit,
        offset
    };

    return axios.get( `https://api.open511.gov.bc.ca/events?${ qs.stringify( params ) }` );
}
