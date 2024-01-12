import { StateContext } from "../../App";
import { useState, useContext } from "react";

export default function PetForm() {
    let { user, setPets } = useContext(StateContext);
    let [formData, setFormData] = useState({});

    const updateFormState = (e) => {
        let { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const addPet = (e) => {
        e.preventDefault();

        let petToAdd = {
            ...formData,
            creatorId: user._id,
            age: parseFloat(Math.floor(formData.age))
        }

        console.log(`Add Pet`, petToAdd);
        setPets(prevPets => [...prevPets, petToAdd]);
        e.target.reset();
    }

    return (
        <form id={`addPetForm`} className={`alignCenter flex gap5 justifyCenter petForm`} onSubmit={(e) => addPet(e)} onChange={(e) => updateFormState(e)}>
            <input name={`name`} type={`text`} placeholder={`Enter Pet Name...`} required />
            <input name={`species`} type={`text`} placeholder={`Enter Pet Species...`} required />
            <input name={`age`} className={`petAge`} type={`number`} step={1} max={120} min={0} style={{maxWidth: 65}} placeholder={`Age...`} required />
            <button className={`blackButton`} type={`submit`}>Add</button>
        </form>
    )
}