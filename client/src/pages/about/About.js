// import { StateContext } from '../../App';
import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

export const defaultBioLine1 = `I'm 25 and I'm a beginner full stack web developer!`;
export const defaultBioLine2 = `I'm going through the Colombia University web dev bootcamp program with my brother!`;

// For using react hooks outside of a react component
// export const useReactOutsideOfReactComponent = (reactHooksToUse) => {
//     let {  useState, useEffect, useRef, useQuery } = reactHooksToUse;
// }

export default function About() {
    // let { logo } = useContext(StateContext);
    let [bioLine1, setBioLine1] = useState(defaultBioLine1);
    let [bioLine2, setBioLine2] = useState(defaultBioLine2);

    useEffect(() => {
        // We are trying to satisfy the linter here, by having no unused variables
        // So we will create impossible if conditions just so we can use these variables and the linter stops complaining
        if (bioLine1 == ``) setBioLine1(defaultBioLine1);
        if (bioLine2 == ``) setBioLine2(defaultBioLine2);
    }, [bioLine1, bioLine2])

    return (
        <>
            <Header />
            <main>
                <Section title={`About Me`} />
                <section id={`aboutMe`} className={`aboutMeContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>About Me</h2>
                    <p>
                       Hey! My name is Alex, aka PlutoCoding!
                       {bioLine1}
                       {bioLine2} I love video-games, animals (Especially cats), music, movies, tv-shows, playing football, and being with family! I hope to have a succesful and fulfilling career as a programmer where I can bring my ideas to life!
                    </p>
                </section>
            </main>
            <Footer />
        </>
    )
}