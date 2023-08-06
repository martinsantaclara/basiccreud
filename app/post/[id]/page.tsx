'use client';

import {FormEvent, useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

import Form from '@/components/Form';

type Params = {
    params: {
        id: string;
    };
};

const PostPage = ({params: {id}}: Params) => {
    const router = useRouter();
    // const searchParams = useSearchParams();
    // const postId = searchParams.get('id');

    const postId = id;

    const [post, setPost] = useState({prompt: '', tag: ''});
    const [submitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`/api/post/${postId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (postId) getPostDetails();
    }, [postId]);

    const updatePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!postId) return alert('Missing PromptId!');

        try {
            const response = await fetch(`/api/post/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                console.log(response);
                router.refresh();
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePost}
        />
    );
};

export default PostPage;
