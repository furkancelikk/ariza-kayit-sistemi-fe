import {toast} from "react-toastify";

export const toastSuccess = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
    });

    // toast.error("Error Notification !", {
    //     position: toast.POSITION.TOP_RIGHT,
    // });

    // toast.warn("Warning Notification !", {
    //     position: toast.POSITION.TOP_RIGHT,
    // });
    //
    // toast.info("Info Notification !", {
    //     position: toast.POSITION.TOP_RIGHT,
    // });
    //
    // toast("Custom Style Notification with css class!", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     className: 'foo-bar'
    // });
}

export const toastError = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
    });
}