import './App.css';
import logo from './logo.svg';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Resume from './pages/resume/Resume';
import SignIn from './pages/sign-in/Sign-In';
import SignUp from './pages/sign-up/Sign-Up';
import Profile from './pages/profile/Profile';
import Contact from './pages/contact/Contact';
import Portfolio from './pages/portfolio/Portfolio';
import { projectsUsedAcrossApplication } from './helper';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export const appTitle = `Adopt-A-Paw`;
export const appEmail = `plutocoding@gmail.com`;
export const appAuthors = `Alex, Fuf, & Isaiah`;
export const StateContext = createContext({});
console.log(`Welcome to Adopt A Paw`);
// This is to help us know what environment we are in. Are we in the local developer environment, or the deployed production environment?
export const inDevEnv = () => window && window.location.host.includes(`local`);

export const getUsers = async () => {
  try {
    let usersResponse = await fetch(`http://localhost:3001/api/users`);
    if (usersResponse.status === 200) {
      let usersData = await usersResponse.json();
      if (Array.isArray(usersData)) return usersData;
    }
  } catch (error) {
    console.log(`Server Error`, error);
  }
}

export default function App() {
  // Store things in useState that you want to access across your application (or things that update)
  // let [projects, setProjects] = useState(getGithubData());
  let [user, setUser] = useState(null);
  let [pets, setPets] = useState([{
    age: 5,
    name: `Doggo`,
    species: `Cat`,
    adopted: false,
    creatorId: `65a09f306c7fb01830dfb58d`,
    publicImageURL: `https://naturvet.com/cdn/shop/articles/shutterstock_1640876206.jpg?v=1691013127`,
  }, {
    age: 5,
    name: `Doggo`,
    species: `Cat`,
    adopted: false,
    creatorId: `65a09f306c7fb01830dfb58d`,
    publicImageURL: `https://naturvet.com/cdn/shop/articles/shutterstock_1640876206.jpg?v=1691013127`,
  }, {
    age: 5,
    name: `Doggo`,
    species: `Cat`,
    adopted: false,
    creatorId: `65a09f306c7fb01830dfb58d`,
    publicImageURL: `https://naturvet.com/cdn/shop/articles/shutterstock_1640876206.jpg?v=1691013127`,
  }]);
  let [users, setUsers] = useState(null);
  let [title, setTitle] = useState(appTitle);
  let [authors, setAuthors] = useState(appAuthors);
  let [credentials, setCredentials] = useState(null);
  let [authorEmail, setAuthorEmail] = useState(appEmail);
  let [projects, setProjects] = useState(projectsUsedAcrossApplication);

  useEffect(() => {
    if (title === ``) setTitle(appTitle);
    if (authors === ``) setAuthors(appAuthors);
    if (authorEmail === ``) setAuthorEmail(appEmail);
    if (projects.length === 0) setProjects(projectsUsedAcrossApplication);

    const getUsersFromDatabase = async () => {
      let usersFromDatabase = await getUsers();
      if (usersFromDatabase) {
        let modifiedUsers = usersFromDatabase.map((usr) => {
          let createdAt = new Date(parseFloat(usr.createdAt)).toLocaleString();
          let updatedAt = new Date(parseFloat(usr.updatedAt)).toLocaleString();

          delete usr.password;

          return {
            ...usr,
            createdAt,
            updatedAt
          }
        });

        inDevEnv() && console.log(`Users`, modifiedUsers);
        setUsers(modifiedUsers);
      }
    }

    if (users === null) getUsersFromDatabase();

    if (user === null) {
      let storedUser = JSON.parse(localStorage.getItem(`user`));
      if (storedUser) {
        inDevEnv() && console.log(`User`, storedUser);
        setUser(storedUser);
      }
    }

  }, [user, users, projects, title, authors, authorEmail])
  
  return (
    <StateContext.Provider value={{ user, users, setUser, setUsers, pets, setPets, title, logo, projects, authors, authorEmail, credentials, setCredentials }}>
      <div className="App">
        <Router>
          <Routes>
            
            <Route path={`/`} element={<Home />} />

            <Route path={`/about`} element={<About />} />
            <Route path={`/aboot`} element={<About />} />
            <Route path={`/aboit`} element={<About />} />
            <Route path={`/about-us`} element={<About />} />
            <Route path={`/aboutUs`} element={<About />} />

            <Route path={`/profile`} element={user != null ? <Profile /> : <Navigate to={`/`} />} />
            <Route path={`/portfolio`} element={<Portfolio />} />
            
            <Route path={`/resume`} element={<Resume />} />
            
            <Route path={`/contact`} element={<Contact />} />
            <Route path={`/contactus`} element={<Contact />} />
            <Route path={`/contactme`} element={<Contact />} />
            <Route path={`/contact-me`} element={<Contact />} />
            <Route path={`/contact-us`} element={<Contact />} />
            
            <Route path={`/login`} element={user == null ? <SignIn /> : <Navigate to={`/profile`} />} />
            <Route path={`/log-in`} element={user == null ? <SignIn /> : <Navigate to={`/profile`} />} />
            <Route path={`/signin`} element={user == null ? <SignIn /> : <Navigate to={`/profile`} />} />
            <Route path={`/signing`} element={user == null ? <SignIn /> : <Navigate to={`/profile`} />} />
            <Route path={`/sign-in`} element={user == null ? <SignIn /> : <Navigate to={`/profile`} />} />

            <Route path={`/signup`} element={user == null ? <SignUp /> : <Navigate to={`/profile`} />} />
            <Route path={`/sign-up`} element={user == null ? <SignUp /> : <Navigate to={`/profile`} />} />
            <Route path={`/register`} element={user == null ? <SignUp /> : <Navigate to={`/profile`} />} />

          </Routes>
        </Router>
      </div>
    </StateContext.Provider>
  );
}