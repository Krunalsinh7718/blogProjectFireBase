import Logo from "./Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../../assets/styles/header.css"

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [resMenuActive, setResMenuActive] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      allow: true,
    },
    {
      name: "All Blogs",
      slug: "/all-blogs",
      allow: authStatus,
    },
    {
      name: "Add Blog",
      slug: "/add-blog",
      allow: authStatus,
    },
  ];

  return (
    <>
      <header>
        <div className="relative w-full bg-white mb-5">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center space-x-2">
              <span>
                <Link to="/">
                  <Logo />
                </Link>
              </span>
            </div>
            <div
              className={`hidden lg:block app-nav-menu ${
                resMenuActive ? "res-menu-active" : ""
              }`}
            >
              <ul className="inline-flex gap-4">
                {navItems.map((item) =>
                  item.allow ? (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        className={({ isActive }) =>
                          isActive
                            ? "active text-sm font-semibold text-blue-600 py-2 border-b-2 border-blue-600 border-dotted"
                            : "text-sm font-semibold text-gray-800 hover:text-blue-600 py-2"
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ) : null
                )}
              </ul>
              <div className="lg:hidden mt-4">
                {authStatus ? (
                  <LogoutBtn />
                ) : (
                  <button
                    type="button"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() => navigate("/signin")}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              {authStatus ? (
                <LogoutBtn />
              ) : (
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={() => navigate("/signin")}
                >
                  Login
                </button>
              )}
            </div>
            <button
              className="lg:hidden"
              onClick={() => setResMenuActive((state) => !state)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              >
                <path d="M4 12h16M4 6h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
