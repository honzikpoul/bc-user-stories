
import IEventInfo from '../types/info/IEventInfo';

export function getLocalStorageItem( key: string, defaultValue: any ) {

    var value: any | null = localStorage.getItem( key );

    if ( value !== null ) {
        return JSON.parse( value );
    }

    return defaultValue;
}

export function setLocalStorageItem( key: string, value: any ) {

    if ( value === null ) {
        localStorage.removeItem( key );
        return;
    }

    localStorage.setItem( key, JSON.stringify( value ) );
}

//the '/' -> '~' because json server not support ids with /
//in ideal world some hash function will be applied
export function fixJsonServerId( eventInfo: IEventInfo ): IEventInfo {
    eventInfo.id = eventInfo.id.replace( '/', '~' );
    return eventInfo;
}