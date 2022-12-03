import IEventInfo from '../info/IEventInfo';

//actions
export const ACTIONS = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
};

interface AddEventAction {
    type: typeof ACTIONS.ADD
    payload: IEventInfo
}

interface RemoveEventAction {
    type: typeof ACTIONS.REMOVE
    payload: IEventInfo
}

export type EventActionTypes = AddEventAction |  RemoveEventAction;

//reducer state
export type EventState = IEventInfo[];
