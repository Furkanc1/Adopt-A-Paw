import emailjs from 'emailjs-com';
import { useContext, useState } from 'react';
import { StateContext, inDevEnv } from '../../App';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';
import { vanillaJavaScriptValidation as vanillaJavaScriptEmailValidation } from '../../helper';

export default function Contact() {

    let { user } = useContext(StateContext);
    let [formData, setFormData] = useState({});
    let [minMessageLength] = useState(25);
    let [maxMessageLength] = useState(250);
    let [emailFieldFocusedAtleastOnce, setEmailFieldFocusedAtleastOnce] = useState(false);
    let [messageFieldFocusedAtleastOnce, setMessageFieldFocusedAtleastOnce] = useState(false);

    const updateFormState = (e) => {
        let { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const showEmailFieldValidationError = () => {
        let emailFieldValueIsLongEnoughToTest = formData.email && formData.email != undefined && formData.email != null && formData.email != `` && formData.email.length > 5;
        let emailFieldValueDoesNotPassValidationTesting = emailFieldFocusedAtleastOnce === true && vanillaJavaScriptEmailValidation(formData.email) === false;
        
        let showEmailFieldValidationError = emailFieldValueIsLongEnoughToTest && emailFieldValueDoesNotPassValidationTesting;

        return showEmailFieldValidationError;
    }

    const messageIsLongEnoughToTest = () => {
        let messageLongEnoughToTest = formData.message && formData.message != undefined && formData.message != null && formData.message != ``;
        return messageLongEnoughToTest;
    }
 
    const showMessageFieldValidationError = () => {
        let messageFieldValueIsNotLongEnough = messageIsLongEnoughToTest() && formData.message.length < 25;
        let messageFieldValueIsTooLong = messageIsLongEnoughToTest() && formData.message.length > 250;
        
        let showMessageFieldValidationError = messageIsLongEnoughToTest() && messageFieldFocusedAtleastOnce === true && (messageFieldValueIsNotLongEnough || messageFieldValueIsTooLong);

        return showMessageFieldValidationError;
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        let form = e.target;
        let { email: emailField, subject: subjectField,  message: messageField } = form;
        // Capture the latest info on the form, 
        // Then send a confirmation email to the user who submitted as long as that email is valid
        let serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        let templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        let userID = process.env.REACT_APP_EMAILJS_USER_ID;

        inDevEnv() && console.log(`Contact Form Submitted`, {
            email: emailField.value,
            subject: subjectField.value,
            message: messageField.value,
        });

        emailjs.sendForm(serviceID, templateID, form, userID).then((result) => {
            inDevEnv() && console.log(`Email successfully sent!`, result);
            form.reset();
            setFormData({});
            // Handle success (e.g., display a success message)
        }, (error) => {
            console.log(`Failed to send email`, error.text);
            // Handle errors here (e.g., display an error message)
        });
    }

    return (
        <>
            <Header />
            <main>
                <Section title={`Contact`} />
                <section id={`contact`} className={`contactContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>Contact</h2>

                    <form id={`contactForm`} className={`flex contactForm flexColumn gap5`} onChange={(e) => updateFormState(e)} onSubmit={(e) => onFormSubmit(e)}>

                        <input 
                            required 
                            type={`email`} 
                            name={`email`}
                            id={`contactForm_email`} 
                            className={`contactFormField`} 
                            placeholder={`Enter Email Address...`} 
                            defaultValue={user == null ? `` : user.email}
                            onFocus={() => setEmailFieldFocusedAtleastOnce(true)} 
                        />

                        {showEmailFieldValidationError() && <>
                            <div className={`errorMessage emailFieldErrorMessage emailErrorMessage`}>
                                {formData.email === `` ? `Email is Required` : vanillaJavaScriptEmailValidation(formData.email)}
                            </div>
                        </>}

                        <input 
                            required 
                            type={`text`} 
                            name={`subject`} 
                            id={`contactForm_subject`} 
                            className={`contactFormField`} 
                            placeholder={`Enter Subject...`} 
                        />

                        <textarea 
                            required 
                            type={`text`} 
                            name={`message`}
                            style={{ minHeight: 91 }}
                            id={`contactForm_message`} 
                            minLength={minMessageLength}
                            maxLength={maxMessageLength}
                            className={`contactFormField`} 
                            placeholder={`Enter Your Message...`} 
                            onBlur={() => setMessageFieldFocusedAtleastOnce(true)} 
                        />

                        {!showMessageFieldValidationError() && <div className={`characterCounts flex gap15 justifyEnd`}>
                            <div className={`characterCount min ${messageIsLongEnoughToTest() ? formData.message.length >= minMessageLength ? `valid` : `invalid` : ``}`}>
                                Min: {messageIsLongEnoughToTest() ? formData.message.length >= minMessageLength ? minMessageLength : formData.message.length : 0}/{minMessageLength}
                            </div>
                            <div className={`characterCount max ${messageIsLongEnoughToTest() ? `valid` : ``}`}>Max: {messageIsLongEnoughToTest() ? formData.message.length : 0}/{maxMessageLength}</div>
                        </div>}

                        {showMessageFieldValidationError() && <div className={`errorMessage messageFieldErrorMessage messageErrorMessage`}>
                            Please Enter a Message that is at least {minMessageLength} characters and at most {maxMessageLength} characters
                        </div>}

                        <button disabled={showEmailFieldValidationError() || showMessageFieldValidationError() || messageIsLongEnoughToTest() && formData.message.length < minMessageLength} className={`contactFormSubmitButton blackButton ${showEmailFieldValidationError() || showMessageFieldValidationError() || messageIsLongEnoughToTest() && formData.message.length < minMessageLength ? `disabled` : ``}`} type={`submit`}>
                            Submit
                        </button>

                    </form>

                </section>
            </main>
            <Footer />
        </>
    )
}