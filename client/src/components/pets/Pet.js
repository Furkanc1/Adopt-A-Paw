export default function Pet({pet}) {

    const adoptPet = () => {
        console.log(`Adopt Me`, pet);
    }

    return (
        <div className={`pet flexColumn card alignCenter flex justifyCenter`}>
            {pet.publicImageURL && <img src={pet.publicImageURL} className={`petPic petField`} alt={`Image of Pet`} />}
            <div className={`petDetails`}>
                <div className={`petName petField`}>{pet.name}</div>
                <div className={`petSpecies petField`}>{pet.species}, Age {pet.age && pet.age}</div>
            </div>
            <button className={`adoptPetButton blackButton`} onClick={() => adoptPet()}>Adopt Me</button>
        </div>
    )
}