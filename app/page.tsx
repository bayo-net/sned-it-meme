import Header from '@/components/header'
import { InfiniteLogoScroll } from '@/components/logoInfiniteScrolling'
import Image from 'next/image'
import { FaTelegram } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'

export default function Home() {
    return (
        <div className="min-h-screen max-w-screen font-[family-name:var(--font-gloriahallelujah-sans)] overflow-x-hidden">
            <Header />
            <main className="flex flex-col justify-center items-center bg-[#10B1E0]">
                {/* HeroSection */}
                <section className="py-14 px-7 flex flex-col justify-center items-center">
                    <h1 className="text-center text-2xl">
                        Hello my name Sned. <br />I want to go home. <br /> Come
                        with me?
                    </h1>
                    <Image
                        src="/heroimage.png"
                        width={285}
                        height={307}
                        alt="hero image"
                    />
                </section>
                <section className="overflow-x-hidden">
                    <InfiniteLogoScroll />
                </section>
                <section className="py-14 px-7 flex flex-col justify-center items-center">
                    <h1 className="uppercase text-5xl font-[family-name:var(--font-hanaleifill-sans)]">
                        About
                    </h1>
                    <h1 className="text-center text-[19px] py-6">
                        Sned has one simple mission: to make it back to my home
                        in space. But me cant do it alone. By joining my mission
                        and buying $sned, you’ll help propel Sned back into the
                        stars where I belongs.
                    </h1>
                    <Image
                        src="/alienImage.png"
                        width={329}
                        height={329}
                        alt="hero image"
                    />
                    <button
                        className="bg-primaryColor text-2xl text-center w-full px-5 py-2 shadow-black shadow-custom
                    "
                    >
                        Explore
                    </button>
                </section>
                <section className="py-14 px-7 flex flex-col justify-center items-center bg-primaryColor">
                    <h1 className="uppercase text-5xl font-[family-name:var(--font-hanaleifill-sans)]">
                        Token
                    </h1>
                    <h1 className="text-center text-[19px] py-6">
                        Sned made 420 million $sned tokens and me want to share
                        them with as many degens as possible.
                    </h1>
                    <Image
                        src="/teacherImage.png"
                        width={329}
                        height={329}
                        alt="hero image"
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
                </section>
                <section className="py-14 px-7 flex flex-col justify-center items-center bg-secondaryColor">
                    <h1 className="uppercase text-5xl font-[family-name:var(--font-hanaleifill-sans)]">
                        How to buy
                    </h1>
                    <Image
                        src="/buyImage.png"
                        width={329}
                        height={329}
                        alt="buy image"
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
                            <p className="text-[13px]">Swap $SOL for $SNED</p>
                        </div>
                        <div className="px-4 py-2 bg-primaryColor shadow-custom">
                            <h1 className="text-[20px]">Step 4</h1>
                            <p className="text-[13px]">
                                You are now ready to $SNED IT
                            </p>
                        </div>
                    </div>
                </section>
                <section className="py-14 px-7 flex flex-col justify-center items-center bg-secondaryColor">
                    <h1 className="uppercase text-5xl font-[family-name:var(--font-hanaleifill-sans)]">
                        Meme Machine
                    </h1>
                    <h1 className="text-center text-[19px] py-6">
                        Join the mission and have fun with Sned
                    </h1>
                    <button
                        className="bg-primaryColor text-2xl text-center w-full px-5 py-2 shadow-black shadow-custom
                    "
                    >
                        Make meme
                    </button>
                    <Image
                        src="/snedItImage.png"
                        width={329}
                        height={329}
                        alt="buy image"
                    />
                </section>
                <section className="py-14 px-7 flex flex-col justify-center items-center bg-primaryColor">
                    <h1 className="uppercase text-5xl font-[family-name:var(--font-hanaleifill-sans)]">
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
                        className="bg-secondaryColor text-2xl text-center w-full px-5 py-2 shadow-black shadow-custom
                    "
                    >
                        Buy
                    </button>
                    <Image
                        src="/rocketImage.png"
                        width={329}
                        height={329}
                        alt="rocketImage"
                    />
                </section>
            </main>
        </div>
    )
}
