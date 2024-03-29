import { StateContext } from '../../App';
import { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Section from '../../components/section/Section';
import { capitalizeAllWordsInString, reformatDatesOnMongoDBObject } from '../../helper';

export const signUpDevLogs = false;

export default function SignUp() {
  const navigate = useNavigate();
  let { users, setCredentials } = useContext(StateContext);
  let [formData, setFormData] = useState({});
  let [signUpUsernameError, setSignUpUsernameError] = useState(``);
  let [signUpEmailError, setSignUpEmailError] = useState(``);

  const [addUserMutation, { loading, error, data }] = useMutation(gql`
    mutation AddUser($newUser: NewUserInput!) {
      addUser(newUser: $newUser) {
        _id
        email
        username
      }
    }
  `);

  if (loading && signUpDevLogs == true) console.log(`Signup Loading`, loading);
  if (error && signUpDevLogs == true) console.log(`Signup Error`, error);
  if (data && signUpDevLogs == true) console.log(`Signup Data`, data);
  
  const updateFormState = (e) => {
    let { name, value } = e.target;

    if (name == `email`) {
      let validDomains = [`com`, `org`, `gov`, `edu`];
      let userEmails = users ? users.map(usr => usr.email.toLowerCase()) : [];
      value = value.toLowerCase();

      if (value.length >= 7) {
        if (value.includes(`@`)) {
          let emailWebsite = value.split(`@`)[1];
          let emailDomain = emailWebsite.split(`.`)[1];
          let emailHasValidDomain = validDomains.includes(emailDomain);
          if (emailHasValidDomain == true) {
            if (userEmails.includes(value)) {
              setSignUpEmailError(<div>This email has already been registered, <Link to={`/sign-in`} className={`mainColorLink mainColorLinkAlt `}>Sign In</Link></div>);
            } else {
              setSignUpEmailError(``);
            }
          } else {
            setSignUpEmailError(`Must include part after @ symbol${emailHasValidDomain == false ? ` with a valid domain` : ``}`);
          }
        } else {
          setSignUpEmailError(`Email must include an @ symbol`);
        }
      } else {
        setSignUpEmailError(``);
      }
    } else if (name == `username`) {
      let usernames = users ? users.map(usr => usr.username) : [];

      if (value.length >= 3) {
        if (usernames.includes(value)) {
          setSignUpUsernameError(<div>Username is already registered, <Link to={`/sign-in`} className={`mainColorLink mainColorLinkAlt `}>Sign In</Link></div>);
        } else {
          setSignUpUsernameError(``);
        }
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
      let { email, password, username } = formData;
      if (signUpEmailError == ``) {
        const { data } = await addUserMutation({
          variables: {
            newUser: {
              email,
              password,
              username: capitalizeAllWordsInString(username),
            },
          },
        });
  
        // Successfull Sign Up
        let userSignedUp = reformatDatesOnMongoDBObject(data.addUser);
        if (userSignedUp != null && userSignedUp != undefined) {
          // inDevEnv() && console.log(`User Signed Up Successfully`, userSignedUp);
          // setUsers(prevUsers => [...prevUsers, userSignedUp]);
          setCredentials(userSignedUp);
          e.target.reset();
          navigate(`/sign-in`);
        }
      }
    } catch (error) {
      console.log(`Error adding user`, error);
      console.log(`GraphQL errors on Sign Up`, error.graphQLErrors);
      console.log(`Network errors on Sign Up`, error.networkError);
    }
  };

  const isFormSubmitDisabled = () => {
    let disabled = false;
    if (signUpEmailError != ``) {
      disabled = true;
    }
    return disabled;
  }

  return (
    <>
      <Header />
      <main>
       <Section title={`Sign Up`}>
          <p className={`scrollMessage`}>Scroll below to Form</p>
        </Section>
        <section id={`signup`} className={`signupContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
          <h2>Sign Up {users && Array.isArray(users) && <div className={`usersDiv`}>{users.length} User(s)</div>}</h2>
          <form onChange={(e) => updateFormState(e)} onSubmit={(e) => onFormSubmit(e)} id={`signUpForm`} className={`flex flexColumn gap5 signUpForm registrationForm`}>
            <input id={`username`} name={`username`} placeholder={`Enter Username...`} type={`text`} required />
            {signUpUsernameError != `` && <div className={`signUpUsernameError errorMessage`}>{signUpUsernameError}</div>}
            <input id={`email`} name={`email`} placeholder={`Enter Email...`} type={`email`} required />
            {signUpEmailError != `` && <div className={`signUpEmailError errorMessage`}>{signUpEmailError}</div>}
            <input id={`password`} name={`password`} placeholder={`Enter Password...`} type={`password`} required />
            <button type={`submit`} className={`${isFormSubmitDisabled() == true ? `disabled` : ``}`} disabled={isFormSubmitDisabled()}>Submit</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}