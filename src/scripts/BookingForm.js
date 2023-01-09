import { sendRequest } from "./dataAccess.js"

export const BookingForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent Name</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
        <label class="label" for="childName">Child Name</label>
        <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
        <label class="label" for="eventAttendance">Event Attendance</label>
        <input type="number" name="eventAttendance" class="input" />
        </div>
        <div class="field">
            <label class="label" for="bookingAddress">EventAddress</label>
            <input type="text" name="bookingAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="bookingDate">Date of Event</label>
            <input type="date" name="bookingDate" class="input" />
        </div>
        <div class="field">
            <label class="label" for="bookingHours">Number of Hours Needed </label>
            <input type="number" name="bookingHours" class="input" />
        </div>
        <button class="button" id="submitRequest">Submit Request</button>
    `
    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userParent = document.querySelector("input[name='parentName']").value
        const userChild = document.querySelector("input[name='childName']").value
        const userAttendance = document.querySelector("input[name='eventAttendance']").value
        const userAddress = document.querySelector("input[name='bookingAddress']").value
        const userDate = document.querySelector("input[name='bookingDate']").value
        const userHours = document.querySelector("input[name='bookingHours']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parent: userParent,
            child: userChild,
            attendance: userAttendance,
            address: userAddress,
            eventDate: userDate,
            eventHours: userHours
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})