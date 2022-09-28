import React, {useState} from 'react';
import {useSelector} from "react-redux";
import * as UserRole from "../shared/UserRole";
import Modal from "./Modal";
import {deleteCategoryByID} from "../api/apiCalls";

const CategoryListItem = (props) => {

    const {category, deleteCategorySuccess} = props;
    const {role} = useSelector(store => ({
        role: store.role
    }));
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteApi, setDeleteApi] = useState(false);

    const deleteCategory = async () => {
        setDeleteApi(true);
        const response = await deleteCategoryByID(category.id);
        setDeleteApi(false);
        deleteCategorySuccess(category.id);
        setModalVisible(false);
    }

    return (
        <div className="card mb-3">
            <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                    <div>
                        {category.name}
                        <p className="small text-black-50">Total post: {category.postCount}</p>
                    </div>
                </div>
                {
                    role == UserRole.ADMIN &&
                    <div>
                        <button onClick={() => setModalVisible(true)} className="btn btn-delete-link small"
                                style={{outline: "none"}}>
                            <span className="material-icons">delete</span>
                        </button>

                        <Modal visible={modalVisible} onCancel={() => setModalVisible(false)} onSubmit={deleteCategory}
                               apiCall={deleteApi}
                               title="Delete Category"
                               message={`Are you sure you want to delete ${category.name}? This category and its posts are will be deleted.`} submitText="Delete"
                               submitBtnClass="btn-danger"/>
                    </div>
                }
            </div>
        </div>
    );
};

export default CategoryListItem;