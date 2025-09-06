import Logo from '../../public/Logo.svg';
export default function Navbar() {
    return (
    <div className="w-full flex justify-between items-center">
        {/* Left side - Logo */}
        <div className='flex'>
            <img src={Logo.src} alt="Logo" className="h-15 px-1.5"/>
            <div className='text-white flex flex-col justify-center items-center text-xl p-2'>
                <p className="font-bold">AWS CLOUD CLUB</p>
                <p>GGSIPU - EDC</p>
            </div>
        </div>
        
        {/* Center - Navigation Items */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-semibold flex py-6 space-x-16">
            <p className="cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300">HOME</p>
            <p className="cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300">EVENTS</p>
            <p className="cursor-pointer hover:text-[#FCD8FF] transition-colors duration-300">TEAM</p>
        </div>
        
        {/* Right side - Join Button */}
        <div className="relative rounded-full py-3" style={{
            background: 'linear-gradient(to top right, #090EDB, #DA24BB)',
        }}>
            <button className="px-4 text-white font-semibold rounded-full w-full h-full">
                JOIN CLUB
            </button>
        </div>
    </div>
    )
}