import React, { useState, useEffect } from "react";
import {
    useHistory,
    useParams
} from "react-router-dom"
import {
    getAllProducts,
    updateProduct
} from "../api"

const AdminEditProduct = ({ setAllProducts}) => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [inventory, setInventory] = useState("");
    const [image, setImage] = useState("");
    const [isActive, setIsActive] = useState(false)
    let history = useHistory();

    const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

    useEffect(() => {
        const getResult = async () => {
             const results = await getAllProducts()
             const productToEdit = results.filter(product => product.id == id)[0]
             setTitle(productToEdit.title)
             setDescription(productToEdit.description)
             setCategory(productToEdit.category)
             setPrice(productToEdit.price)
             setInventory(productToEdit.inventory)
             setImage(productToEdit.image)
             setIsActive(productToEdit.isActive)
             
        }
        getResult();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await updateProduct(id, title, description, category, price, inventory, image, isActive, JSON.parse(localStorage.getItem('userDetails')))
        if (response) {
            console.log("RESPONSE UPDATE PRODUCT", response)
            const products = await getAllProducts(JSON.parse(localStorage.getItem('userDetails')))
            console.log("AllProducts", products)
            setAllProducts(products)
            setTitle("");
            setDescription("");
            setCategory("");
            setPrice("");
            setInventory("");
            setImage("");
            setIsActive(false);
            setFormSubmittedSuccessfully(true);
        }
    }
    if (formSubmittedSuccessfully) {
        history.push("/admin")
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <h1 className="form-title">Edit This Product</h1>
                <div className="form-fields">
                    <label for="title"><b>Title</b></label>
                    <input
                        type="text" required
                        name="title"
                        placeholder="Enter Your Title"
                        value={title}
                        onChange=
                        {(event) => setTitle(event.target.value)}></input>
                    <label for="description"><b>Description</b></label>
                    <input
                        type="text" required
                        name="description"
                        placeholder="Enter Your Description"
                        value={description}
                        onChange=
                        {(event) => setDescripton(event.target.value)}></input>
                    <label for="category"><b>Category</b></label>
                    <input
                        type="text" required
                        name="category"
                        placeholder="Enter Your Category"
                        value={category}
                        onChange=
                        {(event) => setCategory(event.target.value)}></input>
                    <label for="price"><b>Price (Do not include dollar sign)</b></label>
                    <input
                        type="text" required
                        name="price"
                        placeholder="Enter Your Price"
                        value={price}
                        onChange=
                        {(event) => setPrice(event.target.value)}></input>
                    <label for="inventory"><b>Inventory</b></label>
                    <input
                        type="text" required
                        name="inventory"
                        placeholder="Enter the Inventory"
                        value={inventory}
                        onChange=
                        {(event) => setInventory(event.target.value)}></input>
                    <label for="image"><b>Image Link</b></label>
                    <input
                        type="text" required
                        name="image"
                        placeholder="Enter An Image Link"
                        value={image}
                        onChange=
                        {(event) => setImage(event.target.value)}></input>
                </div>
                <label>Would You Like This Product To Be Active?</label>
                <input
                    type="checkbox"
                    value={isActive} onChange={(event) => setIsActive(event.target.checked)}></input>

                <button className="btn-form" type="submit" >Submit</button>
            </form>
        </div>
    )
}

export default AdminEditProduct;
