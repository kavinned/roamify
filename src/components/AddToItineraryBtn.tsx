interface Props {
    onClick: () => void;
}

export default function AddToItineraryBtn({ onClick }: Props) {
    return <button onClick={onClick}>Add To Itinerary</button>;
}
