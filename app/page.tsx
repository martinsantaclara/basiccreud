// import Feed from '@components/Feed1';

import Feed from '@/components/Feed';

import prisma from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0; // revalidate this page every 60 seconds

async function getAllPosts() {
    const posts = await prisma.post.findMany({
        include: {
            user: true,
        },
    });
    type prismaUsers = typeof posts;
    return posts;
}

// async function getData() {
//     const res = await fetch('http://localhost:3000/api/prompt', {
//         next: {revalidate: 10},
//     });
//     // const res = await fetch('http://localhost:3000/api/prompt');
//     // const res = await fetch('http://localhost:3000/api/prompt', {
//     //     cache: 'no-store',
//     // });
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.
//     // Recommendation: handle errors
//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error('Failed to fetch data');
//     }
//     return res.json();
// }

const Home = async () => {
    // const posts = await getData();
    // const posts = await res.json();
    const posts = await getAllPosts();

    // const formattedToday = Intl.DateTimeFormat('es-AR', {
    //     dateStyle: 'short',
    //     timeStyle: 'short',
    //     timeZone: 'America/Argentina/Buenos_Aires',
    // }).format(posts[7].createdAt);

    // console.log(formattedToday);

    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">
                    {' '}
                    AI-Powered Prompts
                </span>
            </h1>
            <p className="desc text-center">
                Promptopia is an open-source AI prompting tool for modern world
                to discover, create and share creative prompts.
            </p>
            <Link href="/about">
                <h2>Ir a About</h2>
            </Link>
            <Feed posts={posts} />
            {/* <Feed /> */}
        </section>
    );
};

export default Home;
