import { StateContext } from '../../App';
import { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

export const signUpDevLogs = false;

export default function SignUp() {
  let { users, setUsers } = useContext(StateContext);
  let [formData, setFormData] = useState({});
  const [addUserMutation, { loading, error, data }] = useMutation(gql`
    mutation AddUser($newUser: NewUserInput!) {
      addUser(newUser: $newUser) {
        _id
        email
        username
      }
    }
  `);

  if (loading && signUpDevLogs == true) console.log(`Loading`, loading);
  if (error && signUpDevLogs == true) console.log(`Error`, error);
  if (data && signUpDevLogs == true) console.log(`Data`, data);
  
  const updateFormState = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }))
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let { email, password } = formData;
      const { data } = await addUserMutation({
        variables: {
          newUser: {
            email,
            password,
            username: formData.email + `-${users.length + 1}`,
          },
        },
      });

      if (data.addUser != null && data.addUser != undefined) {
        console.log(`User added successfully`, data.addUser);
        setUsers(prevUsers => [...prevUsers, data.addUser]);
      }
    } catch (error) {
      console.log(`Error adding user`, error);
      console.log(`GraphQL errors`, error.graphQLErrors);
      console.log(`Network errors`, error.networkError);
    }
  };

  return (
    <>
      <Header />
      <main>
        <Section title={`Sign Up`} />
        <section id={`signup`} className={`signupContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
          <h2>Sign Up {users && Array.isArray(users) && <div className={`usersDiv`}>{users.length} User(s)</div>}</h2>
          <form onChange={(e) => updateFormState(e)} onSubmit={(e) => onFormSubmit(e)} id={`signUpForm`} className={`flex flexColumn gap5 signUpForm`}>
            <input id={`email`} name={`email`} placeholder={`Enter Email...`} type={`email`} required />
            <input id={`password`} name={`password`} placeholder={`Enter Password...`} type={`password`} required />
            <button type={`submit`}>Submit</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}