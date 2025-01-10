interface ExpertCardProps {
  name: string;
  title: string;
  imageUrl: string;
}

export function ExpertCard({ name, title, imageUrl }: ExpertCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        <button className="mt-3 text-sm text-[#E91E63] font-medium">
          View Profile →
        </button>
      </div>
    </div>
  );
}