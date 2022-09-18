import React from 'react';

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center m-3">
            <div className="spinner-border text-info">
                <span className="sr-only"> Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;