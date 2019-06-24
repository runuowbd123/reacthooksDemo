import * as React from 'react';

export enum MODAL_TYPE {
    'RESET_PWD_MODAL',
}

interface ModalState {
    visible: MODAL_TYPE;
    modalData?: any;
    updateModal?(state: ModalState): void;
    showResetModal?(modalData?: any): void;
    reset?(): void;
}

const initialState: ModalState = {
    visible: null,
};

const ModalCtx = React.createContext(initialState);

export class ModalProvider extends React.Component {

    public state: ModalState = {
        visible: null,
    };

    public updateModal = (state: ModalState) => {
        this.setState({
            ...this.state,
            ...state,
        });
    }

    public showResetModal = (modalData: any) => {
        this.updateModal({
            modalData,
            visible: MODAL_TYPE.RESET_PWD_MODAL,
        });
    }

    public reset = () => {
        this.setState({
            modalData: null,
            visible: null,
        });
    }

    public getValue(): ModalState {
        const { updateModal, reset, showResetModal, state } = this;
        return {
            reset,
            showResetModal,
            updateModal,
            visible: state.visible,
        };
    }

    public render() {
        return (
            <ModalCtx.Provider
                value={this.getValue()}
            >
                {this.props.children};
            </ModalCtx.Provider>
        );
    }
}

export default ModalCtx;
