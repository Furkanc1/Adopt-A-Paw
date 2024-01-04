import { useContext } from 'react';
import { StateContext } from '../../App';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

export default function About() {
    let { logo } = useContext(StateContext);
    return (
        <>
            <Header />
            <main>
                <Section title={`About Me`} />
                <section id={`aboutMe`} className={`aboutMeContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>About Me</h2>
                    <p>
                       Hey! My name is Alex, aka PlutoCoding!
                       I'm 25 and i'm a beginner full stack web developer!
                       I'm going through the Colombia University web dev bootcamp program with my brother! I love video-games, animals (Especially cats), music, movies, tv-shows, playing football, and being with family! I hope to have a succesful and fulfilling career as a programmer where I can bring my ideas to life!
                    </p>
                </section>
            </main>
            <Footer />
        </>
    )
}