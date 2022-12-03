import React from 'react';

//actions
export const ACTIONS = {
    ADD: 'ADD_MODAL',
    POP: 'POP_MODAL' 
};


interface AddModalAction {
    type: typeof ACTIONS.ADD
    payload: React.ReactNode
}

interface PopModalAction {
    type: typeof ACTIONS.ADD
    payload: boolean
}

export type ModalActionTypes = AddModalAction | PopModalAction;

//reducer state
export type ModalState = React.ReactNodeArray;
