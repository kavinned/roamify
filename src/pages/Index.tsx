import { Earth, MapPin, ListChecks, LayoutDashboard } from "lucide-react";
import Hero from "../components/Hero";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import useDocumentTitle from "../hooks/useDocumentTitle";

const features = [
    {
        icon: Earth,
        name: "City Search",
        description: "Search for cities to plan your trips.",
        href: "/search",
        cta: "",
        background: "",
        className: "lg:row-start-2 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
        icon: MapPin,
        name: "City Details",
        description: "View detailed information about cities.",
        href: "/city?name=Barcelona",
        cta: "",
        background: "",
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
        icon: ListChecks,
        name: "Itinerary Management",
        description: "Create, edit, and manage your itineraries.",
        href: "/itineraries",
        cta: "",
        background: "",
        className:
            "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4 small-bento-card",
    },
    {
        icon: LayoutDashboard,
        name: "Dashboard",
        description: "View your dashboard with all your trip information.",
        href: "/dashboard",
        cta: "",
        background: "",
        className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
];

export default function Index() {
    useDocumentTitle();

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
                    />
                ))}
            </BentoGrid>
        </div>
    );
}
