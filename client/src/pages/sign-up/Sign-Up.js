import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

// export const addNewUser = async (userToAdd) => {
//     try {

//       let newUser = {
//         ...userToAdd,
//         username: userToAdd.email + `-1`,
//       }

//       console.log(`New User`, newUser);

//       let addUserResponse = await fetch(`http://localhost:3001/api/users`, {
//         method: `POST`,
//         body: JSON.stringify(newUser),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//       });

//       if (addUserResponse.ok) {
//         let newUserInDatabase = await addUserResponse.json();
//         return newUserInDatabase;
//       } else {
//         console.log(`Server responded with ${addUserResponse.status}: ${addUserResponse.statusText}`);
//       }
//     } catch (error) {
//       console.log(`Server Error`, error);
//     }
// }

export default function SignUp() {
    let [formData, setFormData] = useState({});
    const ADD_USER = gql`
        mutation AddUser($newUser: NewUserInput!) {
            addUser(newUser: $newUser) {
                _id
                email
                username
            }
        }
    `;
    const [addUserMutation, { loading, error, data }] = useMutation(ADD_USER);

    if (data) console.log(data);
   
    const updateFormState = (e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }))
    }

    // const onFormSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await addNewUser(formData);
    //     } catch (error) {
    //         console.log(`Error adding new user`, error);
    //     }
    // }
   
    // const onFormSubmit = (e) => {
    //     e.preventDefault();
    //     if (error != undefined) console.log({loading, error});

    //     addUserMutation({
    //         variables: {
    //           newUser: {
    //             email: formData.email,
    //             username: `sometyhingcrazy`,  // Adjust this according to your data structure
    //             password: formData.password,
    //           },
    //         },
    //     }).then(response => {
    //         console.log('User added successfully:', response.data.addUser);
    //         // Handle success, e.g., redirect or show a success message
    //     }).catch(error => {
    //         console.error('Error adding user:', error.message);
    //         console.log('GraphQL errors:', error.graphQLErrors);
    //         console.log('Network errors:', error.networkError);
    //         // Handle error, e.g., display an error message to the user
    //     });

    //     if (loading != undefined) console.log('Mutation loading:', loading);
    //     console.log('Mutation error:', error);
    //     console.log('Mutation data:', data);
    // }

    const onFormSubmit = async (e) => {
        e.preventDefault();
      
        try {
            console.log(`Passing to DB`, {newUser: {
                email: formData.email,
                username: `somethingcrazy`,  // Adjust this according to your data structure
                // password: formData.password,
              }})
          const { data } = await addUserMutation({
            variables: {
              newUser: {
                email: formData.email,
                username: `somethingcrazy`,  // Adjust this according to your data structure
                // password: formData.password,
              },
            },
          });
      
          console.log('User added successfully:', {
            user: data.addUser,
            loading, error, user2: data, data
        });
          // Handle success, e.g., redirect or show a success message
        } catch (error) {
          console.error('Error adding user:', error.message);
          console.log('GraphQL errors:', error.graphQLErrors);
          console.log('Network errors:', error.networkError);
          // Handle error, e.g., display an error message to the user
        }
      };
      

    return (
        <>
            <Header />
            <main>
                <Section title={`Sign Up`} />
                <section id={`signup`} className={`signupContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>Sign Up</h2>
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