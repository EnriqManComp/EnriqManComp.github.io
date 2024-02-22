

function ProjectCards(props){
    return (
        <div className="max-w-sm bg-white rounded-xl overflow-hidden shadow-md relative">
            <div className="">
                <img className="w-full h-48 object-cover" src={props.image} />
            </div>
            <div className="p-4">
                <p className="text-gray-700 text-base">{props.description}</p>
            </div>
            <div className="flex justify-start px-4">
                <div className="bg-blue-700 rounded-full flex justify-center items-center w-8 h-8 m-2">
                    <p className="text-white">1</p>
                </div>
                <div className="bg-orange-700 rounded-full flex justify-center items-center w-8 h-8 m-2">
                    <p className="text-white">2</p>
                </div>
            </div>
        </div>

    );
}

export default ProjectCards;