import Image from "next/image";
import { prisma } from "./utils/db";
import { Suspense } from "react";
import Link from "next/link";

async function getData() {
  const data = await prisma.BlogPost.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      imgUrl: true,
      authorImage: true,
      authorName: true,
      createdAt: true,
    },
  });
  return data;
}

export default function Home() {
  return (
    <>
      <div className="py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Post</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <GetPosts />
        </Suspense>
      </div>
    </>
  );
}

async function GetPosts() {
  const data = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id}  >
          <div className="border p-4 rounded-md shadow-sm">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.imgUrl}
              alt={post.title}
              className="object-cover transition-transform duration-100 group-hover:scale-105 rounded-md"
              fill
            />
          </div>
          <div className="py-4">
            <h3 className="text-lg mb-2 font-semibold text-gray-900 ">
              {post.title}
            </h3>
          </div>
          <div>
            <p className="mb-4 text-sm text-gray-600 line-clamp-2">
              {post.content}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative size-8 overflow-hidden rounded-full">
                <Image
                  src={post.authorImage}
                  alt={post.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 ">
                {post.authorName}
              </p>
            </div>
            <time className="text-sm text-gray-500 ">
              {post.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
        </Link>
      ))}
    </div>  
  );
}
