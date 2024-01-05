import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Section from '../../components/section/Section';

export default function SignIn() {
    return (
        <>
            <Header />
            <main>
                <Section title={`Sign In`} />
                <section id={`signin`} className={`signinContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>Sign In</h2>
                </section>
            </main>
            <Footer />
        </>
    )
}