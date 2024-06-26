import {Booking} from "../types/generic.types.ts";
import {formatDate} from "../utils/dateUtils.ts";
import {formatPrice} from "../utils/priceUtils.ts";
import ShowIf from "./ShowIf.tsx";

interface BookingConfirmationModalProps<T extends Booking> {
	onDismiss: () => void;
	newBookings: T[];
	getPrice?: (booking: T) => number;
}

function BookingConfirmationModal<T extends Booking>({onDismiss, newBookings, getPrice}: BookingConfirmationModalProps<T>) {
	return (
		<div className="absolute w-full h-full flex items-center justify-center z-50 bg-gray bg-opacity-50 backdrop-blur-sm">
			<div className="bg-gray-light p-8 min-h-60 min-w-96">
				<h1 className="text-2xl font-semibold text-center">Booking Complete!</h1>
				<p className="text-lg">Your booking(s) has been confirmed:</p>
				<ul className="max-h-80 overflow-y-auto p-2 text-lg">
					{newBookings.map((booking) => (
						<li key={booking.id} className="flex flex-col">
							<span className="font-semibold">Reference nr: <span className="text-green-800 text-2xl">{booking.id}</span></span>
							<ShowIf condition={getPrice !== undefined}>
								<span className="font-semibold">Price: {formatPrice(getPrice ? getPrice(booking) : 0)}</span>
							</ShowIf>
							<span>
								{formatDate(booking.start)} {booking.start.getHours()}:00 - {booking.end.getHours()}:00
							</span>
						</li>
					))}
				</ul>
				<button
					onClick={onDismiss}
					className="bg-gray-medium border hover:bg-gray text-gray hover:text-gray-light p-2 w-full mt-4 font-semibold"
				>
					Dismiss
				</button>
			</div>
		</div>
	);
}

export default BookingConfirmationModal;