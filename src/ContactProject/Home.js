import React, { createContext, useEffect, useReducer, useRef, useState } from 'react'
import ShowContact from './ShowContact';
import "./Style.css"
import { Link } from "react-router-dom"
import AddContact from './AddContact';

export const dataContext = createContext()
let data = [];
const initialValue = []
const reducer = (currentState, action) => {

    switch (action.Type) {
        case "Add":
            data = [...currentState, action.Value];
            return data;
        case "Remove":
            data = currentState.filter(c => c.id !== action.Value)
            return data;
        case "OrderAsc":
            return [...currentState.sort((a, b) => {
                return a.Name.toUpperCase() < b.Name.toUpperCase() ? -1 : a.Name.toUpperCase() > b.Name.toUpperCase() ? 1 : 0
            })];
        case "OrderDesc":
            return [...currentState.sort((a, b) => {
                return a.Name.toUpperCase() < b.Name.toUpperCase() ? 1 : a.Name.toUpperCase() > b.Name.toUpperCase() ? -1 : 0
            })];
        default:
            return currentState;
    }
}


function Home() {
    const [toggle, setToggle] = useState(false);
    const [contacts, dispatch] = useReducer(reducer, initialValue);
    const searchNameRef = useRef("");
    const [searchList, setSearchList] = useState([]);
    const search = () => {
        const temp = contacts.filter(c => c.City.toUpperCase() === searchNameRef.current.value.toUpperCase());
        temp.length === 0 ? alert("Aucun contact trouvé") : setSearchList(temp);
    }
    const reset = () => {
        setSearchList([])
        setToggle(false);
        searchNameRef.current.value = ""
    }
    useEffect(() => {
        setSearchList(contacts.filter(c => c.City.toUpperCase() === searchNameRef.current.value.toUpperCase()))
    }, [contacts])
    return (
        <div id='MainSection'>
            <div id="ContactSection">
                <div id="NavBar">
                    <div id="Logo" onClick={reset}>
                        <Link to="/">
                            <h3>Contact<span>App</span></h3>
                        </Link>
                    </div>
                    <div id='SearchSection'>
                        <input ref={searchNameRef} type="text" placeholder='Entrer Le Nom..' />
                        <div id="Search" onClick={search}>
                            <span className="material-symbols-outlined">
                                search
                            </span>
                        </div>
                    </div>
                </div>
                {
                    toggle === false && <>
                        <div id="ContactList">
                            {
                                contacts.length === 0 ? <div id='EmptyDiv'>La list de contact est vide!</div> : searchList.length > 0 ? <dataContext.Provider value={{ contacts: searchList, dispatch: dispatch }}><ShowContact /></dataContext.Provider> : <dataContext.Provider value={{ contacts: contacts, dispatch: dispatch }}><ShowContact /></dataContext.Provider>
                            }
                        </div>
                        <div id="Buttons">
                            <button className='SortButtons' onClick={() => dispatch({ Type: "OrderAsc" })}>
                                <span className="material-symbols-outlined">
                                    sort_by_alpha
                                </span>
                                Trier Cr.
                            </button>
                            <button id='AddButton' onClick={() => { setToggle(true) }}>
                                <span className="material-symbols-outlined">
                                    person_add
                                </span>
                                Ajouter Contact
                            </button>
                            <button className='SortButtons' onClick={() => dispatch({ Type: "OrderDesc" })}>
                                Trier Dec.
                                <span className="material-symbols-outlined">
                                    sort_by_alpha
                                </span>
                            </button>
                        </div>
                    </>
                }
                {
                    toggle && <dataContext.Provider value={{ contacts: contacts, dispatch: dispatch }}><AddContact /></dataContext.Provider>
                }
            </div>
        </div>
    )
}

export default Home