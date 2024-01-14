import { Suspense, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { StateContext, placeholderPetImage } from "../../App";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const petCardDevLogs = false;

export default function Pet({pet}) {
    const navigate = useNavigate();
    // let [button, setButton] = useState({});
    let { user, petToEdit, setPetToEdit } = useContext(StateContext);

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

    // Impossible if conditions here so that the linter is satisfied
    if (updatePetLoading && petCardDevLogs == true) console.log(`Pet Form updatePetLoading`, updatePetLoading);
    if (updatePetError) console.log(`Pet Form updatePetError`, updatePetError);
    // This condition will show up
    if (updatePetData && petCardDevLogs == true) console.log(`Pet Form updatePetData`, updatePetData);

    const [deletePetMutation, { data: deletePetData, loading: deletePetLoading, error: deletePetError }] = useMutation(gql`
        mutation DeletePet($petId: ID!) {
            deletePet(petId: $petId) {
                success
                message
                deletedPetId
            }
        }
    `);

    if (deletePetLoading && petCardDevLogs == true) console.log(`Pet Form deletePetLoading`, deletePetLoading);
    if (deletePetError) console.log(`Pet Form deletePetError`, deletePetError);
    if (deletePetData && petCardDevLogs == true) console.log(`Pet Form deletePetData`, deletePetData);

    const deletePet = async () => {
        // console.log(`Delete Pet`, pet);
        // setPets(prevPets => prevPets.filter(petWeAreLoopingOver => petWeAreLoopingOver._id != pet._id));
        try {
            await deletePetMutation({ variables: { petId: pet._id } });
            let petFormElement = document.querySelector(`.petForm`);
            petFormElement.reset();
        } catch (error) {
            console.log(`Error Deleting Pet`, {error, pet});
        }
    }

    const adoptPet = async () => {
        try {
            await updatePetMutation({
                variables: {
                    petId: pet._id,
                    update: {
                      ownerId: user._id,
                    }
                }
            })
        } catch (error) {
            console.log(`Error Adopting Pet`);
        }

        // We are updating the pet here (based on the user pressing the enabled adopt button)
        // pet.ownerId = user._id;
        // pet.updatedAt = new Date().toLocaleString();
        
        // Once we update the pet object, we need to store that pet object back in the pets array.
        // This is done in state, so it will automatically update the cards as they are changed.
        // setPets(prevPets => {
        //     let updatedPetsAfterAdoption = prevPets.map(pt => {
        //         if (pt._id == pet._id) {
        //             return pet;
        //         } else {
        //             return pt;
        //         }
        //     })

        //     return updatedPetsAfterAdoption;
        // });

        // console.log(`Adopt Me Clientside`, pet);
    }

    const isAdoptionDisabled = () => {
        let disabled = false;
        if (user == null || (pet.ownerId && (user && user._id != pet.ownerId))) {
          disabled = true;
        }
        return disabled;
    }

    const cancelEditPet = () => {
        setPetToEdit(null);
        let petFormElement = document.querySelector(`.petForm`);
        petFormElement.reset();
    }

    // const determineCardButton = () => {
    //     let petHasOwner = pet.ownerId;
    //     let userIsSignedOut = user == null;
    //     let userOwnsPet = user && user._id == pet.ownerId;
    //     let petIsBeingEdited = petToEdit != null && petToEdit._id == pet._id;

    // We could do all this with one object in state, but instead we have it broken up into two different functions

    //     setButton({
    //         text: userIsSignedOut ? `Sign In to Adopt` : `Adopt Me`,
    //         function: () => userIsSignedOut ? navigate(`/sign-in`) : adoptPet()
    //     })

    //     let buttonText = userIsSignedOut ? `Sign In to Adopt` : `Adopt Me`;
        
    //     if (petHasOwner) {
    //         if (userOwnsPet) {
    //             if (petIsBeingEdited) {
    //                 buttonText = `Cancel`;
    //             } else {
    //                 buttonText = `Edit`;
    //             }
    //         } else {
    //             buttonText = `Adopted`;
    //         }
    //     }

    //     return buttonText;
    // }

    const determineCardButtonText = () => {
        let petHasOwner = pet.ownerId;
        let userIsSignedOut = user == null;
        let userOwnsPet = user && user._id == pet.ownerId;
        let petIsBeingEdited = petToEdit != null && petToEdit._id == pet._id;

        let buttonText = userIsSignedOut ? `Sign In to Adopt` : `Adopt Me`;
        
        if (petHasOwner) {
            if (userOwnsPet) {
                if (petIsBeingEdited) {
                    buttonText = `Cancel`;
                } else {
                    buttonText = `Edit`;
                }
            } else {
                buttonText = `Adopted`;
            }
        }

        return buttonText;
    }

    const determineCardButtonFunction = () => {
        let petHasOwner = pet.ownerId;
        let userIsSignedOut = user == null;
        let userOwnsPet = user && user._id == pet.ownerId;
        let petIsBeingEdited = petToEdit != null && petToEdit._id == pet._id;

        let buttonFunction = () => userIsSignedOut ? navigate(`/sign-in`) : adoptPet();

        if (petHasOwner) {
            if (userOwnsPet) {
                if (petIsBeingEdited) {
                    buttonFunction = () => cancelEditPet();
                } else {
                    buttonFunction = () => setPetToEdit(pet);
                }
            } else {
                buttonFunction = () => null;
            }
        }

        return buttonFunction();
    }

    return (
        <div className={`pet flexColumn card alignCenter flex justifyCenter ${user && pet.ownerId == user._id ? `owned` : ``} ${user && pet.ownerId == user._id && petToEdit && petToEdit != null && petToEdit._id == pet._id ? `editing` : ``}`} title={determineCardButtonText() == `Adopted` ? `Owned by ${pet.owner.username}` : ``}>
            <Suspense fallback={<LazyLoadImage effect="blur" src={placeholderPetImage} className={`petPic petField`} alt={`Image of Pet`} width={`auto`} height={`auto`} />}>
                {pet.publicImageURL && <LazyLoadImage effect="blur" src={pet.publicImageURL} className={`petPic petField`} alt={`Image of Pet`} width={`auto`} height={`auto`} />}
            </Suspense>
            <div className={`petDetails`}>
                <div className={`petName petField`}>{pet.name}</div>
                <div className={`petSpecies petSubField petField`}><strong><i>Species: {pet.species}</i></strong></div>
                <div className={`petPower petSubField petField`}><strong><i>Power: {pet.power && pet.power}</i></strong></div>
                {/* {inDevEnv() && <div className={`petUpdated petSubField petField`}><strong><i className={`flex flexColumn`}><span style={{textDecoration: `underline`}}>Updated</span> <span>{pet.updatedAt && pet.updatedAt}</span></i></strong></div>} */}
            </div>
            {/* Conditionally render the adopt button display dependin on if they are logged in or not. */}
            {/* In addition to not being signed in, when the click the button, re-direct to the sign in page. */}
            {/* Try to re-purpose something instead of deleting and wasting it.*/}
            <div className={`petCardButtons flex gap5 justifySpaceBetween`}>
                <button title={determineCardButtonText() == `Adopted` ? `Owned by ${pet.owner.username}` : determineCardButtonText()} disabled={isAdoptionDisabled()} className={`adoptPetButton blackButton ${isAdoptionDisabled() == true ? `disabled` : ``}`} onClick={() => determineCardButtonFunction()}>{determineCardButtonText()}</button>
                {user && user != null && user._id == pet.ownerId && <button title={`Delete Pet`} onClick={() => deletePet()} className={`adoptPetButton blackButton`}>Delete</button>}
            </div>
        </div>
    )
}