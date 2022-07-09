import React, { useEffect, useState } from "react";

function FilterComponent() {

    const [data, setData] = useState([]);
    const [input,setInput] = useState("");

    const fetchBook = async () =>{
        const response = await fetch("http://127.0.0.1:8000/api/books");
        setData(await response.json());
    }

    // const fetchBook = () => {
    //     fetch("http://127.0.0.1:8000/api/books")
    //         .then(response => response.json())
    //         .then(data => {
    //             setData(data.book);
    //             console.log(data);
    //         })
    //         .catch(err=>console.log(err));
    // };

    useEffect(()=> {
        fetchBook();
    }, []);

    return <>
        <div className="title">
            <h1>Search books from Packt</h1>
        </div>
        <div className="body">
            <input
                className="input-style" 
                type="text" 
                name="book"
                onChange={(e)=> setInput(e.target.value)}
            />

            <h2>List of Books</h2>
            <ul className="items-unorder">
                {data
                    .filter((data) => data.book_title.toLowerCase().includes(input))
                    .map((items)=> {
                    return (
                    <>
                        <li className="items-list" key={items.id}>
                            {items.book_title}
                        </li>
                    </>
                    );
                })} 
            </ul>
        </div>
    </>;
}
export default FilterComponent;