import { Link } from 'react-router-dom';
import { StateContext } from '../../App';
import { useContext, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

export default function SignIn() {
    let { users } = useContext(StateContext);
    let [formData, setFormData] = useState({});
    let [logInNameError, setLogInNameError] = useState(``);

    const updateFormState = (e) => {
        let { name, value } = e.target;
        let usernames = users.map(usr => usr.username);
        let userEmails = users.map(usr => usr.email.toLowerCase());
        let userLogins = [...usernames, ...userEmails].sort((firstItem, nextItem) => firstItem.length - nextItem.length);
        let minLength = userLogins[0].length;
        // let maxLength = userLogins.pop().length;

        if (name == `loginName`) {
            if ((value.length >= minLength && !value.includes(`@`)) || (value.length >= 7 && value.includes(`@`))) {
                if (userLogins.includes(value)) {
                    setLogInNameError(``);
                } else {
                    setLogInNameError(<div>This user has not been registered yet, <Link to={`/sign-up`} className={`mainColorLink mainColorLinkAlt `}>Sign Up</Link></div>);
                }
            } else {
                setLogInNameError(``);
            }
        }
    
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
        }))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
      
        try {
            let { loginName, password } = formData;
            console.log(`Sign In Form Submit`, { loginName, password });
            e.target.reset();
        } catch (error) {
            console.log(`Error Signing In`, error);
        }
    };
    
    const isFormSubmitDisabled = () => {
        let disabled = false;
        if (logInNameError != ``) {
          disabled = true;
        }
        return disabled;
    }

    return (
        <>
            <Header />
            <main>
                <Section title={`Sign In`}>
                    <p className={`scrollMessage`}>Scroll below to Form</p>
                </Section>
                <section id={`signin`} className={`signinContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>Sign In{users && Array.isArray(users) && <div className={`usersDiv`}>{users.length} User(s)</div>}</h2>
                    <form onChange={(e) => updateFormState(e)} onSubmit={(e) => onFormSubmit(e)} id={`signUpForm`} className={`flex flexColumn gap5 signUpForm registrationForm`}>
                        <input id={`loginName`} name={`loginName`} placeholder={`Enter Email or Username...`} type={`text`} required />
                        {logInNameError != `` && <div className={`logInNameError errorMessage`}>{logInNameError}</div>}
                        <input id={`password`} name={`password`} placeholder={`Enter Password...`} type={`password`} required />
                        <button type={`submit`} className={`${isFormSubmitDisabled() == true ? `disabled` : ``}`} disabled={isFormSubmitDisabled()}>Submit</button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    )
}