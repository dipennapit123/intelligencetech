import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a ?? []), ["target"], ["rel"]],
    img: [...(defaultSchema.attributes?.img ?? []), ["loading"]],
  },
};

export async function markdownToHtml(markdown: string) {
  const file = await remark()
    .use(remarkRehype)
    .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .use(rehypeSanitize, schema as any)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

