import { Button } from "./ui/button";

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AddToItineraryBtn({ onClick }: Props) {
    return (
        <Button
            variant="default"
            className="w-fit h-fit p-2 bg-muted-foreground hover:bg-muted-foreground/20 hover:text-muted-foreground text-xs"
            onClick={onClick}
        >
            Add To Itinerary
        </Button>
    );
}
