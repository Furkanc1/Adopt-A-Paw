import { useState } from 'react';
// import { StateContext } from '../../App';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';
import { vanillaJavaScriptValidation } from '../../helper';

export default function Contact() {

    // let { logo } = useContext(StateContext);

    let [email, setEmail] = useState(``);
    let [message, setMessage] = useState(``);
    // let [emailError, setEmailError] = useState(false);
    let [emailTouched, setEmailTouched] = useState(false);

    const contactFormInput = (e) => {
        console.log(`Contact Form On Input`, {
            email,
            message,
        });
    }

    // const determineFieldError = (e) => {
    //     if (vanillaJavaScriptValidation(email) === true && email !== ``) {
    //         // setEmailError(false);
    //     } else {
    //        setEmailError(true); 
    //     }
    // }

    const contactFormSubmission = (e) => {
        e.preventDefault();
        console.log(`Contact Form Submitted`, {
            email,
            message
        });
    }

    return (
        <>
            <Header />
            <main>
                <Section title={`Contact`} />
                <section id={`contact`} className={`contactContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>Contact</h2>

                    <form id={`contactForm`} className={`flex flexColumn gap5`} onInput={(e) => contactFormInput(e)} onSubmit={(e) => contactFormSubmission(e)}>

                        <input onFocus={(e) => setEmailTouched(true)} onInput={(e) => setEmail(e.target.value)} id={`contactForm_email`} name={`email`} type={`email`} className={`contactFormField`} placeholder={`Enter Email Address...`} required />

                        {emailTouched !== false && vanillaJavaScriptValidation(email) !== true && <div className={`errorMessage`}>
                            {email === `` ? `Email is Required` : vanillaJavaScriptValidation(email)}
                        </div>}

                        <textarea onInput={(e) => setMessage(e.target.value)} id={`contactForm_message`} name={`message`} type={`text`} className={`contactFormField`} placeholder={`Enter Your Message...`} required />

                        <button type={`submit`}>Submit</button>

                    </form>

                </section>
            </main>
            <Footer />
        </>
    )
}