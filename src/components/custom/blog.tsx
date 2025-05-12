import Image from "next/image";

export const Blog = ({ title, body }: { title: string; body: string }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-muted rounded-lg">
      <div className="h-1/2">
        <Image
          width={300}
          height={100}
          src="/images/blog.jpg"
          alt="Blog Image"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="h-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p>{body}</p>
      </div>
    </div>
  );
};
