import Link from 'next/link';
import { getAllPosts } from './api/posts';

interface HomeProps {
  posts: Array<{
    slug: string;
    title: string;
  }>;
}

function Home(props: HomeProps) {
  return (
    <div>
      <h1>Blog do Paulo Vieira</h1>
      <ul>
        {props.posts.map((post, idx) => (
          <li key={idx}>
            <Link href={post.slug}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default Home;
