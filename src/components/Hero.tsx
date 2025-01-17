export default function Hero() {
    return (
        <div className="relative overflow-hidden w-full bg-zinc-900 py-24 sm:py-32 -z-50">
            <img
                src="assets/hero-image.jpg"
                alt=""
                className="absolute inset-0 w-screen object-cover object-top opacity-100 mix-blend-plus-darker"
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
            <p className="z-50 mix-blend-hard-light font-thin text-[0.7rem] opacity-50 hover:opacity-100 transition-opacity duration-150 absolute bottom-5 right-5">
                Photo by{" "}
                <a href="https://unsplash.com/@cikstefan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Štefan Štefančík
                </a>{" "}
                on{" "}
                <a href="https://unsplash.com/photos/man-standing-on-cliff-near-falls-0wMmxNB6Xzc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Unsplash
                </a>
            </p>
        </div>
    );
}
