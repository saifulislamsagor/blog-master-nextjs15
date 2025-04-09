import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

async function getPosts(userId) {
  const posts = await prisma.BlogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const posts = await getPosts(user.id);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Article</h2>
        <Link href="/dashboard/create" className={`${buttonVariants()} px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-500`}>
          Create Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
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
    </div>
  );
}
