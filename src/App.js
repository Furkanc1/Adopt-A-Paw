import './App.css';
import logo from './logo.svg';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Resume from './pages/resume/Resume';
import SignIn from './pages/sign-in/Sign-In';
import Profile from './pages/profile/Profile';
import Contact from './pages/contact/Contact';
import Portfolio from './pages/portfolio/Portfolio';
import { createContext, useEffect, useState } from 'react';
// Use line 10 when you want do a fresh github api call, and comment switch project/setProhect import
// import { getGithubData } from './helper';
import { projectsUsedAcrossApplication } from './helper';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const appTitle = `Adopt-A-Paw`;
export const appEmail = `plutocoding@gmail.com`;
export const appAuthors = `Alex, Fuf, & Isaiah`;
export const StateContext = createContext({});

export default function App() {
  // Store things in useState that you want to access across your application (or things that update)
  // let [projects, setProjects] = useState(getGithubData());
  let [title, setTitle] = useState(appTitle);
  let [authors, setAuthors] = useState(appAuthors);
  let [authorEmail, setAuthorEmail] = useState(appEmail);
  let [projects, setProjects] = useState(projectsUsedAcrossApplication);

  useEffect(() => {
    if (title === ``) setTitle(appTitle);
    if (authors === ``) setAuthors(appAuthors);
    if (authorEmail === ``) setAuthorEmail(appEmail);
    if (projects.length === 0) setProjects(projectsUsedAcrossApplication);
  }, [projects, title, authors, authorEmail])
  
  return (
    <StateContext.Provider value={{ title, logo, projects, authors, authorEmail }}>
      <div className="App">
        <Router>
          <Routes>
            
            <Route path={`/`} element={<Home />} />

            <Route path={`/about`} element={<About />} />
            <Route path={`/aboot`} element={<About />} />
            <Route path={`/aboit`} element={<About />} />
            <Route path={`/about-us`} element={<About />} />
            <Route path={`/aboutUs`} element={<About />} />

            <Route path={`/profile`} element={<Profile />} />
            <Route path={`/portfolio`} element={<Portfolio />} />
            
            <Route path={`/resume`} element={<Resume />} />
            
            <Route path={`/contact`} element={<Contact />} />
            <Route path={`/contactus`} element={<Contact />} />
            <Route path={`/contactme`} element={<Contact />} />
            <Route path={`/contact-me`} element={<Contact />} />
            <Route path={`/contact-us`} element={<Contact />} />
            
            <Route path={`/login`} element={<SignIn />} />
            <Route path={`/log-in`} element={<SignIn />} />
            <Route path={`/signin`} element={<SignIn />} />
            <Route path={`/signing`} element={<SignIn />} />
            <Route path={`/sign-in`} element={<SignIn />} />

          </Routes>
        </Router>
      </div>
    </StateContext.Provider>
  );
}