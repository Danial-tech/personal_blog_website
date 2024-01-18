import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "dc3hpk0u",
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
