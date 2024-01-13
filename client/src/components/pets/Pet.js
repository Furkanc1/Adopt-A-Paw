import { useContext } from "react";
import { StateContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function Pet({pet}) {
    const navigate = useNavigate();
    let { user, setPets } = useContext(StateContext);

    const adoptPet = () => {
        // We are updating the pet here (based on the user pressing the enabled adopt button)
        pet.adopted = true;
        pet.ownerId = user._id;
        pet.updatedAt = new Date().toLocaleString();
        
        // Once we update the pet object, we need to store that pet object back in the pets array.
        // This is done in state, so it will automatically update the cards as they are changed.
        setPets(prevPets => {
            let updatedPetsAfterAdoption = prevPets.map(pt => {
                if (pt._id == pet._id) {
                    return pet;
                } else {
                    return pt;
                }
            })

            return updatedPetsAfterAdoption;
        });

        console.log(`Adopt Me`, pet);
    }

    const isAdoptionDisabled = () => {
        let disabled = false;
        if (user == null || pet.adopted == true) {
          disabled = true;
        }
        return disabled;
    }

    const determineCardButtonText = () => {
        let buttonText = `Adopt Me`;
        
        if (isAdoptionDisabled() == true) {
            if (pet.adopted == true) {
                buttonText = `Adopted`;
            } else {
                buttonText = `Sign In to Adopt`;
            }
        }

        return buttonText;
    }

    return (
        <div className={`pet flexColumn card alignCenter flex justifyCenter`}>
            {pet.publicImageURL && <img src={pet.publicImageURL} className={`petPic petField`} alt={`Image of Pet`} />}
            <div className={`petDetails`}>
                <div className={`petName petField`}>{pet.name}</div>
                <div className={`petSpecies petField`}>{pet.species}, Age {pet.age && pet.age}</div>
            </div>
            {/* Conditionally render the adopt button display dependin on if they are logged in or not. */}
            {/* In addition to not being signed in, when the click the button, re-direct to the sign in page. */}
            {/* Try to re-purpose something instead of deleting and wasting it.*/}
            <button disabled={isAdoptionDisabled()} className={`adoptPetButton blackButton ${isAdoptionDisabled() == true ? `disabled` : ``}`} onClick={() => isAdoptionDisabled() == true ? navigate(`/sign-in`) : adoptPet()}>{determineCardButtonText()}</button>
        </div>
    )
}