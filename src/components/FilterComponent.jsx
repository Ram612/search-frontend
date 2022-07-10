import React, { useEffect, useState } from "react";
import axios from "axios";

const accessToken = 'QnJxdndgUyKWJOnlqq8UqCHz6k5tCYn9MqCR6Lr4';
const apiUrl = 'https://api.packt.com/api/v1/products';

const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

function FilterComponent() {

    const [data, setData]  = useState([]);
    const [input,setInput] = useState("");

    const fetchData = async () =>{
        // Local API handling
        // const response = await fetch("http://127.0.0.1:8000/api/books");
        // const data = await response.json();
        // setData(data);

        // Packt API
        const response = await authAxios.get(``);
        setData(response.data.products);
    }

    useEffect(()=> {
        fetchData();
    }, []);

    return <>
        <div className="title">
            <h1 className="heading">Search Books from Packt</h1>
        </div>
        <div className="body">
            <input
                className="input-style" 
                type="text" 
                name="book"
                placeholder="Search titles..." 
                onChange={(e)=> setInput(e.target.value)}
            />

            <h2>List of Books</h2>
            <span>From Packt</span>
            <ul className="items-unorder">
                {data
                    .filter((data) => data.title.toLowerCase().includes(input))
                    .map((items)=> {
                    return (
                        <>  
                            <li className="items-list" key={items.id}>
                                <div className="card">
                                    <div className="card-content">
                                        <h3>
                                            {items.title}
                                        </h3>
                                        <span className="sub-title">
                                            {items.authors}
                                        </span>
                                    </div>
                                    <div className="edge-right"></div>
                                </div>
                            </li>  
                        </>
                    );
                })}
            </ul> 
        </div>
    </>;
}
export default FilterComponent;