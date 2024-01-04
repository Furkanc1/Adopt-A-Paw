import { useContext } from 'react';
import { StateContext } from '../../App';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Project from '../../components/project/Project';
import Section from '../../components/section/Section';
// Add a featured project section that will display above the recent github projects, and it can have extra settings for custom images
export default function Portfolio() {
    let { logo, projects } = useContext(StateContext);
    return (
        <>
            <Header />
            <main>
                <Section title={`Portfolio`} />
                <section id={`portfolio`} className={`portfolioContentSection flex alignCenter justifyCenter flexColumn`} style={{padding: 15}}>
                    <h2>Projects</h2>
                    <div className={`projects flex justifySpaceBetween gap15`}>
                        {projects && projects.length > 0 ? projects.map((project, projectIndex) => {
                            // When mapping over an array, you can modify each item within the array.
                            // In this case, we are checking if each project has a defined image property.
                            // If it does not, give it the placeholder image.
                            if (!project.image) {
                                project.image = `/placeholderImage.png`;
                            }
                            // This is where you create the props, which will be used inside of the actual component.
                            // You can also put functions, ternarny statements, etc within the prop components
                            return <Project 
                                        id={projectIndex + 1}
                                        key={projectIndex} 
                                        project={project} 
                                    />
                        }) : <div className={`project flex alignCenter justifyCenter flexColumn w100`}>No Projects Found</div>}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}