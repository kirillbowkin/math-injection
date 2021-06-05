import { useEffect, useState } from "react";
import sanityClient from "../../client.js";
import BlockContent from "@sanity/block-content-to-react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const serializers = {
  types: {
    latex: (props) => {
      if (props?.isInline) {
        return <InlineMath>{props.node.body}</InlineMath>;
      } else {
        return <BlockMath>{props.node.body}</BlockMath>;
      }
    },
  },
};

function Post({ post }) {
  if (!post) return <div>Loading...</div>;
  return (
    <div>
      <p>Title: {post.title}</p>
      <p>Author: {post.name}</p>
      <div className="prose">
        <BlockContent
          blocks={post.body}
          projectId={sanityClient.clientConfig.projectId}
          dataset={sanityClient.clientConfig.dataset}
          serializers={serializers}
        />
      </div>
    </div>
  );
}

export default Post;

export async function getStaticPaths() {
  const postData = await sanityClient.fetch(
    `
    *[_type == "post"] {
        slug,
      }
    `
  );
  const paths = postData.map((post) => ({
    params: { slug: post.slug.current },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const postData = await sanityClient.fetch(
    `
      *[slug.current == $slug] {
        title,
             "name": author->name,
             body
      }
      `,
    { slug }
  );
  return {
    props: {
      post: postData[0],
    },
    revalidate: 10,
  };
}
