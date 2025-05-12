export const Movie = ({
  name,
  director,
  genre,
  releaseYear,
}: {
  name: string;
  director: string;
  genre: string;
  releaseYear: string;
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-muted rounded-lg">
      <h2 className="font-bold">Movie Information</h2>
      <p>
        Name: <span className="text-lg font-black">{name}</span>
      </p>
      <p>
        Director: <span className="text-lg font-black">{director}</span>
      </p>
      <p>
        Genre: <span className="text-lg font-black">{genre}</span>
      </p>
      <p>
        Release Year: <span className="text-lg font-black">{releaseYear}</span>
      </p>
    </div>
  );
};
