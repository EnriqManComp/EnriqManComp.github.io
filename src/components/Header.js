
function Header(){
    return (
        <header>
            <nav className="bg-gray-800">
                <div className="px-8">
                    <div className="flex h-16 justify-between items-center">                        
                        <div className="flex flex-1 justify-end items-center">
                            <div className="flex space-x-4">
                                <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-xl font-medium">Home</a>
                                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-xl font-medium">About me</a>
                                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-xl font-medium">Skills</a>
                                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-xl font-medium">Certifications</a>
                                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-xl font-medium">Projects</a>
                                <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 rounded-md px-3 py-2 text-xl font-medium">Contact</a>
                            </div>
                        </div>
                    </div>                            
                </div>
            </nav>
        </header>
    );   
}

export default Header;