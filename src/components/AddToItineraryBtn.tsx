interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AddToItineraryBtn({ onClick }: Props) {
    return <button onClick={onClick}>Add To Itinerary</button>;
}
