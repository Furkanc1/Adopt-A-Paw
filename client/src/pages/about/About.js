// import { StateContext } from '../../App';
// import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

// For using react hooks outside of a react component
// export const useReactOutsideOfReactComponent = (reactHooksToUse) => {
//     let {  useState, useEffect, useRef, useQuery } = reactHooksToUse;
// }

export default function About() {
    // let { logo } = useContext(StateContext);
    // let [bioLine1, setBioLine1] = useState(defaultBioLine1);
    // let [bioLine2, setBioLine2] = useState(defaultBioLine2);

    // useEffect(() => {
    //     // We are trying to satisfy the linter here, by having no unused variables
    //     // So we will create impossible if conditions just so we can use these variables and the linter stops complaining
    //     if (bioLine1 == ``) setBioLine1(defaultBioLine1);
    //     if (bioLine2 == ``) setBioLine2(defaultBioLine2);
    // }, [bioLine1, bioLine2])

    return (
        <>
            <Header />
            <main>
                <Section title={`About Me`} />
                <section id={`aboutMe`} className={`aboutMeContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>Adopt-A-Paw:</h2>
                    <p className='mainPageBio'>
                    At Adopt-a-Paw, we believe in the transformative power of love and companionship. Our mission is to unite furry friends with loving families, creating lifelong bonds and endless joy. As an online adoption platform, Adopt-a-Paw strives to make the adoption process seamless and heartwarming.        
                    
                    Adopt-a-Paw is more than a platform; its a movement. Join us in making a difference in the lives of these wonderful creatures. Together, lets create countless tales of happiness, wagging tails, and purring hearts. Welcome to Adopt-a-Paw, where every adoption is a celebration of love and second chances. 🐾❤️            </p>
                </section>
            </main>
            <Footer />
        </>
    )
}