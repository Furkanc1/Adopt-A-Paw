import { StateContext } from '../../App';
import { useContext, useEffect, useState } from 'react';

export default function Footer() {
    let { title, authorEmail } = useContext(StateContext);
    let [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // This code will run when the component enters the screen
        if (year === undefined) {
            setYear(new Date().getFullYear());
        }
        return () => {
            // This code will run when the component leaves the screen
        }
    }, [year]) // Whatever variables you put in this array will cause the useeffect to run again

    return (
        <footer>{title} | {authorEmail} | Copyright © {year}</footer>
    )
}