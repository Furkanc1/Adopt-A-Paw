import { useContext } from 'react';
import { StateContext } from '../../App';
import Pets from '../../components/pets/Pets';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

export default function Profile() {
    let { pets, user } = useContext(StateContext);

    const getPetsOwnedByUser = () => {
        let petsOwnedByUser = pets.filter(pet => pet.ownerId == user._id);

        // let petsOwnedByUser = pets.filter(pet => {
        //     if (pet.ownerId == user._id) {
        //         return pet;
        //     }
        // });

        return petsOwnedByUser;
    };

    const getPetsCreateByUser = () => {
        let petsCreatedByUser = pets.filter(pet => pet.creatorId == user._id);
        return petsCreatedByUser;
    };

    return (
        <>
            <Header />
            <main>
                <Section title={`Profile`} />
                <section id={`profile`} className={`profileContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>Profile</h2>
                    <h3>Pets you Own</h3>
                    <Pets pets={getPetsOwnedByUser()} showForm={true} />
                    <h3>Pets you Created</h3>
                    <Pets pets={getPetsCreateByUser()} showForm={false} />
                </section>
            </main>
            <Footer />
        </>
    )
}