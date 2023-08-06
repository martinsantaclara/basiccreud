// type User = {
//     id: number;
//     email: string;
//     username: string;
//     image: string;
// };
// type Post = {
//     id: number;
//     creator: number;
//     prompt: string;
//     tag: string;
//     createdAt: string;
//     user: User;
// };

type PostWithUsers = {
    user: {
        id: number;
        email: string;
        username: string;
        image: string;
    };
} & {
    id: number;
    creator: number;
    prompt: string;
    tag: string;
    createdAt: Date;
};
