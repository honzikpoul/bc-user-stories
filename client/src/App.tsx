import React from 'react';
import { connect } from 'react-redux';

import { addModal, popModal, addError } from './actions/modal-actions';
import { Modal, Search, FoundEvents } from './components/';

import { ApplicationState } from './store';
import { ModalState } from './types/redux/ModalTypes';


//component state
interface IStateProps {

}

//component props
interface IOwnProps {

}

//redux state props
interface IReduxStateProps {
    modal: ModalState
}

interface IReduxDispatchProps {
    popModal: () => void;
    addModal: ( modal: React.ReactNode ) => void;
    addError: ( message: string ) => void;
}

type Props = IOwnProps & IReduxStateProps & IReduxDispatchProps;

class App extends React.PureComponent<Props, IStateProps> {

    onModalTest = () => {
        const modal = <Modal dialogCloseListener={ () => this.props.popModal() }  >
            <React.Fragment>
                Hello world from dialog
            </React.Fragment>
        </Modal>;

        this.props.addModal( modal );
    }

    render() {
        return <React.Fragment>
            <main>
                <section className="py-5 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Bc User stories</h1>
                            <Search />
                        </div>
                    </div>
                </section>

                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                             <FoundEvents />
                        </div>
                    </div>
                </div>
            </main>
            {
                this.props.modal.length > 0 && <React.Fragment>
                    { this.props.modal[ this.props.modal.length - 1 ] }
                </React.Fragment>
            }
        </React.Fragment>;
    }
}

const mapStateToProps = ( state: ApplicationState ): IReduxStateProps => ( {
    modal: state.modalReducer
} );

const mapDispatchToProps = ( dispatch: Function ): IReduxDispatchProps => ( {
    popModal: () => dispatch( popModal() ),
    addModal: ( modal: React.ReactNode ) => dispatch( addModal( modal ) ),
    addError: ( message: string ) => dispatch( addError( message ) )
} );

export default connect<IReduxStateProps, IReduxDispatchProps, IOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)( App );

