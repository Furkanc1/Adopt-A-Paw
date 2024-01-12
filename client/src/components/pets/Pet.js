import { useContext } from "react";
import { StateContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function Pet({pet}) {
    const navigate = useNavigate();
    let { user } = useContext(StateContext);

    const adoptPet = () => {
        console.log(`Adopt Me`, pet);
    }

    const isAdoptionDisabled = () => {
        let disabled = false;
        if (user == null) {
          disabled = true;
        }
        return disabled;
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
            <button className={`adoptPetButton blackButton`} onClick={() => isAdoptionDisabled() == true ? navigate(`/sign-in`) : adoptPet()}>{isAdoptionDisabled() == true ? `Sign In to Adopt` : `Adopt Me`}</button>
        </div>
    )
}