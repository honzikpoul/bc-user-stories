import React from 'react';
import { connect } from 'react-redux';

import { Event } from './../';

import { addModal, popModal, addError } from '../../actions/modal-actions';
import { addEventInfo } from '../../actions/event-actions';

import { ApplicationState } from '../../store';
import { ModalState } from '../../types/redux/ModalTypes';
import { SearchState } from '../../types/redux/SearchTypes';
import IEventInfo from '../../types/info/IEventInfo';


//component state
interface IStateProps {

}

//component props
interface IOwnProps {

}

//redux state props
interface IReduxStateProps {
    modal: ModalState,
    search: SearchState
}

interface IReduxDispatchProps {
    popModal: () => void;
    addModal: ( modal: React.ReactNode ) => void;
    addError: ( message: string ) => void;
    addEventInfo: ( eventInfo: IEventInfo ) => void;
}

type Props = IOwnProps & IReduxStateProps & IReduxDispatchProps;

class FoundEvents extends React.PureComponent<Props, IStateProps> {

    render() {

        if ( this.props.search.foundEventList.length === 0 ) {
            return <b>No events found</b>;
        }

        //we have some events in store
        return this.props.search.foundEventList.map( ( e: IEventInfo, i: number ) => {
            return <React.Fragment key={ i }>
                <Event eventInfo={ e } />
            </React.Fragment>
        } )

    }
}

const mapStateToProps = ( state: ApplicationState ): IReduxStateProps => ( {
    modal: state.modalReducer,
    search: state.searchReducer
} );

const mapDispatchToProps = ( dispatch: Function ): IReduxDispatchProps => ( {
    popModal: () => dispatch( popModal() ),
    addModal: ( modal: React.ReactNode ) => dispatch( addModal( modal ) ),
    addError: ( message: string ) => dispatch( addError( message ) ),
    addEventInfo: ( eventInfo: IEventInfo ) => dispatch( addEventInfo( eventInfo ) ),
} );

export default connect<IReduxStateProps, IReduxDispatchProps, IOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)( FoundEvents );

