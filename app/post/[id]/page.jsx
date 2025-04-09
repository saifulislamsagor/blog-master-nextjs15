import { prisma } from "@/app/utils/db";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPost(id) {
  const post = await prisma.BlogPost.findUnique({
    where: {
      id: id,
    },
  });

  if (!post) {
    return notFound();
  }

  return post;
}

export default async function IdPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link className={buttonVariants()} href={"/"}>
        Back to posts
      </Link>

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                className="object-cover"
                src={post.authorImage}
                alt={post.authorName}
                fill
              />
            </div>
            <p className="font-medium">{post.authorName}</p>
          </div>
          <p className="text-sm text-gray-500">
            {post.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </p>
        </div>
      </div>
      <div className="relative h-96 w-full overflow-hidden mb-8 rounded-lg shadow-md">
        <Image
          className="object-cover"
          src={post.imgUrl}
          alt={post.title}
          fill
          priority
        />
      </div>
      <Card>
        <CardContent className={"text-gray-700"}>{post.content}</CardContent>
      </Card>
    </div>
  );
}
