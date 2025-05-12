export const Book = ({
  name,
  author,
  genre,
  publicationYear,
}: {
  name: string;
  author: string;
  genre: string;
  publicationYear: string;
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-muted rounded-lg">
      <h2 className="font-bold">Book Information</h2>
      <p>
        Name: <span className="text-lg font-black">{name}</span>
      </p>
      <p>
        Author: <span className="text-lg font-black">{author}</span>
      </p>
      <p>
        Genre: <span className="text-lg font-black">{genre}</span>
      </p>
      <p>
        Publication Year:{" "}
        <span className="text-lg font-black">{publicationYear}</span>
      </p>
    </div>
  );
};
