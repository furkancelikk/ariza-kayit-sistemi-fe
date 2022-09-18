import React from 'react';

const ButtonWithProgress = (props) => {
    const {disabled, onClick, isApiCall, text, className} = props;

    return (
        <button disabled={disabled} className={className || "btn btn-primary"} onClick={onClick}>
            {isApiCall &&
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            }
            &nbsp;{text}
        </button>
    );
};

export default ButtonWithProgress;