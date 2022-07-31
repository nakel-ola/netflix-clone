import { signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, {  FormEvent, useState } from "react";
import { IoChevronDown, IoNotifications, IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase.js";
import useScroll from "../hooks/useScroll";
import { Popover } from "@mui/material";

import { login, logout } from "../redux/features/userSlice";

const Header = ({}: { show?: boolean }) => {
  const router = useRouter();
  const show = useScroll();

  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const { user } = useSelector((store: any) => store.user);

  const open = Boolean(anchorEl);

  const id = open ? "notifications" : undefined;

  const handleClick = (e: any) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleAuth = () => {
    if (!user) {
      signInWithPopup(auth, provider)
        .then((result) => setUser(result))
        .catch((error) => {
          console.error(error);
        });
    } else if (user) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const setUser = (result: any) => {
    const user = result.user;
    dispatch(
      login({
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName,
      })
    );
    router.replace("/home");
  };

  const items = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Tv Shows",
      path: "/series",
    },
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "New & Popular",
      path: "/popular",
    },
    {
      name: "My List",
      path: "/list",
    },
  ];

  const match = (path: string) => {
    return path === router.pathname;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={`fixed top-0 w-full flex items-center justify-between z-50 ${
        show
          ? "bg-black"
          : "bg-gradient-to-b from-neutral-900/90 to-neutral-900/0"
      } `}
    >
      <div className="flex items-center">
        <div className="max-h-[60px] max-w-[100px] lg:max-h-[80px] lg:max-w-[150px]">
          <img src="/netflix_logo.png" alt="" className="w-full h-full" />
        </div>
        {user && (
          <>
            <button
              onClick={handleClick}
              aria-describedby={id}
              className="lg:hidden flex items-center justify-center px-[8px]"
            >
              <p className="text-white">Browse</p>
              <IoChevronDown className="text-white" />
            </button>
            <div className="hidden lg:flex items-center pl-[35px] cursor-pointer">
              {items.map((item, index) => (
                <p
                  key={index}
                  onClick={() => router.push(item.path)}
                  className={` ${
                    match(item.path)
                      ? "text-white font-semibold"
                      : "text-neutral-300"
                  } p-[5px]`}
                >
                  {item.name}
                </p>
              ))}
            </div>

            <Popover
              id={id}
              open={open}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              anchorEl={anchorEl}
              classes={{
                paper:
                  "rounded-xl w-[200px] dark:bg-neutral-800/50 scrollbar-style",
              }}
              onClose={() => setAnchorEl(null)}
            >
              <div className="dark:bg-neutral-800 ">
                {items.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => router.push(item.path)}
                    className={` ${
                      match(item.path)
                        ? "text-white font-semibold"
                        : "text-neutral-300"
                    } p-[5px] text-center cursor-pointer`}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </Popover>
          </>
        )}
      </div>

      <div className="flex items-center p-[5px]">
        {user && (
          <>
            {toggle ? (
              <form onSubmit={handleSubmit}>
                <div className=" flex items-center bg-black/50 border-[1px] border-white">
                  <IoSearch className="text-white m-[5px]" />
                  <input
                    type="text"
                    placeholder="Title, people, genres"
                    className="bg-transparent"
                    value={input}
                    onChange={(e: any) => setInput(e.target.value)}
                  />
                </div>
                <button type="submit" className="hidden"></button>
              </form>
            ) : (
              <IoSearch
                onClick={() => setToggle(true)}
                className="text-white text-[20px] mx-[5px]"
              />
            )}

            <IoNotifications className="text-white text-[20px] mx-[5px]" />
            <div className="flex items-center px-[8px]">
              <div className="w-[35px] h-[35px] rounded-full overflow-hidden shrink-0">
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="lg:inline hidden text-white pl-[8px]">
                {user?.displayName}
              </p>
            </div>
          </>
        )}
        <button
          onClick={handleAuth}
          className="bg-red-700 flex items-center text-white text-md py-[2px] px-[5px] lg:py-[5px] mdpx-[8px] border-0 outline-0 rounded-md m-[5px] mr-[10px] lg:mr-[25px] hover:bg-red-200"
        >
          {user ? "Sign-Out" : "Sign-In"}
        </button>
      </div>
    </div>
  );
};

export default Header;
