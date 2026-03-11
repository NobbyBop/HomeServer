import Navigation from "./Navigation"

function Professional(){
    const professionalHistory = [
        {
            title: "Software Development Intern",
            company: "Agentuity",
            link: "https://agentuity.com/",
            description: 
            (
            <p>
                In this role, I built AI agents for both external and internal use. 
                Externally, I developed agents for training documentation purposes. 
                Internally, I created an agent that integrated with Smartlead to receive, 
                categorize, store, and reply to customer emails. I worked with multiple 
                frameworks including OpenAI, Anthropic, and Vercel. A particularly interesting 
                project I made was a "hiring manager agent" that conducted simulated conversations with 
                applicant agents and evaluated their performance. You can view more about that {" "}
                <a href="https://agentuity.com/blog/community-contributions-hiring-manager"
                    target="_blank"
                    className="text-blue-600 hover:underline">
                        here
                </a>{"."}</p>),
            date: "May 2025 - August 2025",
            image: "/images/Agentuity.webp"
        },
        {
            title: "Computer Architecture and Systems Programming Course Assistant",
            company: "Stevens Institute of Technology",
            link: "https://stevens.smartcatalogiq.com/en/2023-2024/academic-catalog/courses/cs-computer-science/300/cs-382/",
            description: 
            (
            <p>
                As a course assistant I held several responsibilities, including teaching a lab section,
                holding office hours, and proctoring/grading exams and assignments. These required me to
                have expertise in topics such as ARM Assembly, C, Linux, Bash, and more. (I actually built
                an AI agent to make my life a little easier. It searches through the textbook, looks at course
                logistics, and more. You can view that {" "}
                <a href="https://github.com/NobbyBop/cs392-bun"
                    target="_blank"
                    className="text-blue-600 hover:underline">
                        here
                </a>{".)"}</p>),
            date: "August 2024 - Present",
            image: "/images/Stevens.webp"
        },
        {
            title: "Development Intern",
            company: "Mericle Commercial Real Estate Services",
            link: "https://www.mericle.com/",
            description: 
            (
            <p> My main deliverable in this role was a fully automatic training schedule system, 
                for contracted construction workers, electricians, plumbers, and others. Interestingly enough,
                I "programmed" the entire system in Smartsheet (if you're unfamiliar, it's similar to Excel).
                Coming from a programming background, I initially found the limitations of the software
                frustrating. But, it forced me to get creative. I was able to leverage complicated formulas
                and data flows to take users through the entire process of scheduling and tracking their required
                OSHA training, as well as providing a helpful interface for administrators. 
            </p>),
            date: "May 2024 - August 2024",
            image: "/images/Mericle.webp"
        },
        {
            title: "Research Assistant",
            company: "LIINES at Stevens",
            link: "https://liines.net/",
            description: 
            (
            <p> Over the course of my first summer at Stevens, I took the lead on a team of four, tasked with
                scraping data from the United States Energy Information Administration website {" ("}
                <a href="https://www.eia.gov/"
                    target="_blank"
                    className="text-blue-600 hover:underline">
                        www.eia.gov
                </a>{" if you're interested.)"} We were able to create a book of figures almost 20,000 pages long
                containing data on various types of energy production and consumption. This was my first experience
                using data mining and visualization techniques in Python. It was a great first professional experience,
                and allowed me the opportunity to grow technically and professionally in a working environment. </p>),
            date: "May 2024 - May 2025",
            image: "/images/LIINES.webp"
        }
    ]
    return(
        <div className={`bg-cover bg-center p-4`} 
            style={{ backgroundImage: "url('images/ProfessionalBG2.webp')", backgroundPosition: "left" }}>
        <div className="flex flex-col items-center min-h-screen font-[monospace]">
            <div><Navigation displayName="true" underline="false"/></div>
            <div className="flex flex-col items-center justify-center lg:max-w-1/2 gap-4">
                <div className="p-2"></div>
                {professionalHistory.map((experience)=>{ return (
                    <div className="flex flex-col lg:flex-row border-2 border-gray-200 bg-white/50 gap-4 p-4">
                        <div className="">
                            <h2 className="text-center text-lg font-bold">{experience.title}</h2>
                            <p className="text-center text-gray-600">@ {
                                <a href={experience.link}
                                target="_blank"
                                className="text-blue-600 hover:underline">
                                    {experience.company}
                                </a>} | {experience.date}</p>
                            <p>{experience.description}</p>
                        </div>
                        <img className="border-2 max-w-[10vw] max-h-[10vw]" src={experience.image}/>
                    </div>)
                })}
            </div>
        </div>
        </div>

    )
}

export default Professional