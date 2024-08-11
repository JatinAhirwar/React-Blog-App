import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../App.css';
import './header.css';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    // {
    //     name: "All Posts",
    //     slug: "/all-posts",
    //     active: authStatus,
    // },
    {
      name: "Add Post",
      slug: "/add-post",
      active: true,
    },
  ];


  return (
    <header className=' z-50 w-9/12'>
      <Container className=" md:w-full">
        <nav className=' items-center'>

          {/* <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />
              </Link>
          </div> */}
          
          <ul className='flex ml-auto items-center justify-evenly'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link to={item.slug}
                    // onClick={() => navigate(item.slug)}
                    className=' px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          
        </nav>
      </Container>
    </header>
  )
}

export default Header