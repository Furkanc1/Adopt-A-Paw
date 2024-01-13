import { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { StateContext, inDevEnv } from "../../App";

export const petFormDevLogs = false;

export default function PetForm() {
    let { user, setPets } = useContext(StateContext);
    let [formData, setFormData] = useState({});

    const [addPetMutation, { loading, error, data }] = useMutation(gql`
        mutation AddPet($newPet: NewPetInput!) {
            addPet(newPet: $newPet) {
                _id
                age
                name
                species
                adopted
                creatorId
            }
        }
    `);

    if (loading && petFormDevLogs == true) console.log(`Pet Form Loading`, loading);
    if (error && petFormDevLogs == true) console.log(`Pet Form Error`, error);
    if (data && petFormDevLogs == true) console.log(`Pet Form Data`, data);

    const updateFormState = (e) => {
        let { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        try {
            let { name, species, age } = formData;

            // This mutation is for adding a pet into the database, it returns an object called data that contains a property called addPet.
            // That addPet property contains the pet we just stored in the database
            // When we succesfully put a (post request) resource in the db, mongoDB emits a signal that either contains an error or the resource you just created (if succesful)
            const { data } = await addPetMutation({
                variables: {
                  newPet: {
                    name,
                    species,
                    adopted: false,
                    creatorId: user._id,
                    age: parseFloat(Math.floor(age))
                  },
                },
            });

            // Successfull Add Pet
            let petAdded = data.addPet;
            if (petAdded != null && petAdded != undefined) {
              inDevEnv() && console.log(`Pet Added Successfully`, petAdded);
              setPets(prevPets => [...prevPets, petAdded]);
              e.target.reset();
            }

        } catch (error) {
            console.log(`Error adding pet`, error);
            console.log(`GraphQL errors on Pet Form`, error.graphQLErrors);
            console.log(`Network errors on Pet Form`, error.networkError);
        }
    }

    return (
        <form id={`addPetForm`} className={`alignCenter flex gap5 justifyCenter petForm`} onSubmit={(e) => onFormSubmit(e)} onChange={(e) => updateFormState(e)}>
            <input name={`name`} type={`text`} placeholder={`Enter Pet Name...`} required />
            <input name={`species`} type={`text`} placeholder={`Enter Pet Species...`} required />
            <input name={`age`} className={`petAge`} type={`number`} step={1} max={120} min={0} style={{maxWidth: 65}} placeholder={`Age...`} required />
            <button className={`blackButton`} type={`submit`}>Add</button>
        </form>
    )
}