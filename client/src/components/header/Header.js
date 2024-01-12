import { Link } from 'react-router-dom';
import { StateContext } from '../../App';
import { useContext, useEffect, useState } from 'react';

export default function Header() {
    let { title, authors, user, setUser } = useContext(StateContext); // State Context runs whenever the component that creates the context runs
    let [pageName, setPageName] = useState(window.location.pathname); // Local state will run anytime the component its inside of loads or unloads

    const signOut = () => {
        setUser(null);
        localStorage.removeItem(`user`);
    }

    // Runs anytime THIS component (that the use effect is inside of) is loaded or unloaded.
    // To utilize the unloaded effect, you need to have a return function in the useEffect.
    useEffect(() => {
        if (pageName === undefined) {
            setPageName(window.location.pathname);
        }
    }, [pageName])

    return (
        <header className={`header flex alignCenter justifySpaceBetween`}>
            <div className={`column headerColumn columnLeft flex alignCenter gap5`}>
                {/* You can still use class/id names inside the link tag because the React Link tag automatically includes an a tag. */}
                <Link className={`flex alignCenter gap5 mainColorLink`} to={`/`}>
                    <h1>{ title }</h1>
                    <span style={{color: `white`}}>- by {authors}</span>
                </Link>
            </div>
            <div className={`column headerColumn columnRight`}>
                <nav>
                    <ul className={`navigationList flex gap15`}>
                        {/* The a href tags won't work with a deployed version. React router DOM reccomends using their custom link component which will wrap the a tags in the link component. */}
                        {/* Newer versions of React Router DOM dont need an <a> tag inside the <Link> anymore */}
                        {user == null && <>
                            <li>
                                <Link to={`/about`}>About Me</Link>
                            </li>
                            <li>
                                <Link to={`/portfolio`}>Portfolio</Link>
                            </li>
                            <li>
                                <Link to={`/resume`}>Resume</Link>
                            </li>
                        </>}
                        {user != null && <>
                            Welcome, {user.username}
                            <li>
                                <Link className={`${pageName === `/profile` ? `activePage` : `` }`} to={`/profile`}>Profile</Link>
                            </li>
                        </>}
                        <li>
                            <Link className={`${pageName === `/contact` ? `activePage` : `` }`} to={`/contact`}>Contact</Link>
                        </li>
                        {user == null ? <>
                            <li className={`buttonLink`}>
                                <Link to={`/sign-in`} className={`mainColorLink mainColorLinkAlt ${pageName === `/sign-in` ? `activePage` : `` }`}>Sign In</Link>
                            </li>
                            <li className={`buttonLink`}>
                                <Link to={`/sign-up`} className={`mainColorLink mainColorLinkAlt ${pageName === `/sign-up` ? `activePage` : `` }`}>Sign Up</Link>
                            </li>
                        </> : <>
                            <li onClick={() => signOut()} className={`buttonLink hoverPointer mainColorLink mainColorLinkAlt`}>
                                Sign Out
                            </li>
                        </>}
                    </ul>
                </nav>
            </div>
        </header>
    )
}