import { useContext } from 'react';
import { StateContext } from '../../App';
import Pets from '../../components/pets/Pets';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

export default function Home() {
    let { title, pets } = useContext(StateContext);
    return (
        <>
            <Header />
            <main>
                {/* Every page has a title component, but each title is different. */}
                {/* We want the over all section feature, with a small change, so we use the prop feature */}
                <Section title={title} />
                <section id={`homePage`} className={`homePageSection flex alignCenter justifyCenter`}>
                    {/* Becase we are only calling {pets}, we will be getting the entire pets array. */}
                    {/* If we want to alter what we receive, we can modify the array by taking the array, modifying it into a new array */}
                    {/* Pets are a prop so we can use and modify it anywhere where we there is a component using props */}
                    <Pets pets={pets} showForm={true} />
                </section>
            </main>
            <Footer />
        </>
    )
}