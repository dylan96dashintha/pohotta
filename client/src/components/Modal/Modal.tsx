import React, {useState, useEffect} from "react";
import ReactModal from 'react-modal';
import {useSelector, useDispatch} from 'react-redux';
import "./Modal.scss";
import Q from "../../common/icon/question.svg";
import { triggerAsyncId } from "async_hooks";
import { ClickAwayListener } from "@material-ui/core";
import {RootState} from "../../store/index";
import { closeDeleteBox } from "../../store/account/thunks";
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement("#root");

interface IModal {
    title?: string,
    desc?: string,
    cancelText?: string,
    onConfirm?(): any,
    setDefaultVisible?: boolean
    
    
}

const Modal = (props:IModal) => {
    const dispatch = useDispatch();
    const {desc, title, cancelText, onConfirm, setDefaultVisible} = props;
    const [modalIsOpen,setIsOpen] = useState(false);
    const [accountIsOpen,setIsAccountOpen] = useState(true);
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        dispatch(closeDeleteBox());
        
    }
    const deleteBoxIsOpen = (state: RootState) => state.deleteBox.showDeleteBox;
    const setDeleteBoxOpen = useSelector(deleteBoxIsOpen);
    console.log(setDeleteBoxOpen);
    useEffect(() => {
        if(setDeleteBoxOpen) {
            setIsOpen(true);
        }
    });

    const modal = (
       
        <ReactModal
            isOpen= {modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
            overlayClassName="Overlay"
            >

            <h2>{title}</h2>
            <p>{desc}</p>
            
            <div className= {`${cancelText? 'buttons': 'single-button'}`}>
                {(cancelText &&
                <button type="button" className= {`button  ${cancelText? 'two-button': ''}`}  onClick={closeModal}>{props.cancelText}</button>
                )}
                <button type="button" className={`button btn2 ${cancelText? 'two-button': 'button_return'}`} onClick={closeModal}>Ok</button>
            </div>
        </ReactModal>
);


    return (
        <>


            <div className="modal-wrapper">
                {(setDefaultVisible &&
                <img src={Q} alt="Twitter" onClick={openModal} className="modal-trigger"/>
                )}
                {modal}
                
                
            </div>


            
            
        </>
        
    );
}

export default Modal

