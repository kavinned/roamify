import { hotelActions } from "../store/reducers/hotelSlice";
import { useAppDispatch } from "../store/store";

export default function HotelSearch() {
    const dispatch = useAppDispatch();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData);
        const checkInDate = formObject.checkinDate;
        const checkOutDate = formObject.checkoutDate;
        dispatch(hotelActions.setDate({ checkInDate, checkOutDate }));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="hotel-search-form flex flex-1 justify-center items-center"
        >
            <div className="flex flex-col">
                <label htmlFor="checkin-date">Check In</label>
                <input type="date" name="checkinDate" id="checkin-date" />
                <label htmlFor="checkout-date">Check Out</label>
                <input type="date" name="checkoutDate" id="checkout-date" />
                <button className="self-center" type="submit">
                    Search
                </button>
            </div>
        </form>
    );
}
