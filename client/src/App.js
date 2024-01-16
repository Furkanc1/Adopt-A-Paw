
import './App.css';
import logo from './logo.svg';
import io from 'socket.io-client';
import Home from './pages/home/Home';
import About from './pages/about/About';
// import Resume from './pages/resume/Resume';
import SignIn from './pages/sign-in/Sign-In';
import SignUp from './pages/sign-up/Sign-Up';
import Profile from './pages/profile/Profile';
import Contact from './pages/contact/Contact';
// import Portfolio from './pages/portfolio/Portfolio';
import { createContext, useEffect, useState } from 'react';
import { projectsUsedAcrossApplication, samplePetData } from './helper';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// This is to help us know what environment we are in. Are we in the local developer environment, or the deployed production environment?
export const inDevEnv = () => window && window.location.host.includes(`local`);

export const appTitle = `Adopt-A-Paw`;
let herokuDeploymentURL = `https://adoptapaw-1-2c5b986974f2.herokuapp.com`;
let serverPort = process.env.SERVERPORT || 5000;
let liveLinkMain = inDevEnv() ? `http://localhost:${serverPort}` : herokuDeploymentURL;
const socket = io(liveLinkMain);
export const appEmail = `plutocoding@gmail.com, Furkdurk7@aol.com, Ikapr600@gmail.com`;
export const appAuthors = `Alex, Furk, & Isaiah`;
export const StateContext = createContext({});

console.log(`Welcome to Adopt A Paw`);

// So that the images in the pet card client can be randomly selected
export const placeholderPetImage = `https://www.worldanimalprotection.us/sites/default/files/styles/600x400/public/media/header_updated_0.png?h=55cb88a5&itok=hcHgpiWr`;

export const getUsersFromAPI = async () => {
  try {
    let serverPort = process.env.SERVERPORT || 5000;
    let liveLink = inDevEnv() ? `http://localhost:${serverPort}` : herokuDeploymentURL;
    let usersResponse = await fetch(`${liveLink}/api/users`);
    if (usersResponse.status === 200) {
      let usersData = await usersResponse.json();
      if (Array.isArray(usersData)) return usersData;
    }
  } catch (error) {
    console.log(`Server Error on Get Users`, error);
  }
}

export const getPetsFromAPI = async () => {
  try {
    let serverPort = process.env.SERVERPORT || 5000;
    let liveLink = inDevEnv() ? `http://localhost:${serverPort}` : herokuDeploymentURL;
    let petsResponse = await fetch(`${liveLink}/api/pets`);
    if (petsResponse.status === 200) {
      let petsData = await petsResponse.json();
      if (Array.isArray(petsData)) return petsData;
    }
  } catch (error) {
    console.log(`Server Error on Get Pets`, error);
  }
}

export default function App() {
  // Store things in useState that you want to access across your application (or things that update)
  // let [projects, setProjects] = useState(getGithubData());
  let [user, setUser] = useState(null);
  // We already have a call for pets in the beginning of the app, we are just going to pass it down into profile component. (We have access to the pets because of previously putting the pet card in state)
  // Our code is being run linearlly
  // pets and users is being created, and they are set, originally, as null
  // Later on, we re-assign the values by calling the API routes in our useEffect, and if they are null (which they will be, because they are SET to it), we re-define it.
  // The reason we had to do it this way is because of the linter, where in order to have a defined variable/function, you have to use/call it. (It'll say erorr: you defined the variable but are not using it.)
  // It is also sometimes better, in react, to do our server/API calls from the useEffect, because useEffect is asyncrnous in nature, and we'll have a new thread opened up
  // Inside of that new thread, we'll do our server calls, which again another asyncrounous call.
  let [pets, setPets] = useState(null);
  let [users, setUsers] = useState(null);
  let [title, setTitle] = useState(appTitle);
  let [petToEdit, setPetToEdit] = useState(null);
  let [authors, setAuthors] = useState(appAuthors);
  let [credentials, setCredentials] = useState(null);
  let [authorEmail, setAuthorEmail] = useState(appEmail);
  // For mobile responsiveness, this is our basic variable for the mobile breakpoint
  let [mobileBreakPoint, setMobileBreakPoint] = useState(820);
  let [screenWidth, setScreenWidth] = useState(window.innerWidth);
  let [screenHeight, setScreenHeight] = useState(window.innerHeight);
  let [projects, setProjects] = useState(projectsUsedAcrossApplication);

  useEffect(() => {
    if (title === ``) setTitle(appTitle);
    if (authors === ``) setAuthors(appAuthors);
    if (authorEmail === ``) setAuthorEmail(appEmail);
    if (projects.length === 0) setProjects(projectsUsedAcrossApplication);

    if (user === null) {
      let storedUser = JSON.parse(localStorage.getItem(`user`));
      if (storedUser) {
        inDevEnv() && console.log(`User`, storedUser);
        setUser(storedUser);
      }
    }

    const refreshUsersFromAPI = async () => {
      let usersFromAPI = await getUsersFromAPI();
      if (usersFromAPI) {
        setUsers(usersFromAPI);
        // A safe else condition catch. In case there is a server error, we are setting users to an empty array.
        // This is so that the application doesn't error out, and at least the array is given.
        // This will allow all our other array maps for users/pets to continue functioning.
      } else {
        setUsers([]);
      }
    }
    
    const refreshPetsFromAPI = async () => {
      let petsFromAPI = await getPetsFromAPI();
      if (petsFromAPI) {
        setPets(petsFromAPI);
      } else {
        // Same concept as the serverUsersFromAPIToClient catch, but here we just bring in the dummy data so that something pops up
        setPets(samplePetData);
      }
    }

    // Run on initialization
    if (users === null) refreshUsersFromAPI();
    if (pets === null) refreshPetsFromAPI();

    // Run on any database change
    socket.on(`usersChanged`, (usersDatabaseChange) => {
      refreshUsersFromAPI(); // Synonymous with setting users in state
      inDevEnv() && console.log(`Users Database Change Detected`, usersDatabaseChange);
    })
    
    socket.on(`petsChanged`, (petsDatabaseChange) => {
      refreshPetsFromAPI(); // Synonymous with setting pets in state
      inDevEnv() && console.log(`Pets Database Change Detected`, petsDatabaseChange);
    })

    if (users != null) inDevEnv() && console.log(`Users`, users);
    if (pets != null) inDevEnv() && console.log(`Pets`, pets);
  // Turning off the change detector after the use effect runs, so we don't get 100 different logs
    return () => {
      socket.off(`usersChanged`);
      socket.off(`petsChanged`);
    }

  }, [user, users, pets, projects, title, authors, authorEmail])
  
  return (
    <StateContext.Provider value={{ user, users, setUser, setUsers, pets, setPets, petToEdit, setPetToEdit, title, logo, projects, authors, authorEmail, credentials, setCredentials, screenWidth, setScreenWidth, screenHeight, setScreenHeight, mobileBreakPoint, setMobileBreakPoint }}>
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
            {/* <Route path={`/portfolio`} element={<Portfolio />} /> */}
            
            {/* <Route path={`/resume`} element={<Resume />} /> */}
            
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