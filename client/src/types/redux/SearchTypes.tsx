import IEventInfo from '../info/IEventInfo';

//actions
export const ACTIONS = {
    STORE_FOUND_EVENTS: 'STORE_FOUND_EVENTS'
};

interface StoreFoundEventListAction {
    type: typeof ACTIONS.STORE_FOUND_EVENTS
    payload: IEventInfo[]
}


export type SearchActionTypes = StoreFoundEventListAction;

//reducer state
export type SearchState = {
    foundEventList: IEventInfo[]
};
