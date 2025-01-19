import useDocumentTitle from "../hooks/useDocumentTitle";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { fetchItineraries } from "../store/thunks/itineraryThunk";
import { ArrowRight } from "lucide-react";
import { BentoCard, BentoGrid } from "../components/ui/bento-grid";
import { Card, CardContent } from "../components/ui/card";

export default function Dashboard() {
    useDocumentTitle("Dashboard");
    const { itineraries } = useAppSelector((state) => state.itinerary);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchItineraries());
    }, [dispatch]);

    return (
        <div className=" container h-screen max-w-screen p-4 flex flex-col gap-4">
            <h1 className="mt-16 text-4xl font-bold w-3/4 text-left">
                Dashboard
            </h1>
            <BentoGrid className="h-3/4 w-3/4 grid-rows-5 grid-cols-2">
                <BentoCard
                    name="Upcoming Trips"
                    description="View your next adventures."
                    Icon={ArrowRight}
                    href="/dashboard/upcoming"
                    cta="View"
                    className="lg:row-start-1 lg:row-end-6 lg:col-start-1 lg:col-end-2"
                    background=""
                />
                <BentoCard
                    name="Past Trips"
                    description="Relive your past adventures."
                    Icon={ArrowRight}
                    href="/dashboard/past"
                    cta="View"
                    className="lg:row-start-1 lg:row-end-5 lg:col-start-2 lg:col-end-2"
                    background=""
                />
                <Card className="lg:row-start-5 lg:row-end-6 lg:col-start-2 lg:col-end-2 bg-muted/30 shadow-xl drop-shadow-sm border light:border-gray-300/50">
                    <CardContent className="flex flex-col justify-center items-center w-full h-full p-0">
                        <h2 className="text-2xl font-semibold">Total Trips</h2>
                        <p
                            className="text-xl font-bold"
                            style={{
                                textShadow: "0 0 10px gold",
                            }}
                        >
                            {itineraries?.length}
                        </p>
                    </CardContent>
                </Card>
            </BentoGrid>
        </div>
    );
}