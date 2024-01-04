// You can create any prop (property) that you want
// However, when you create it, you need to then bring it into the component function prop parameter, and then additionally, actually use it within the component itself.
export default function Project({id, project}) {
    return (
        // You want to have unique ids throughout your project. When passing in props, such as ids, try to make the string name unique and easy to understand using template literals. (instead of id = 1, have user-1, or project-1)
        <div id={`project-${id}`} className={`project flex alignCenter justifyCenter flexColumn`}>
            {project.image && <img height={100} src={project.image} />}
            <h3><a className={`mainColorLink mainColorLinkAlt`} href={project.url}>{project.name}</a></h3>
            <p style={{paddingLeft: 15, paddingRight: 15}}>{project.description}</p>

            {project.topics && project.topics.length > 0 && <div className={`projectTopics flex gap5 justifySpaceBetween alignCenter`}>
                {project.topics.map((topic, topicIndex) => {
                    return <div key={topicIndex} className={`topic`}>{topic}</div>
                })}
            </div>}
        </div>
    )
}