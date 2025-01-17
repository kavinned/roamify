import SmallLoader from "./SmallLoader";

export default function Hero() {
    return (
        <div className="relative overflow-hidden w-full bg-zinc-900 py-24 sm:py-32">
            <SmallLoader classes="absolute w-full h-full top-1/2 left-1/2 -z-10" />
            <img
                src="assets/hero-image.jpg"
                alt=""
                className="absolute inset-0 w-screen object-cover object-top opacity-100 mix-blend-plus-darker h-full z-1"
            />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mix-blend-difference">
                        Explore the World
                    </h2>
                    <p className="mt-6 text-xl leading-8 text-gray-300 mix-blend-difference font-medium">
                        Discover amazing places and plan your perfect trip.
                    </p>
                </div>
            </div>
            <p className="text-white font-thin text-[0.7rem] opacity-50 hover:opacity-100 transition-opacity duration-300 absolute bottom-5 right-5 leading-3">
                Photo by{" "}
                <a
                    className="imgcredit hover:underline duration-300 transition-all"
                    href="https://unsplash.com/@cikstefan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                >
                    Štefan Štefančík
                </a>{" "}
                on{" "}
                <a
                    className="imgcredit hover:underline duration-300 transition-all"
                    href="https://unsplash.com/photos/man-standing-on-cliff-near-falls-0wMmxNB6Xzc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                >
                    Unsplash
                </a>
            </p>
        </div>
    );
}
