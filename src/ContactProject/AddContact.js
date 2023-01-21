import React, { useContext, useRef } from 'react'
import "./Style.css"
import { dataContext } from './Home';

function AddContact() {
    const { contacts, dispatch } = useContext(dataContext)
    const nameRef = useRef(),
        phoneRef = useRef(),
        cityRef = useRef();

    const func = () => {
        if (nameRef.current.value !== "" && phoneRef.current.value !== "" && cityRef.current.value !== "") {

            dispatch({ Type: "Add", Value: { id: contacts.length + 1, Name: nameRef.current.value, Phone: phoneRef.current.value, City: cityRef.current.value } })
            window.alert("Le contact a été ajouté avec succès");
        } else {
            window.alert("Veuillez Remplire tous les champs avant d'ajouter!");
        }
    }
    return (
        <>
            <div id="Form">
                <div>
                    <div style={{ marginRight: "10px", height: "50px", width: "5px", backgroundColor: "#6ac8d2", borderRadius: "20px" }}></div>
                    <input type="text" ref={nameRef} placeholder='Entrer Le Nom Complet' />
                </div>
                <div>
                    <div style={{ marginRight: "10px", height: "50px", width: "5px", backgroundColor: "#6ac8d2", borderRadius: "20px" }}></div>
                    <input type='tel' ref={phoneRef} placeholder='Entrer Le Numero de Telephone' />
                </div>
                <div>
                    <div style={{ marginRight: "10px", height: "50px", width: "5px", backgroundColor: "#6ac8d2", borderRadius: "20px" }}></div>
                    <input type="text" ref={cityRef} placeholder='Entrer La Ville' />
                </div>
            </div>
            <div id="Buttons" onClick={func}>
                <button id='AddButton'>
                    <span className="material-symbols-outlined">
                        person_add
                    </span>
                    Ajouter Contact</button>
            </div>
        </>
    )
}

export default AddContact