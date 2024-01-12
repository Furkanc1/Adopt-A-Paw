import { useContext } from 'react';
import { StateContext } from '../../App';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';
import Pets from '../../components/pets/Pets';

export default function Home() {
    let { title } = useContext(StateContext);
    return (
        <>
            <Header />
            <main>
                <Section title={title} />
                <section id={`homePage`} className={`homePageSection flex alignCenter justifyCenter`}>
                    <Pets />
                </section>
            </main>
            <Footer />
        </>
    )
}