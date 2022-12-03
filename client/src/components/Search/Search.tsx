import React from 'react';
import { connect } from 'react-redux';
import { AxiosResponse, AxiosError } from 'axios';

import { searchEventList, storeFoundEventList } from './../../actions/search-actions';


import { addModal, popModal, addError } from '../../actions/modal-actions';

import { ApplicationState } from '../../store';
import { ModalState } from '../../types/redux/ModalTypes';
import IEventInfo from '../../types/info/IEventInfo';
import IOpen511Response from '../../types/IOpen511Response';

//component state
interface IStateProps {
    searchTerm: string
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
    storeFoundEventList: ( eventList: IEventInfo[] ) => void;
}

type Props = IOwnProps & IReduxStateProps & IReduxDispatchProps;

class Search extends React.PureComponent<Props, IStateProps> {

    constructor( props: Props ) {
        super( props );

        this.state = {
            searchTerm: ""
        }
    }

    onKeyEnterPressedSearch = ( event: React.KeyboardEvent<HTMLInputElement> ): void => {
        if ( event.key === 'Enter' ) {
            this.searchListener();
        }
    }

    searchListener = () => {

        searchEventList(
            10, 0
        ).then( ( response: AxiosResponse<IOpen511Response<IEventInfo>> ) => {
            const { data } = response;
             
            this.props.storeFoundEventList( data.events );

        } ).catch( ( error: AxiosError ) => {
            this.props.addError( error.message );
        } );

    }

    render() {

        return ( <React.Fragment>

            <div className="input-group mb-3">

                <input type="text"
                    className="form-control"
                    placeholder="Search event ..."
                    value={ this.state.searchTerm }
                    onChange={ e => this.setState( { searchTerm: e.target.value } ) }
                    onKeyDown={ this.onKeyEnterPressedSearch }
                />
                <div className="invalid-feedback">Example invalid feedback text</div>
                <button className="btn btn-outline-secondary" type="button"
                    onClick={ this.searchListener }
                >Search</button>
            </div>

        </React.Fragment> );
    }
}

const mapStateToProps = ( state: ApplicationState ): IReduxStateProps => ( {
    modal: state.modalReducer
} );

const mapDispatchToProps = ( dispatch: Function ): IReduxDispatchProps => ( {
    popModal: () => dispatch( popModal() ),
    addModal: ( modal: React.ReactNode ) => dispatch( addModal( modal ) ),
    addError: ( message: string ) => dispatch( addError( message ) ),
    storeFoundEventList: ( eventList: IEventInfo[] ) => dispatch( storeFoundEventList( eventList ) ),
} );

export default connect<IReduxStateProps, IReduxDispatchProps, IOwnProps, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps
)( Search );

