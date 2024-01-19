import { sanityClient, urlFor } from "@/lib/sanity";
import { BlogCard } from "@/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image"; // Import the 'Image' component from the appropriate package
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30; // In seconds

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc){
    title,
    smallDescription,
    "currentSlug": slug.current, 
    titleImage,
  }`;

  const data = await sanityClient.fetch(query);

  return data;
}
export default async function Home() {
  const data: BlogCard[] = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((blog, id) => (
        <Card key={id}>
          <Image
            src={urlFor(blog.titleImage).url()}
            alt="image"
            width="500"
            height="500"
            className="rounded-t-lg h-[200px] object-cover"
          />
          <CardContent className="mt-5">
            <h3 className="text-lg font-bold line-clamp-2">{blog.title}</h3>
            <p className="text-small line-clamp-3 mt-2 text-gray-600 dark:text-gray-300">
              {blog.smallDescription}
            </p>
            <Button asChild className="w-full mt-7">
              <Link
                className="font-semibold text-white dark:text-gray-900"
                href={`/blog/${blog.currentSlug}`}
              >
                Read More
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
