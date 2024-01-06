import { useContext } from 'react';
import { StateContext } from '../../App';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

export default function Home() {
    let { title } = useContext(StateContext);
    return (
        <>
            <Header />
            <main>
                <Section title={title} />
                <section id={`aboutMe`} className={`aboutMeSection flex alignCenter justifyCenter`}>
                    Click the links in the nav bar above to traverse the website! Featured portfolio projects will be added here later.
                </section>
            </main>
            <Footer />
        </>
    )
}