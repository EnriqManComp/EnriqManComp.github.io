import avatarImage from '../assets/avatar.jpg'

function About(){
    return (
        <div className="px-8 py-8">
            <div className="flex">
                <div className="flex flex-1">
                    <img src={avatarImage} alt="avatar" className="w-full h-full"/>
                </div>
                <div className="flex flex-1 px-8 items-center">
                    <div>
                        <p className='text-4xl font-bold pb-3'>About me</p>                                                
                        <p className="text-justify text-2xl">I am currently pursuing a Master's degree in Computer Science driven by my passion
                        for technology and programming, as well as my desire for professional growth.
                        I am conducting research on Deep Reinforcement Learning for robotics applications
                        as part of my thesis, exploring novel methods and algorithms to improve the performance
                        and efficiency of autonomous agents.
                        Simultaneously, I am engaged in projects and courses related to data science,
                        data analysis, and software development.
                        Before enrolling at CICESE, I worked as a telecommunications engineer at ETECSA for two years.
                        In this role, I designed and administered network and IT solutions for various clients,
                        improving their connectivity, security, and performance.
                        Additionally, I collaborated with other engineers and programmers to develop
                        and deploy software applications and databases.</p>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default About;