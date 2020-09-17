import React from 'react';
import { GetStaticPropsContext } from 'next';
import PostLayout from '../_layouts/PostLayout';
import { getPostBySlug, getAllPosts } from './api/posts';

interface PostProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  content: string;
}

export default function Post({
  title,
  description,
  thumbnailUrl,
  content,
}: PostProps) {
  return (
    <PostLayout
      title={title}
      description={description}
      thumbnailUrl={thumbnailUrl}
      content={content}
    />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: await getPostBySlug(context.params.slug),
  };
}

export async function getStaticPaths() {
  let paths = await getAllPosts();

  paths = paths.map(post => {
    return {
      params: { slug: post.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
