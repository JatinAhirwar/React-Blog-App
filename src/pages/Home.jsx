import React, { useEffect, useState } from "react";
import appwriteService from '../appwrite/config';
import { Container, PostCard } from "../components/index";

function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().them((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if(posts.length === 0){
        return(
            <div>
                <Container>
                    <h1>login to read post</h1>
                </Container>
            </div>
        );
    }
    return(
        <div className=" py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );

}

export default Home;