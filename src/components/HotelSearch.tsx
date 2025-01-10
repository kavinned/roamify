import { useAppDispatch, useAppSelector } from "../store/store";
import { hotelThunk } from "../store/thunks/cityThunk";
import SmallLoader from "./SmallLoader";

export default function HotelSearch() {
    const { entityId } = useAppSelector((state) => state.city);
    const { status } = useAppSelector((state) => state.hotel);
    const dispatch = useAppDispatch();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData);
        const checkInDate = formObject.checkinDate as string;
        const checkOutDate = formObject.checkoutDate as string;
        if (entityId)
            dispatch(hotelThunk({ entityId, checkInDate, checkOutDate }));
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="hotel-search-form flex flex-1 justify-center items-center"
        >
            <div className="flex flex-col gap-5">
                {status === "loading" ? (
                    <SmallLoader />
                ) : (
                    <>
                        <span className="flex flex-col gap-1">
                            <label htmlFor="checkin-date">Check In</label>
                            <input
                                type="date"
                                name="checkinDate"
                                id="checkin-date"
                                required
                            />
                        </span>
                        <span className="flex flex-col gap-1">
                            <label htmlFor="checkout-date">Check Out</label>
                            <input
                                type="date"
                                name="checkoutDate"
                                id="checkout-date"
                                required
                            />
                        </span>
                        <button className="self-center" type="submit">
                            Search
                        </button>
                    </>
                )}
            </div>
        </form>
    );
}
