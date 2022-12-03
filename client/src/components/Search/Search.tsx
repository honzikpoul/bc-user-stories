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
    eventType: string,//'CONSTRUCTION' | 'SPECIAL_EVENT' | 'INCIDENT' | 'WEATHER_CONDITION' | 'ROAD_CONDITION',
    severity: string,
    startDate: string,
    loading: boolean
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
            eventType: "",
            severity: "",
            startDate: "",
            loading: false
        }
    }

    onKeyEnterPressedSearch = ( event: React.KeyboardEvent<HTMLInputElement> ): void => {
        if ( event.key === 'Enter' ) {
            this.searchListener();
        }
    }

    searchListener = () => {

        this.setState( { loading: true } );
        searchEventList(
            this.state.eventType,
            this.state.severity,
            this.state.startDate,
            10,
            0
        ).then( ( response: AxiosResponse<IOpen511Response<IEventInfo>> ) => {
            const { data } = response;

            this.props.storeFoundEventList( data.events );
            this.setState( { loading: false } );
        } ).catch( ( error: AxiosError ) => {
            this.props.addError( error.message );
            this.setState( { loading: false } );
        } );

    }

    //As a user, I want to filter out events by Area, Severity, Event Type and Start Date
    //https://api.open511.gov.bc.ca/events?in_effect_on=2014-07-30T00:00,2014-12-31T23:59
    //https://api.open511.gov.bc.ca/events?event_type=WEATHER_CONDITION
    //https://api.open511.gov.bc.ca/events?area_id=drivebc.ca/3

    render() {

        return ( <React.Fragment>



            <select className="form-select form-select mb-3"
                onChange={ event => this.setState( { eventType: event.target.value } ) }>
                <option value="">All event types</option>
                <option value="CONSTRUCTION">CONSTRUCTION</option>
                <option value="SPECIAL_EVENT">SPECIAL_EVENT</option>
                <option value="INCIDENT">INCIDENT</option>
                <option value="WEATHER_CONDITION">WEATHER_CONDITION</option>
                <option value="ROAD_CONDITION">ROAD_CONDITION</option>
            </select>

            <div className="input-group mb-3">
                <span className="input-group-text">Start date:</span>
                <input type="date"
                    className="form-control"
                    placeholder="Date since (Optional)"
                    onChange={ event => this.setState( { startDate: event.target.value } ) }
                />
            </div>

            <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Severity</legend>

                <div className="col-sm-10">

                    <div className="form-check text-start">
                        <input className="form-check-input"
                            type="radio"
                            name="severity"
                            id="severity0"
                            value=""
                            onChange={ event => this.setState( { severity: event.target.value } ) }
                        />
                        <label className="form-check-label">ALL</label>
                    </div>

                    <div className="form-check  text-start">
                        <label className="form-check-label" >
                            <input className="form-check-input"
                                type="radio"
                                name="severity"
                                id="severity1"
                                value="MINOR"
                                onChange={ event => this.setState( { severity: event.target.value } ) }
                            />
                            MINOR
                        </label>
                    </div>

                    <div className="form-check text-start">
                        <label className="form-check-label">
                            <input className="form-check-input"
                                type="radio"
                                name="severity"
                                id="severity2"
                                value="MODERATE"
                                onChange={ event => this.setState( { severity: event.target.value } ) }
                            />
                            MODERATE
                        </label>
                    </div>

                    <div className="form-check text-start">
                        <label className="form-check-label" >
                            <input className="form-check-input"
                                type="radio"
                                name="severity"
                                value="MAJOR"
                                onChange={ event => this.setState( { severity: event.target.value } ) }
                            />
                            MAJOR
                        </label>
                    </div>

                    <div className="form-check text-start">
                        <label className="form-check-label" >
                            <input className="form-check-input"
                                type="radio"
                                name="severity"
                                id="severity4"
                                value="UNKNOWN"
                                onChange={ event => this.setState( { severity: event.target.value } ) }
                            />
                            UNKNOWN
                        </label>
                    </div>
                </div>
            </fieldset>

            <div className="d-grid gap-2">
                <button className={ `btn btn-lg btn-primary ${ this.state.loading ? 'disabled' : '' }` } type="button"
                    onClick={ this.searchListener } >
                    { this.state.loading && <React.Fragment>
                        Loading ...
                    </React.Fragment> }
                    { !this.state.loading && <React.Fragment>
                        Search
                    </React.Fragment> }
                </button>
            </div>


        </React.Fragment > );
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

