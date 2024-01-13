import Pet from "./Pet";
import PetForm from "./PetForm";
import { useContext } from "react";
import { StateContext } from "../../App";
import { Link } from "react-router-dom";

export default function Pets({showForm}) {
    let { pets, user } = useContext(StateContext);
    return (
        // Conditionally rendering the pets display if the array contains valid pets
        <div className={`petsDiv`} style={{width: `100%`}}>
            {pets != null && Array.isArray(pets) && <h2>{pets.length} Pet(s)</h2>}
            {showForm && user != null && <>
                <PetForm />
            </>}
            <div className={`pets flex gap15 ${pets != null && Array.isArray(pets) && pets.length == 0 ? `justifyCenter alignCenter` : ``}`}>
                {pets != null && Array.isArray(pets) ? <>
                    {pets.length > 0 ? <>
                        {pets.map((pet, petIndex) => {
                            return <Pet pet={pet} key={petIndex} />
                        })}
                    </> : <>
                        {user == null ? <div>No Pets, <Link to={`/sign-in`} className={`mainColorLink mainColorLinkAlt`}>Sign In</Link> to Add Pets</div> : `No Pets`}
                    </>}
                </> : <>
                    {user == null ? <div>No Pets, <Link to={`/sign-in`} className={`mainColorLink mainColorLinkAlt`}>Sign In</Link> to Add Pets</div> : `No Pets`}
                </>}
            </div>
        </div>
    )
}