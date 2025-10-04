
import Link from 'next/link';

interface teamCard{
    style: 'secondary' | 'primary',
    path: string,
    name: string,
    description: string,
    href: string
}

export default function TeamComponent({path, name, description, style, href}: teamCard) {
  return (
    <Link href={href} className="block h-full">
      <div className={`${style} flex flex-col items-center p-2 sm:p-3 lg:p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:brightness-110 hover:scale-105 cursor-pointer h-full min-h-0`}>
        <img src={path} alt={name} className="w-16 sm:w-20 md:w-24 max-w-full h-auto mb-1 sm:mb-2 lg:mb-2 transition-transform duration-300 hover:scale-110" />
        <h2 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center leading-tight">{name}</h2>
        <p className="text-white-600 mb-1 sm:mb-2 lg:mb-2 text-xs sm:text-sm md:text-base lg:text-lg font-semibold mt-1 sm:mt-2 lg:mt-2 text-center leading-relaxed px-1 sm:px-2">{description}</p>
        <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:gap-4 w-full">
          {/* Team member cards go here */}
        </div>
      </div>
    </Link>
  );
}
