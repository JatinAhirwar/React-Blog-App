import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import '../App.css';

function PostCard({ $id, title, featuredImage, name }) {

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4 flex'
          style={{ height:'10rem'}}
        >
          <img src={featuredImage} alt={title}
            
            className='rounded-xl h-40' />
        </div>
        <h2
          className='text-xl font-bold'
        >{title}</h2>

        <h3>author {name}</h3>
      </div>
    </Link>
  )
}


export default PostCard