'use client'
import { InfiniteLogoScroll } from '@/components/logoInfiniteScrolling'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaTelegram } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'

export default function Home() {
    const router = useRouter()

    const handleClick = () => {
        router.push('/meme-generator')
    }

    return (
        <div className="min-h-screen max-w-screen font-[family-name:var(--font-gloriahallelujah-sans)] overflow-x-hidden">
            <main className="flex flex-col justify-center items-center bg-[#10B1E0] min-w-full">
                <div className="sm:h-screen relative sm:w-full">
                    <section className="py-14 px-7 flex flex-col justify-center items-center sm:flex sm:flex-row sm:gap-6 sm:h-full sm:-translate-y-20">
                        <div className="flex flex-col justify-center">
                            <h1 className="text-center text-2xl sm:text-5xl sm:leading-[107.05px] sm:text-start">
                                Hello my name Sned. <br />I want to go home.{' '}
                                <br /> Come with me?
                            </h1>
                            <button className="hidden sm:block bg-primaryColor text-2xl text-center w-full sm:w-[333px] px-5 py-2 ">
                                Buy Token
                            </button>
                        </div>
                        <img
                            src="/heroimage.png"
                            alt="hero image"
                            className="sm:w-[631px] sm:h-[622px] -z-0"
                        />
                    </section>
                    <section className="overflow-x-hidden sm:absolute sm:bottom-16">
                        <InfiniteLogoScroll />
                    </section>
                </div>
                <section className="py-20 px-7 flex flex-col justify-center items-center sm:flex-row sm:h-full sm:w-full">
                    <div className="flex-1 flex justify-center items-center">
                        <img
                            src="/alienImage.png"
                            className="sm:w-[512px] sm:h-[512px] hidden sm:block"
                            alt="hero image"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <h1 className="uppercase text-5xl sm:text-[84px] font-[family-name:var(--font-hanaleifill-sans)] sm:text-start">
                            About
                        </h1>
                        <h1 className="text-center text-[19px] py-6 sm:text-start sm:leading-[47.58px] sm:text-wrap text-2xl">
                            Sned has one simple mission: to make it back to my
                            <span className="hidden sm:inline">
                                <br />
                            </span>
                            home in space. But me cant do it alone. By joining
                            <span className="hidden sm:inline">
                                <br />
                            </span>
                            my mission and buying $sned, you’ll help propel Sned
                            <span className="hidden sm:inline">
                                <br />
                            </span>
                            back into the stars where I belongs.
                            <span className="hidden sm:inline">
                                <br />
                            </span>
                        </h1>
                        <img
                            src="/alienImage.png"
                            alt="hero image"
                            className="sm:hidden sm:w-[512px] sm:h-[512px]"
                        />
                        <button className="bg-primaryColor text-2xl text-center w-full px-5 py-2 shadow-black shadow-custom sm:w-[333px]">
                            Buy
                        </button>
                    </div>
                </section>

                <section className="py-20 px-7 flex flex-col justify-center items-center bg-primaryColor sm:w-full sm:flex-row sm:h-full sm:px-7">
                    <div
                        className="flex-1 text-center justify-center items-center
                        sm:items-center sm:justify-between
                    "
                    >
                        <h1 className="uppercase text-5xl font-[family-name:var(--font-hanaleifill-sans)] sm:text-[84px]">
                            Token
                        </h1>
                        <h1 className="text-center text-[19px] py-6 sm:text-start sm:leading-[47.58px] sm:text-wrap text-2xl">
                            Sned made 420 million $sned tokens and me want to
                            share them with as many degens as possible.
                        </h1>
                        <Image
                            src="/teacherImage.png"
                            width={329}
                            height={329}
                            alt="hero image"
                            className="sm:hidden"
                        />
                        <div className="px-4 py-2 bg-secondaryColor shadow-custom w-full">
                            <h1 className="text-2xl">Total Supply of $sned</h1>
                            <p className="text-[13px]">420,000,000,000,000</p>
                        </div>
                        <div className="px-4 py-2 bg-secondaryColor shadow-custom w-full mt-8">
                            <h1 className="text-2xl">Token Address</h1>
                            <p className="text-[13px]">
                                3EqYQ3R84RCDMu2n7anpDMxRhdK8PSWmrRC
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center sm:items-end">
                        <img
                            src="/teacherImage.png"
                            alt="hero image"
                            className="hidden sm:block sm:w-[524px] sm:h-[524px]"
                        />
                    </div>
                </section>
                <section className="py-20 px-7 flex flex-col sm:flex-row justify-center items-center bg-secondaryColor sm:relative">
                    <div>
                        <img
                            src="/buyImage.png"
                            alt="buy image"
                            className="sm:w-[512px] sm:h-[512px] hidden sm:block"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="uppercase text-5xl font-[family-name:var(--font-hanaleifill-sans)] sm:text-[84px] ">
                            How to buy
                        </h1>
                        <img
                            src="/buyImage.png"
                            alt="buy image"
                            className="sm:w-[512px] sm:h-[512px] sm:hidden"
                        />
                        <div className="flex flex-col gap-6 w-full mt-5">
                            <div className="px-4 py-2 bg-primaryColor shadow-custom">
                                <h1 className="text-[20px]">Step 1</h1>
                                <p className="text-[13px]">
                                    Create a wallet with Phantom
                                </p>
                            </div>
                            <div className="px-4 py-2 bg-primaryColor shadow-custom">
                                <h1 className="text-[20px]">Step 2</h1>
                                <p className="text-[13px]">Get some $SOL</p>
                            </div>
                            <div className="px-4 py-2 bg-primaryColor shadow-custom">
                                <h1 className="text-[20px]">Step 3</h1>
                                <p className="text-[13px]">
                                    Swap $SOL for $SNED
                                </p>
                            </div>
                            <div className="px-4 py-2 bg-primaryColor shadow-custom">
                                <h1 className="text-[20px]">Step 4</h1>
                                <p className="text-[13px]">
                                    You are now ready to $SNED IT
                                </p>
                            </div>
                        </div>
                    </div>
                    <section className="overflow-x-hidden sm:absolute sm:-bottom-8 hidden sm:block">
                        <InfiniteLogoScroll />
                    </section>
                </section>
                <section className="pt-20 px-7 flex flex-col justify-center items-center bg-secondaryColor">
                    <h1 className="uppercase text-5xl font-[family-name:var(--font-hanaleifill-sans)] sm:text-[84px]">
                        Meme Machine
                    </h1>
                    <h1 className="text-center text-[19px] py-6">
                        Create your own memes using our meme machine and engage!
                    </h1>
                    <button
                        className="bg-primaryColor text-2xl text-center w-full px-5 py-2 shadow-black shadow-custom
                    "
                        onClick={handleClick}
                    >
                        Make meme
                    </button>
                    <img
                        src="/snedItImage.png"
                        alt="buy image"
                        className="sm:w-[623px] sm:h-[623px]"
                    />
                </section>
                <section className="py-20 px-7 flex flex-col sm:flex-row justify-center items-center bg-primaryColor sm:w-full">
                    <div>
                        <img
                            src="/socials.png"
                            alt="socialsimage"
                            className="sm:w-[623px] sm:h-[623px] hidden sm:block"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center sm:items-start">
                        <h1 className="uppercase text-5xl font-[family-name:var(--font-hanaleifill-sans)] sm:text-[84px]">
                            Socials
                        </h1>
                        <h1 className="text-center text-[19px] py-6">
                            Join the mission today
                        </h1>
                        <div className="w-fit flex flex-row gap-5 py-5">
                            <FaTelegram className="h-14 w-14" />
                            <FaSquareXTwitter className="h-14 w-14" />
                        </div>
                        <button
                            className="bg-secondaryColor text-2xl text-center w-full px-5 py-2 shadow-black shadow-custom sm:w-[333px]
                    "
                        >
                            Buy
                        </button>
                        <img
                            src="/socials.png"
                            alt="socialsimage"
                            className="sm:w-[623px] sm:h-[623px] sm:hidden"
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}
