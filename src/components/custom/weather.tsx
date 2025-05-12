export const Weather = ({
  temperature,
  weather,
  location,
}: {
  temperature: number;
  weather: string;
  location: string;
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-muted rounded-lg">
      <h2 className="font-bold">Current Weather for {location}</h2>
      <p>
        Condition: <span className="text-lg font-black">{weather}</span>
      </p>
      <p>
        Temperature: <span className="text-lg font-black">{temperature}°C</span>
      </p>
    </div>
  );
};
