
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
      <div className={`${style} flex flex-col items-center p-3 sm:p-4 lg:p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:brightness-110 hover:scale-105 cursor-pointer h-full`}>
        <img src={path} alt={name} className="w-16 sm:w-20 md:w-24 lg:w-auto max-w-full h-auto mb-2 sm:mb-3 lg:mb-4 transition-transform duration-300 hover:scale-110" />
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center leading-tight">{name}</h2>
        <p className="text-white-600 mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base md:text-lg lg:text-xl font-semibold mt-2 sm:mt-3 lg:mt-4 text-center leading-relaxed px-1 sm:px-2">{description}</p>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6 w-full">
          {/* Team member cards go here */}
        </div>
      </div>
    </Link>
  );
}
