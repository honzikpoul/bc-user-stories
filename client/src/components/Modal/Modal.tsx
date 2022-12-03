import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';


//component state
interface IStateProps {

}

//component props
interface IOwnProps {
    closable: boolean,
    dialogCloseListener: Function,
    children: React.ReactElement
}

type Props = IOwnProps;

export default class Modal extends React.PureComponent<Props, IStateProps> {

    static propTypes = {
        closable: PropTypes.bool,
        dialogCloseListener: PropTypes.func
    }

    static defaultProps = {
        closable: true,
        dialogCloseListener: () => { alert( 'you should set dialogCloseListener' ) },
    }

    onCloseClick = ( event: React.MouseEvent<HTMLElement> ) => {
        event.preventDefault();
        if ( this.props.closable ) {
            this.props.dialogCloseListener();
        }
    }

    onModalClick = ( event: React.MouseEvent<HTMLElement> ) => {
        event.stopPropagation();
    }

    render() {

        return ( <React.Fragment>

            <div className={ styles.modal } onClick={ this.onCloseClick } >

                <div className={ styles.modalContent } onClick={ this.onModalClick }  >
                    { this.props.closable &&
                        <span className={ styles.close } onClick={ this.onCloseClick }>&times;</span>
                    }
                    { this.props.children }
                </div>

            </div>

        </React.Fragment> );
    }

}



