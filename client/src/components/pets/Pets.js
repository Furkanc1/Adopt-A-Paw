import Pet from "./Pet";
import { useContext } from "react";
import { StateContext } from "../../App";

export default function Pets() {
    let { pets } = useContext(StateContext);
    return (
        // Conditionally rendering the pets display if the array contains valid pets
        <div className={`pets flex justifySpaceBetween gap15`}>
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
    )
}