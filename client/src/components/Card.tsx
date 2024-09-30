interface CardProps {
  title: string;
  value: number | string; // Allow value to be string or number
  change: number | string; // Allow change to be string or number
}

const Card: React.FC<CardProps> = ({ title, value, change }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${Number(change) > 0 ? 'text-blue-500' : 'text-yellow-500'}`}>
        {Number(change) > 0 ? `+${change}% From previous period` : `${change}% From previous period`}
      </p>
    </div>
  );
};

export default Card;
