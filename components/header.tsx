'use client'

import { useRouter } from 'next/navigation'
import { FaTelegram } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'

const Header = () => {
    const router = useRouter()

    const handleClick = () => {
        router.push('/meme-generator')
    }

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
                font-[family-name:var(--font-gloriahallelujah-sans)]
            `}
        >
            {/* Main Socials */}
            <img
                src="/logo.png"
                alt="headerlogo"
                className="w-12 h-12 cursor-pointer"
                onClick={() => router.push('/')}
            />

            <div className="flex items-center gap-10">
                <div className="gap-3 flex items-center">
                    <FaTelegram className="h-6 w-6 cursor-pointer" />
                    <FaSquareXTwitter className="h-6 w-6 cursor-pointer" />
                </div>
                <a
                    className="bg-black text-xs sm:text-base text-primaryColor rounded-lg px-4 py-2 cursor-pointer"
                    onClick={handleClick}
                >
                    SNED MEME GENERATOR
                </a>
            </div>
        </div>
    )
}

export default Header
