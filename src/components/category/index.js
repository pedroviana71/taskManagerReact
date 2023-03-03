import {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
} from "../../app/api/tasksSlice";
import { useEffect, useState } from "react";
import { SliderPicker } from "react-color";
import { useNavigate } from "react-router-dom";

const Category = () => {
    let { data } = useGetCategoriesQuery();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [createCategory] = useCreateCategoryMutation();
    const navigate = useNavigate();

    const handleColor = (color) => {
        setColor(color.hex);
    };

    useEffect(() => {
        setCategories(data)
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, color);
        createCategory({ name, color });
        setCategories([...data, { name, color }]);
    };

    const handleGoBack = () => {
        navigate("/create-task");
    };


    return (
        <div>
            {categories?.map((category) => (
                <div key={category._id}>
                    <p>{category.name}</p>
                </div>
            ))}
            <p>Criar Categoria + </p>
            <textarea name="name" onChange={(e) => setName(e.target.value)} />
            <SliderPicker color={color} onChangeComplete={handleColor} />
            <button onClick={handleSubmit}>Criar categoria</button>
            <button onClick={handleGoBack} >
                Cancelar
            </button>
        </div>
    );
};

export default Category;
