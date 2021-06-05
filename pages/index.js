import Head from "next/head";
import sanityClient from "../client";
import Link from "next/link";
import dayjs from "dayjs";
// import { useState, useEffect } from "react";

export async function getStaticProps(context) {
  const data = await sanityClient.fetch(
    `
    *[_type == "post"] {
      title,
      author,
      slug,
    _createdAt,
      mainImage{
          asset->{
          _id,
          url,
        }
    }
}
    `
  );
  return {
    props: {
      posts: data,
    },
    revalidate: true,
    // will be passed to the page component as props
  };
}
{
  /* <div className="my-2 cursor-pointer float-left">
  <img
    src={post.mainImage.asset.url}
    alt=""
  />
  <h2>{post.title}</h2>
</div> */
}

export default function Home({ posts }) {
  return (
    <div>
      Home Page
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {posts.map((post, idx) => (
          <Link href={`/posts/${post.slug.current}`} key={idx}>
            <div className="rounded overflow-hidden shadow-lg cursor-pointer">
              <img className="w-full" src={post.mainImage.asset.url} alt="" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{post.title}</div>
                <p className="text-gray-700 text-base">
                  <strong>Это описание не настоящее (пока что)</strong>
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
                <strong>Тэги внизу не настоящие (пока что)</strong>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #photography
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #travel
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #winter
                </span>
                <br />
                <br />
                <strong>
                  Published at:&nbsp;
                  {dayjs(post._createdAt).format("D MMMM YYYY").toString()}
                </strong>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
