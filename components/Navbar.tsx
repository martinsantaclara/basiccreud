'use client';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [toggleDropdown, setToggleDropdown] = useState(false);

    return (
        <>
            <nav className="flex-between w-full mb-16 pt-3">
                <Link href="/" className="flex gap-2 flex-center">
                    <Image
                        src="/assets/images/logo.svg"
                        alt="Promptopia logo"
                        width={30}
                        height={30}
                        // className="object-contain"
                    ></Image>
                    <p className="logo_text">Promptopia</p>
                    {/* <button onClick={getUser}>User</button> */}
                </Link>
                {/* Desktop Navigation */}
                <div className="sm:flex hidden">
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/post/0" className="black_btn">
                            Create Post
                        </Link>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="sm:hidden flex relative">
                    <div className="flex">
                        <div className="dropdown">
                            <Link
                                href="/prompt/0"
                                className="dropdown_link"
                                onClick={() => setToggleDropdown(false)}
                            >
                                Create Post
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
