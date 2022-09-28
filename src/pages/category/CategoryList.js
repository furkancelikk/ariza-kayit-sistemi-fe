import React, {useState} from 'react';
import Spinner from "../../components/Spinner";
import CategoryListItem from "../../components/CategoryListItem";
import {getOldCategories, getOldPosts} from "../../api/apiCalls";

const CategoryList = (props) => {

    const {categoryPage, setCategoryPage, categoryApi: apiProcess, setCategoryApi: setApiProcess, deleteCategorySuccess} = props;
    const [loadMoreProcess, setLoadMoreProcess] = useState(false);

    const loadOldCategory = async () => {
        setLoadMoreProcess(true);
        const lastCategoryIndex = categoryPage.content.length - 1;
        const lastCategoryID = categoryPage.content[lastCategoryIndex].id;

        try {
            const response = await getOldCategories(lastCategoryID);
            setCategoryPage(prevPage => ({
                ...response.data,
                content: [...prevPage.content, ...response.data.content]
            }));
        } catch (error) {
        }
        setLoadMoreProcess(false);
    }

    if (apiProcess){return (<div><Spinner/></div>);}

    return (
        <div>

            {
                categoryPage.content.map(category => (
                    <CategoryListItem key={category.id} category={category} deleteCategorySuccess={deleteCategorySuccess}/>
                ))
            }
            {
                !categoryPage.last &&
                <div onClick={loadMoreProcess ? () => {} : loadOldCategory} style={{cursor: "pointer"}} className="alert alert-secondary text-center mt-1">
                    {
                        loadMoreProcess ? <Spinner/> : "Load more..."
                    }
                </div>
            }
        </div>
    );
};

export default CategoryList;