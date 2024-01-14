import { Suspense, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { StateContext, placeholderPetImage } from "../../App";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const petCardDevLogs = false;

export default function Pet({pet}) {
    const navigate = useNavigate();
    let { user } = useContext(StateContext);

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

    const determineCardButtonText = () => {
        let petHasOwner = pet.ownerId;
        let userIsSignedOut = user == null;
        let userOwnsPet = user && user._id == pet.ownerId;

        let buttonText = userIsSignedOut ? `Sign In to Adopt` : `Adopt Me`;
        
        if (petHasOwner) {
            if (userOwnsPet) {
                buttonText = `Edit`;
            } else {
                buttonText = `Adopted`;
            }
        }

        return buttonText;
    }

    const editPet = () => {
        console.log(`Edit this Pet`, pet);
    }

    const determineCardButtonFunction = () => {
        let petHasOwner = pet.ownerId;
        let userIsSignedOut = user == null;
        let userOwnsPet = user && user._id == pet.ownerId;

        let buttonFunction = () => userIsSignedOut ? navigate(`/sign-in`) : adoptPet();

        if (petHasOwner) {
            if (userOwnsPet) {
                buttonFunction = () => editPet();
            } else {
                buttonFunction = () => null;
            }
        }

        return buttonFunction();
    }

    return (
        <div className={`pet flexColumn card alignCenter flex justifyCenter ${user && pet.ownerId == user._id ? `owned` : ``}`}>
            <Suspense fallback={<LazyLoadImage effect={`blur`} src={placeholderPetImage} className={`petPic petField`} alt={`Image of Pet`} width={`auto`} height={`auto`} />}>
                {pet.publicImageURL && <LazyLoadImage effect={`blur`} src={pet.publicImageURL} className={`petPic petField`} alt={`Image of Pet`} width={`auto`} height={`auto`} />}
            </Suspense>
            <div className={`petDetails`}>
                <div className={`petName petField`}>{pet.name}</div>
                <div className={`petSpecies petSubField petField`}><strong><i>Species: {pet.species}</i></strong></div>
                <div className={`petSpecies petSubField petField`}><strong><i>Power: {pet.power && pet.power}</i></strong></div>
            </div>
            {/* Conditionally render the adopt button display dependin on if they are logged in or not. */}
            {/* In addition to not being signed in, when the click the button, re-direct to the sign in page. */}
            {/* Try to re-purpose something instead of deleting and wasting it.*/}
            <div className={`petCardButtons flex gap5 justifySpaceBetween`}>
                <button disabled={isAdoptionDisabled()} className={`adoptPetButton blackButton ${isAdoptionDisabled() == true ? `disabled` : ``}`} onClick={() => determineCardButtonFunction()}>{determineCardButtonText()}</button>
                {user && user != null && user._id == pet.ownerId && <button title={`Delete Pet`} onClick={() => deletePet()} className={`deletePetButton blackButton`}>Delete</button>}
            </div>
        </div>
    )
}