export const Stock = ({
  name,
  price,
  symbol,
}: {
  name: string;
  price: number;
  symbol: string;
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-muted rounded-lg">
      <h2 className="font-bold">Stock Information</h2>
      <p>
        Name: <span className="text-lg font-black">{name}</span>
      </p>
      <p>
        Symbol: <span className="text-lg font-black">{symbol}</span>
      </p>
      <p>
        Price: <span className="text-lg font-black">${price}</span>
      </p>
    </div>
  );
};
