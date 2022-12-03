import React from 'react';
import Modal from './../components/Modal';
import store from './../store';
import { CONFIG } from './../config';
import { ModalActionTypes, ACTIONS } from './../types/redux/ModalTypes';


export function addModal( modal: React.ReactNode ): ModalActionTypes {
    return {
        type: ACTIONS.ADD,
        payload: modal
    }
}

export function popModal(): ModalActionTypes {
    return {
        type: ACTIONS.POP,
        payload: true
    }
}

export function addError( message: string ): ModalActionTypes {

    const errorModal = <Modal dialogCloseListener={ () => store.dispatch( popModal() ) }  >
        <React.Fragment>
            <header>Error!</header>
            <p>
                { message }<br />
            </p>
            <p>
                Please try it latter or send us message to email: { CONFIG.CONTACT_EMAIL }.
            </p>
        </React.Fragment>
    </Modal>;

    return {
        type: ACTIONS.ADD,
        payload: errorModal
    }
}
