
interface teamCard{
    style: 'secondary' | 'primary',
    path: string,
    name: string,
    description: string
}

export default function TeamComponent({path, name, description, style}: teamCard) {
  return (
    <div className={`${style} flex flex-col items-center p-6 rounded-lg shadow-lg`}>
      <img src={path} alt={name} />
      <h2 className="font-bold text-4xl">{name}</h2>
      <p className="text-white-600 mb-4 text-xl font-semibold mt-4">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Team member cards go here */}
      </div>
    </div>
  );
}
