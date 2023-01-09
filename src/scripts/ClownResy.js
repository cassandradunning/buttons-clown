import {Requests} from "./Requests.js"
import{ BookingForm } from "./BookingForm.js"

export const ClownResy = () => {
    return `
    <h1>Rerserving a Clown</h1>
    <section class="bookingForm">
        ${BookingForm()}
    </section>

    <section class="bookingRequests">
        <h2>Booking Requests</h2>
        ${Requests()}
    </section>
    </section>
    `
}
