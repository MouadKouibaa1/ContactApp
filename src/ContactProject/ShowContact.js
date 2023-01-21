import React, { useContext } from 'react'
import { dataContext } from './Home';

function ShowContact() {
    const { contacts, dispatch } = useContext(dataContext)
    return (
        <>
            <p>Tous les contacts</p>
            <div id="List">
                {
                    contacts.map(c =>
                        <div className="Contact" key={c.id}>
                            <div style={{ marginRight: "10px", height: "35px", width: "5px", backgroundColor: "#6ac8d2", borderRadius: "20px" }}></div>
                            <div className="ContactIcon" style={{ display: 'flex', justifyContent: "center" }}>
                                <span className="material-symbols-outlined" style={{ padding: "0px", color: "#6ac8d2", fontSize: "50px", margin: "0px" }}>
                                    person
                                </span>
                            </div>
                            <div className="FullName">{c.Name}</div>
                            <div className="Phone">{c.Phone}</div>
                            <div className="city">{c.City}</div>
                            <div className='DeleteButton' onClick={() => dispatch({ Type: "Remove", Value: c.id })}>
                                <span className="material-symbols-outlined">
                                    delete_forever
                                </span>
                            </div>
                        </div>)
                }
            </div>
        </>
    )
}

export default ShowContact