'use client'

import { FaTelegram } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <div
            className={`
                flex
                items-center
                justify-between
                h-12
                sm:h-16
                bg-primaryColor
                px-5
            `}
        >
            {/* Main Socials */}
            <div className="gap-3 flex items-center">
                <FaTelegram className="h-6 w-6" />
                <FaSquareXTwitter className="h-6 w-6" />
            </div>
            <div className="flex items-center">
                <GiHamburgerMenu className="sm:hidden w-7 h-7" />
                <div className="sm:flex sm:flex-row gap-7 sm:visible hidden">
                    <a className="hover:bg-black hover:text-primaryColor rounded-lg hover:transition-all px-4 py-2 duration-300 cursor-pointer">
                        TOKEN
                    </a>
                    <a className="hover:bg-black  hover:text-primaryColor rounded-lg hover:transition-all px-4 py-2 duration-300 cursor-pointer">
                        MEMES
                    </a>
                    <a className="hover:bg-black hover:text-primaryColor rounded-lg hover:transition-all px-4 py-2 duration-300 cursor-pointer">
                        SOCIALS
                    </a>
                    <a className="hover:bg-black hover:text-primaryColor rounded-lg hover:transition-all px-4 py-2 duration-300 cursor-pointer">
                        BUY TOKEN
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header
