import React from 'react';
import { connect } from 'react-redux';
import { AxiosResponse, AxiosError } from 'axios';
import { addModal, popModal, addError } from '../../actions/modal-actions';
import { fixJsonServerId } from '../../utils/index';
import { addEventInfo, addEventInfoToDatabase, removeEventInfoToDatabase, removeEventInfo } from '../../actions/event-actions';

import { ApplicationState } from '../../store';
import { ModalState } from '../../types/redux/ModalTypes';
import { EventState } from '../../types/redux/EventTypes';

import IEventInfo from '../../types/info/IEventInfo';

//component state
interface IStateProps {

}

//component props
interface IOwnProps {
    eventInfo: IEventInfo
}

//redux state props
interface IReduxStateProps {
    modal: ModalState,
    event: EventState
}

interface IReduxDispatchProps {
    popModal: () => void;
    addModal: ( modal: React.ReactNode ) => void;
    addError: ( message: string ) => void;
    addEventInfo: ( eventInfo: IEventInfo ) => void;
    removeEventInfo: ( eventInfo: IEventInfo ) => void;
}

type Props = IOwnProps & IReduxStateProps & IReduxDispatchProps;

class FoundEvents extends React.PureComponent<Props, IStateProps> {

    saveEventInfo = ( eventInfo: IEventInfo ) => {

        addEventInfoToDatabase( eventInfo )
            .then( ( response: AxiosResponse ) => {
                this.props.addEventInfo( eventInfo );
            } ).catch( ( error: AxiosError ) => {
                this.props.addError( error.message );
            } );
    }
    
    removeEventInfo = ( eventInfo: IEventInfo ) => {

        removeEventInfoToDatabase( eventInfo )
            .then( ( response: AxiosResponse ) => {
                this.props.removeEventInfo( eventInfo );
            } ).catch( ( error: AxiosError ) => {
                this.props.addError( error.message );
            } );
    }


    render() {

        const updatedDate = new Date( this.props.eventInfo.updated );

        const flagSavedEvent = this.props.event.filter( eventInfo => {
            return fixJsonServerId( this.props.eventInfo ).id === eventInfo.id
        } ).length !== 0;

        return <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{ this.props.eventInfo.headline }</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ `Updated: ${ updatedDate.toLocaleDateString() } ${ updatedDate.toLocaleTimeString() }` }</h6>
                    <p className="card-text">{ this.props.eventInfo.description }</p>
                    <p className=" text-end">
                        { !flagSavedEvent && <React.Fragment>
                            <a href="#" onClick={ () => this.saveEventInfo( this.props.eventInfo ) } className="btn btn-primary">Save</a>
                        </React.Fragment> }

                        { flagSavedEvent && <React.Fragment>
                            <a href="#" onClick={ () => this.removeEventInfo( this.props.eventInfo ) } className="btn btn-danger">Remove</a>
                        </React.Fragment> }
                    </p>
                </div>
            </div>
        </React.Fragment>

    }
}

const mapStateToProps = ( state: ApplicationState ): IReduxStateProps => ( {
    modal: state.modalReducer,
    event: state.eventReducer,
} );

const mapDispatchToProps = ( dispatch: Function ): IReduxDispatchProps => ( {
    popModal: () => dispatch( popModal() ),
    addModal: ( modal: React.ReactNode ) => dispatch( addModal( modal ) ),
    addError: ( message: string ) => dispatch( addError( message ) ),
    addEventInfo: ( eventInfo: IEventInfo ) => dispatch( addEventInfo( eventInfo ) ),
    removeEventInfo: ( eventInfo: IEventInfo ) => dispatch( removeEventInfo( eventInfo ) )
} );

export default connect<IReduxStateProps, IReduxDispatchProps, IOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)( FoundEvents );

