import { createStore, applyMiddleware, combineReducers, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import modal from './reducers/modal-reducer';
import { ModalState } from './types/redux/ModalTypes';
import event from './reducers/event-reducer';
import { EventState } from './types/redux/EventTypes';
import search from './reducers/search-reducer';
import { SearchState } from './types/redux/SearchTypes';

export interface ApplicationState {
    modalReducer: ModalState,
    eventReducer: EventState,
    searchReducer: SearchState,
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>( {
    modalReducer: modal,
    eventReducer: event,
    searchReducer: search
} );

export type RootState = ReturnType<typeof rootReducer>;

export default createStore( rootReducer, composeWithDevTools( applyMiddleware( ReduxThunk ) ) );
