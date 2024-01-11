import { useContext } from "react";
import { StateContext } from "../../App";

export default function Section({title, children}) {
    let { logo } = useContext(StateContext);
    return (
        <section className={`plutoBGSection`}>
            <div className={`containerWithSpinningLogo`}>
                <img src={logo} className="App-logo" alt="logo" />
                <p style={{marginTop: 35}}>{title}</p>
                {children}
            </div>
        </section>
    )
}