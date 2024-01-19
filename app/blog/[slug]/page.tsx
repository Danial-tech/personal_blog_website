import { BlogPost } from "@/lib/interface";
import { sanityClient, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // In seconds

async function getData(slug: string) {
  const query = `
  *[_type == "blog" && slug.current == "${slug}"] {
    "currentSlug": slug.current,
    title,
    content,
    titleImage,
  }[0]`;

  const data = await sanityClient.fetch(query);

  return data;
}

const BlogArticle = async ({ params }: { params: { slug: string } }) => {
  const data: BlogPost = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Danial - Blog
        </span>
        <span className="block mt-2 text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}{" "}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt="Title Image"
        width="800"
        height="800"
        priority
        className="rounded-3xl mt-8 border"
      />
      <div className="mt-16 prose prose-blue dark:prose-invert">
        <PortableText value={data.content} />
      </div>
    </div>
  );
};

export default BlogArticle;
