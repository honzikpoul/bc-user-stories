
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
