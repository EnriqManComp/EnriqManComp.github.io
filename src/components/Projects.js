import lunarLanderImg from '../assets/LunarLanderProject.png'
import mangoLeafDiseaseClassifier from '../assets/MangoLeafDiseaseClassificatorProject.png'
import nutritionFactCompetition from '../assets/NutritionFactCompetition.jpg'
import ddrRobotOdomLidarGazebo from "../assets/ddrRobotOdomLidarGazebo.jpg"
import recipeWebsiteProject from "../assets/Recipe_Website_Project.png"
import githubScraperProject from '../assets/GithubScraperProject.png'
import ProjectCards from './ProjectCards';

function Projects(){
    
    return (        
        <div className="px-8 py-8">
            <div className='flex justify-center'>
                <h1 className='text-4xl py-4 font-bold'>Projects</h1>
            </div>
            <div className="flex gap-x-2 gap-y-4 grid grid-cols-5">
                <ProjectCards image={lunarLanderImg} description="Lunar Lander description"/>
                <ProjectCards image={mangoLeafDiseaseClassifier} description="Mango Leaf Disease Classifier description"/>
                <ProjectCards image={nutritionFactCompetition} description="Nutrition Fact Competition description"/>
                <ProjectCards image={ddrRobotOdomLidarGazebo} description="DDR Robot Odom Lidar Gazebo description"/>
                <ProjectCards image={recipeWebsiteProject} description="Recipe Website Project description"/>
                <ProjectCards image={githubScraperProject} description="Github Scraper Project description"/>                
            </div>
        </div>
        
    );
}

export default Projects;