import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

export default function Profile() {
    return (
        <>
            <Header />
            <main>
                <Section title={`Profile`} />
                <section id={`profile`} className={`profileContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>Profile</h2>
                </section>
            </main>
            <Footer />
        </>
    )
}