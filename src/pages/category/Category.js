import React, {useEffect, useState} from 'react';
import CategoryList from "./CategoryList";
import CategorySubmit from "./CategorySubmit";
import {getCategories} from "../../api/apiCalls";
import {useSelector} from "react-redux";
import * as UserRole from "../../shared/UserRole";

const Category = (props) => {

    const [categoryPage, setCategoryPage] = useState({
        content: [],
        size: 5,
        number: 0,
        last: true
    });
    let {role} = useSelector(store => ({role: store.role}));
    role = props.role ? props.role : role;
    const [categoryApi, setCategoryApi] = useState(false);
    const [categorySubmitApi, setCategorySubmitApi] = useState(false);

    const getAllCategory = async () => {
        setCategoryApi(true);
        const response = await getCategories(false, categoryPage.number, categoryPage.size);
        setCategoryPage(response.data);
        setCategoryApi(false);
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    const deleteCategorySuccess = (id) => {
        setCategoryPage(prevState => ({
            ...prevState,
            content: prevState.content.filter(item => item.id !== id)
        }))
    }

    const onSubmitCategory = (category) => {
        setCategoryPage(prevPage => ({
            ...prevPage,
            content: [category, ...prevPage.content]
        }));
    }

    return (
        <div>
            {
                role == UserRole.ADMIN &&
                <CategorySubmit categorySubmitApi={categorySubmitApi} setCategorySubmitApi={setCategorySubmitApi}
                                onSubmitCategory={onSubmitCategory}/>
            }
            <CategoryList deleteCategorySuccess={deleteCategorySuccess} categoryPage={categoryPage}
                          setCategoryPage={setCategoryPage}
                          categoryApi={categoryApi} setCategoryApi={setCategoryApi}/>
        </div>
    );
};

export default Category;