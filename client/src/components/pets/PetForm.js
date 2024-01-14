import { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { StateContext, placeholderPetImage } from "../../App";
import { capitalizeAllWordsInString, reformatDatesOnMongoDBObject } from "../../helper";

export const petFormDevLogs = false;

export default function PetForm() {
    let { user, users, petToEdit, screenWidth, mobileBreakPoint, setPetToEdit } = useContext(StateContext);
    let [formData, setFormData] = useState({});

    const [addPetMutation, { loading: addPetLoading, error: addPetError, data: addPetData }] = useMutation(gql`
        mutation AddPet($newPet: NewPetInput!) {
            addPet(newPet: $newPet) {
                _id
                name
                power
                species
                ownerId
                creatorId
                publicImageURL
            }
        }
    `);

    const [updatePetMutation, { data: updatePetData, loading: updatePetLoading, error: updatePetError }] = useMutation(gql`
        mutation UpdatePet($petId: ID!, $update: UpdatePetInput!) {
            updatePet(petId: $petId, update: $update) {
                _id
                name
                power
                species
                ownerId
                publicImageURL
            }
        }
    `);
    
    // These if conditions are also just to satisfy the linter
    if (addPetLoading && petFormDevLogs == true) console.log(`Pet Form addPetLoading`, addPetLoading);
    if (addPetError) console.log(`Pet Form addPetError`, addPetError);
    // The line below however can run
    if (addPetData && petFormDevLogs == true) console.log(`Pet Form addPetData`, addPetData);

    if (updatePetLoading && petFormDevLogs == true) console.log(`Pet Form updatePetLoading`, updatePetLoading);
    if (updatePetError) console.log(`Pet Form updatePetError`, updatePetError);
    if (updatePetData && petFormDevLogs == true) console.log(`Pet Form updatePetData`, updatePetData);

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
            let { name, species, power, publicImageURL } = formData;

            if (publicImageURL == null || publicImageURL == undefined || publicImageURL == ``) publicImageURL = placeholderPetImage;

            if (petToEdit == null) {
                // This mutation is for adding a pet into the database, it returns an object called data that contains a property called addPet.
                // That addPet property contains the pet we just stored in the database
                // When we succesfully put a (post request) resource in the db, mongoDB emits a signal that either contains an error or the resource you just created (if succesful)
                const { data } = await addPetMutation({
                    variables: {
                        newPet: {
                            publicImageURL,
                            ownerId: user._id,
                            creatorId: user._id,
                            power: parseFloat(Math.floor(power)),
                            name: capitalizeAllWordsInString(name),
                            species: capitalizeAllWordsInString(species),
                        },
                    },
                });

                // Successfull Add Pet
                let petAdded = reformatDatesOnMongoDBObject(data.addPet);
                if (petAdded != null && petAdded != undefined) {
                    //   inDevEnv() && console.log(`Pet Added Successfully`, petAdded);
                    //   setPets(prevPets => [...prevPets, petAdded]);
                    e.target.reset();
                }
            } else {
                let { name, species, power, publicImageURL, ownerId } = e.target;

                await updatePetMutation({
                    variables: {
                        petId: petToEdit._id,
                        update: { 
                            name: name.value, 
                            species: species.value, 
                            power: parseFloat(power.value), 
                            publicImageURL: publicImageURL.value, 

                            // Conditional Property inside of an Object
                            // Use ...() to open up the conditional object inserts
                            ...(ownerId.value != `No Owner` && {
                                ownerId: ownerId.value
                            }),

                            // You can also do a ternary where you "insert x property, else insert y property"
                            // ...(ownerId.value != `No Owner` ? {
                            //     ownerId: ownerId.value
                            // } : {
                            //     noOwner: true
                            // })
                        }
                    }
                })

                setPetToEdit(null);
                e.target.reset();
            }

        } catch (error) {
            console.log(`Error adding pet`, error);
            console.log(`GraphQL errors on Pet Form`, error.graphQLErrors);
            console.log(`Network errors on Pet Form`, error.networkError);
        }
    }

    return (
        <form 
            id={`${petToEdit == null ? `addPetForm` : `editPetForm`}`}
            onSubmit={(e) => onFormSubmit(e)} onChange={(e) => updateFormState(e)}
            className={`alignCenter flex ${screenWidth < mobileBreakPoint ? `flexColumn` : ``} gap5 justifyCenter petForm ${petToEdit == null ? `addPetForm` : `editPetForm`}`}
        >
            <input 
                required 
                name={`name`} 
                type={`text`} 
                className={`petName`} 
                placeholder={`Enter Pet Name...`} 
                defaultValue={petToEdit == null ? `` : petToEdit.name} 
            />
            <input 
                required 
                type={`text`} 
                name={`species`} 
                className={`petSpecies`} 
                placeholder={`Enter Pet Species...`} 
                defaultValue={petToEdit == null ? `` : petToEdit.species} 
            />
            <input 
                min={0} 
                step={1} 
                required 
                max={99999} 
                name={`power`} 
                type={`number`} 
                className={`petPwr`} 
                placeholder={`Power...`} 
                defaultValue={petToEdit == null ? `` : petToEdit.power} 
            />
            <input 
                type={`text`} 
                className={`petImage`} 
                name={`publicImageURL`} 
                placeholder={`Public Image URL...`} 
                defaultValue={petToEdit == null ? `` : petToEdit.publicImageURL} 
            />

            {/* React fragment: Use empty brackets, it will give you a virtual container that won't show up on the front end. It is a nice way to group elements together to provide a cleaner look. */}
            {petToEdit != null && petToEdit.ownerId && <>
                <select name={`ownerId`} className={`petOwner`} defaultValue={petToEdit != null && petToEdit.ownerId ? petToEdit.ownerId : `No Owner`}>
                    <option value={`No Owner`}>No Owner</option>
                    {users && Array.isArray(users) && users.length > 0 && users.map((usr, usrIndex) => {
                        return <option key={usrIndex} value={usr._id}>Owner: {usr.username}</option>
                    })}
                </select>
            </>}
            <button className={`petFormSubmitButton blackButton`} type={`submit`}>{petToEdit == null ? `Add` : `Save`}</button>
            {petToEdit != null && <button type={`button`} onClick={() => setPetToEdit(null)} className={`petFormCancelButton blackButton`}>Cancel</button>}
        </form>
    )
}