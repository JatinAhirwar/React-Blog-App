import React, { useState, useEffect } from "react";
import appwriteService from '../appwrite/config'
import { Container, PostCard } from "../components/index";

function AllPost() {
    const [posts, setPosts] = useState();

    useEffect((posts) => {

    }, []);

    appwriteService.getPosts([])
        .then((post) => {
            if (post) {
                setPosts(posts.document)
            }
        });

    return (
        <div className=" w-full py-8">
            <Container>
                <div className=" flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard post={post} />
                        </div>
                    ))}

                </div>
            </Container>
        </div>
    );
}

export default AllPost;