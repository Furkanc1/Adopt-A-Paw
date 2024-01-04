import { useContext } from 'react';
import { StateContext } from '../../App';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

export default function Resume() {
    let { logo } = useContext(StateContext);
    return (
        <>
            <Header />
            <main>
                <Section title={`Resume`} />
                <section id={`resume`} className={`resumeContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>Resume</h2>
                    {/* set target={'_blank'} to open a link in a new tab*/}
                    {/* use download attribute to initiate a download of the connected asset. (pdf) */}
                    <a target={`_blank`} className={`topic`} style={{padding: `5px 15px`}} href={`./Resume.pdf`} download={`resume.pdf`}>Click to view and Download Resume</a>
                </section>
            </main>
            <Footer />
        </>
    )
}