import React from 'react';
import {fa} from "timeago.js/lib/lang";

const Modal = (props) => {

    const {visible, onDeleteCancel, message} = props;

    let className = "modal fade";
    if (visible){
        className += " show d-block";
    }

    return (
        <div className={className} style={{background: "#000000b0"}} aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" >Delete Post</h5>
                        <button onClick={onDeleteCancel} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <button onClick={onDeleteCancel} type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;