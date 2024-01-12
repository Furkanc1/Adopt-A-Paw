import { StateContext } from '../../App';
import { useContext, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Section from '../../components/section/Section';

export default function SignIn() {
    const navigate = useNavigate();
    let [formData, setFormData] = useState({});
    let [signInError, setSignInError] = useState(``);
    let [logInNameError, setLogInNameError] = useState(``);
    let { users, setUser, credentials } = useContext(StateContext);

    let [signInMutation] = useMutation(gql`
        mutation SignIn($email: String!, $password: String!) {
            signIn(email: $email, password: $password) {
                token
                user {
                    _id
                    username
                    email
                }
            }
        }
    `);

    const onFormFocus = () => {
        if (signInError != ``) {
            setSignInError(``);
        }
    }

    const updateFormState = (e) => {
        let { name, value } = e.target;
        let usernames = users.map(usr => usr.username);
        let userEmails = users.map(usr => usr.email.toLowerCase());
        let userLogins = [...usernames, ...userEmails].sort((firstItem, nextItem) => firstItem.length - nextItem.length);
        let minLength = userLogins && Array.isArray(userLogins) && userLogins.length > 0 ? userLogins[0].length : 3;

        if (name == `loginName`) {
            if (value.includes(`@`)) value = value.toLowerCase();
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

            const signInResponse = await signInMutation({
                variables: {
                    password,
                    email: loginName
                }
            })

            let userToSignIn = {
                ...signInResponse.data.signIn.user,
                token: signInResponse.data.signIn.token
            }

            // Successfull Sign In
            setUser(userToSignIn);
            localStorage.setItem(`user`, JSON.stringify(userToSignIn));
            console.log(`User Signed In Successfully`, userToSignIn);
            e.target.reset();
            navigate(`/`);

        } catch (error) {
            let { loginName, password } = formData;
            console.log(`Error Signing In`, {error, loginName, password});
            if (error.message.includes(`Invalid Credentials`)) {
                setSignInError(`Invalid Email, Username, or Password`);
            }
        }
    };
    
    const isFormSubmitDisabled = () => {
        let disabled = false;
        if (logInNameError != ``) {
          disabled = true;
        }
        return disabled;
    }

    const setDefaultLogin = () => {
        if (credentials != null) {
            setFormData(prevFormData => ({
                ...prevFormData,
                loginName: credentials.email,
            }))
            return credentials.email;
        }
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
                    <form onFocus={() => onFormFocus()} onChange={(e) => updateFormState(e)} onSubmit={(e) => onFormSubmit(e)} id={`signInForm`} className={`flex flexColumn gap5 signInForm registrationForm`}>
                        <input id={`loginName`} defaultValue={() => setDefaultLogin()} name={`loginName`} placeholder={`Enter Email or Username...`} type={`text`} required />
                        {logInNameError != `` && <div className={`logInNameError errorMessage`}>{logInNameError}</div>}
                        <input id={`password`} name={`password`} placeholder={`Enter Password...`} type={`password`} required />
                        {signInError != `` && <div className={`signInError errorMessage`}>{signInError}</div>}
                        <button type={`submit`} className={`${isFormSubmitDisabled() == true ? `disabled` : ``}`} disabled={isFormSubmitDisabled()}>Submit</button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    )
}