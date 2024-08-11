import React, {useEffect, useState} from 'react';
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components';
import { useSelector } from 'react-redux';
import '../App.css';

function Home() {
    const [posts, setPosts] = useState([]);

    const authStatus = useSelector(state => state.auth.userData);
    const authStatusStatus = useSelector(state => state.auth.status);

    // console.log("home page:: authStatus:: ",authStatus);
    // console.log("home page:: authStatus:: ",authStatusStatus);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            console.log(posts);
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, []);

    
    // if(!authStatus && posts == ''){
    //     return (
    //         <div className="w-full py-8 mt-4 text-center min-h-screen">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full">
    //                         <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             Login to view posts
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // } 

    if (posts == ''){
        return(<div className='w-full py-8 mt-4 text-center min-h-screen'>
            {/* <img src={loadingGif} alt="" className=' h-20 flex justify-center ' /> */}
        Loading...
        </div>
        );
    }

    
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center min-h-screen">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No post to show here, be the first to creata a post
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap w-full'>
                    {posts.map((post, index) => (
                        <div key={post.$id} className={`p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 ${index % 4 === 0 ? 'pl-0' : ''}`}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home