import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import '../App.css';
import { setPosts } from '../store/authSlice';


function Home() {
  const dispatch = useDispatch();

  // Access posts and loading state from Redux store
  const { posts, loading } = useSelector(state => state.posts);
  const authStatus = useSelector(state => state.auth.userData); // If needed

  // Fetch posts when the component mounts
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        // Dispatch the action to set posts in Redux store
        dispatch(setPosts(posts.documents));
      }
    });
  }, [dispatch]);

  // Handle loading state
  if (loading) {
    return (
      <div className='w-full py-8 mt-4 text-center min-h-screen'>
        Loading...
      </div>
    );
  }

  // Handle the case when no posts are available
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center min-h-screen">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No post to show here, be the first to create a post
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Display posts
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
  );
}

export default Home;
