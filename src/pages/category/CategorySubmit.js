import React, {useState} from 'react';
import Input from "../../components/Input";
import ButtonWithProgress from "../../components/ButtonWithProgress";
import {createNewCategory} from "../../api/apiCalls";

const CategorySubmit = (props) => {

    const {categorySubmitApi, setCategorySubmitApi, onSubmitCategory} = props;
    const [category, setCategory] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = event => {
        setCategory(event.target.value);
        setErrors({});
    }

    const handleSubmit = async () => {
        setCategorySubmitApi(true);
        try {
            const body = {
                name: category
            }
            const response = await createNewCategory(body);
            onSubmitCategory(response.data);
            setCategory(null);
            setErrors({});
        }catch (error){
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
        setCategorySubmitApi(false);
    }

    return (
        <div>
            <Input label="Category Name" name="category" onChange={handleChange} error={errors.name} defaultValue={category}/>
            <div className="text-right mb-2">
                <ButtonWithProgress disabled={categorySubmitApi} onClick={handleSubmit} isApiCall={categorySubmitApi}
                                    text="Submit"
                />
            </div>
        </div>
    );
};

export default CategorySubmit;