import Pet from "./Pet";
import PetForm from "./PetForm";
import { useContext } from "react";
import { StateContext } from "../../App";

export default function Pets({showForm}) {
    let { pets, user } = useContext(StateContext);
    return (
        // Conditionally rendering the pets display if the array contains valid pets
        <div className={`petsDiv`}>
            {pets != null && Array.isArray(pets) && <h2>{pets.length} Pet(s)</h2>}
            {showForm && user != null && <>
                <PetForm />
            </>}
            <div className={`pets flex gap15`}>
                {pets != null && Array.isArray(pets) ? <>
                    {pets.length > 0 ? <>
                        {pets.map((pet, petIndex) => {
                            return <Pet pet={pet} key={petIndex} />
                        })}
                    </> : <>
                        No Pets
                    </>}
                </> : <>
                    No Pets
                </>}
            </div>
        </div>
    )
}