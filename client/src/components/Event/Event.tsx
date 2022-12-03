import React from 'react';
import { connect } from 'react-redux';
import { addModal, popModal, addError } from '../../actions/modal-actions';

import { ApplicationState } from '../../store';
import { ModalState } from '../../types/redux/ModalTypes';

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
    modal: ModalState
}

interface IReduxDispatchProps {

}

type Props = IOwnProps & IReduxStateProps & IReduxDispatchProps;

class FoundEvents extends React.PureComponent<Props, IStateProps> {


    render() {

        const updatedDate = new Date( this.props.eventInfo.updated );

        return <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{ this.props.eventInfo.headline }</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ `Updated: ${ updatedDate.toLocaleDateString() } ${ updatedDate.toLocaleTimeString() }` }</h6>
                    <p className="card-text">{ this.props.eventInfo.description }</p>
                    <p className=" text-end">
                        <a href="#" className="btn btn-primary">Save</a>
                    </p>
                </div>
            </div>
        </React.Fragment>

    }
}

const mapStateToProps = ( state: ApplicationState ): IReduxStateProps => ( {
    modal: state.modalReducer,
} );

const mapDispatchToProps = ( dispatch: Function ): IReduxDispatchProps => ( {
    popModal: () => dispatch( popModal() ),
    addModal: ( modal: React.ReactNode ) => dispatch( addModal( modal ) ),
    addError: ( message: string ) => dispatch( addError( message ) )
} );

export default connect<IReduxStateProps, IReduxDispatchProps, IOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)( FoundEvents );

