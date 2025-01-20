import { Earth, MapPin, ListChecks, LayoutDashboard } from "lucide-react";
import Hero from "../components/Hero";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useAppSelector } from "../store/store";

export default function Index() {
    useDocumentTitle();
    const { isAuth } = useAppSelector((state) => state.auth);

    const features = [
        {
            icon: Earth,
            name: "City Search",
            description: "Search for cities to plan your trips.",
            href: "/search",
            cta: "Go to Search",
            background: "",
            className:
                "lg:row-start-2 lg:row-end-4 lg:col-start-2 lg:col-end-3",
            enableGradient: true,
            gradientColors: [
                "rgba(0, 158, 96, 0.1)",
                "rgba(0, 158, 96, 0.3)",
                "rgba(0, 158, 96, 0.5)",
                "rgba(0, 158, 96, 0.7)",
                "rgba(0, 158, 96, 0.9)",
                "transparent",
            ],
            animateGradient: true,
            gradientClassName:
                "-top-48 -right-36 w-[40rem] h-[30rem] opacity-30",
        },
        {
            icon: MapPin,
            name: "City Details",
            description: "View detailed information about cities.",
            href: "/city?name=Barcelona",
            cta: "Check out a City",
            background: "",
            className:
                "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
        },
        {
            icon: ListChecks,
            name: "Itinerary Management",
            description: "Create, edit, and manage your itineraries.",
            href: isAuth ? "/itineraries" : "/login?redirect=itineraries",
            cta: isAuth ? "View Itineraries" : "Login to Itinerary",
            background: "",
            className:
                "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4 small-bento-card",
        },
        {
            icon: LayoutDashboard,
            name: "Dashboard",
            description: "View your dashboard with all your trip information.",
            href: isAuth ? "/dashboard" : "/login",
            cta: isAuth ? "View Dashboard" : "Login to Dashboard",
            background: "",
            className:
                "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center">
            <Hero />
            <BentoGrid className="p-10 grid-rows-3 grid-cols-2">
                {features.map((feature, idx) => (
                    <BentoCard
                        className={feature.className}
                        background={feature.background}
                        Icon={feature.icon}
                        description={feature.description}
                        name={feature.name}
                        cta={feature.cta}
                        href={feature.href}
                        key={idx}
                        enableGradient={feature.enableGradient}
                        gradientColors={feature.gradientColors}
                        animateGradient={feature.animateGradient}
                        gradientClassName={feature.gradientClassName}
                    />
                ))}
            </BentoGrid>
        </div>
    );
}
