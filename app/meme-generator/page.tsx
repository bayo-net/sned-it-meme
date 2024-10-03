export default function MemeGeneratorPage() {
    return (
        <div className="flex flex-grow bg-secondaryColor font-[family-name:var(--font-gloriahallelujah-sans)]">
            <div className="flex flex-col sm:flex-row items-start mx-auto my-14">
                {/* Show image section */}
                <section className="border-4 border-black w-full sm:w-[500px] sm:h-[500px]"></section>
                {/* Meme selction and creation section */}
                <section className="border-4 border-black w-full px-16 py-10 border-l-0 relative flex flex-col gap-4 justify-center">
                    <h1 className="absolute -top-8 left-1/2 -translate-x-1/2 t-font-bold bg-primaryColor rounded-lg px-5 py-4 shadow-black shadow-custom ">
                        SNED A MEME
                    </h1>
                    <button className="bg-primaryColor px-4 py-3 rounded-lg mt-6">
                        Download Meme
                    </button>
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl">Templates</h1>
                        <div className="flex flex-row gap-3">
                            {[0, 1, 2].map((key) => {
                                return (
                                    <div
                                        key={key}
                                        className="w-[80px] h-[80px] border-2 border-black"
                                    ></div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <h1 className="text-2xl">Text</h1>
                        <button className="bg-primaryColor rounded-lg px-3 py-2 shadow-black shadow-custom">
                            Add new text
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}
