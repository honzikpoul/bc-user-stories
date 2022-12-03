import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import { addModal, popModal, addError } from './actions/modal-actions';
import { Modal } from './components/';

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
        const modal = <Modal dialogCloseListener={ () => this.props.popModal()}  >
            <React.Fragment>
                Hello world from dialog
            </React.Fragment>
        </Modal>;

        this.props.addModal( modal );
    }

    render() {
        return <React.Fragment>
           
            <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                  </p>
                  <a
                    className="btn btn-primary"
                    onClick={ e => this.onModalTest() }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open test dialog
                  </a>
                </header>
              </div>
        
            { this.props.modal.length > 0 && <React.Fragment>
                { this.props.modal[ this.props.modal.length - 1 ] }
            </React.Fragment> }
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

