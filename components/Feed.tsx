'use client';

import {useState, useEffect, ChangeEvent} from 'react';
import {useRouter} from 'next/navigation';

import PostCard from './PostCard';
import {user, post} from '@prisma/client';

type Props = {
    posts: PostWithUsers[];
};

type CardProps = {
    data: PostWithUsers[];
    handleTagClick: (tagName: string) => void;
    handleEdit: (post: post) => void;
    handleDelete: (post: post) => Promise<void>;
};

const PromptCardList = ({
    data,
    handleTagClick,
    handleEdit,
    handleDelete,
}: CardProps) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    handleTagClick={handleTagClick}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
};

const Feed = ({posts}: Props) => {
    const [allPosts, setAllPosts] = useState(posts);

    // Search states
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
    const [searchedResults, setSearchedResults] = useState(posts);

    const router = useRouter();

    const filterPrompts = (posts: PostWithUsers[], searchtext: string) => {
        const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
        return posts.filter(
            (item: PostWithUsers) =>
                regex.test(item.user.username) ||
                regex.test(item.prompt) ||
                regex.test(item.tag)
        );
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(allPosts, e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName: string) => {
        setSearchText(tagName);
        const searchResult = filterPrompts(allPosts, tagName);
        setSearchedResults(searchResult);
    };

    const handleEdit = (post: post) => {
        // router.push(`/updatepost?id=${post.id}`);
        router.push(`/post/${post.id}`);
    };

    const handleDelete = async (post: post) => {
        const hasConfirmed = confirm(
            'Are you sure you want to delete this prompt?'
        );

        if (hasConfirmed) {
            try {
                const res = await fetch(`/api/post/${post.id.toString()}`, {
                    method: 'DELETE',
                });

                const filteredPosts = allPosts.filter(
                    (item) => item.id !== post.id
                );
                setAllPosts(filteredPosts);

                const searchResult = filterPrompts(filteredPosts, searchText);
                console.log(searchResult);
                setSearchedResults(searchResult);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={(e) => handleSearchChange(e)}
                    required
                    className="search_input peer"
                />
            </form>
            {/* All Prompts */}
            <PromptCardList
                data={searchedResults}
                handleTagClick={handleTagClick}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </section>
    );
};

export default Feed;
