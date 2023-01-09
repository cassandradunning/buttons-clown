const applicationState = {
    requests: [],
    clowns: [],
    completions: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (bookingRequests) => {
                // Store the external state in application state
                applicationState.requests = bookingRequests
            }
        )
}
fetchRequests()

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (staff) => {
                // Store the external state in application state
                applicationState.clowns = staff
            }
        )
}
fetchClowns()

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (bookingCompletions) => {
                // Store the external state in application state
                applicationState.completions = bookingCompletions
            }
        )
}
fetchCompletions()

// GET FUNCTIONS
export const getRequests = () => {
    return [...applicationState.requests]
}
export const getClowns = () => {
    return [...applicationState.clowns]
}
export const getCompletions = () => {
    return [...applicationState.completions]
}

// Send a Request
export const sendRequest = (userServiceRequest) => {
    const mainContainer = document.querySelector("#container")
    const fetchOptions = {
        // POST Method: API creates something new
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    // Update your sendRequest() function's fetch call to dispatch
    //  the custom event after the POST operation has been completed.
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// Send a Completion
export const sendCompletion = (serviceComplete) => {
    const mainContainer = document.querySelector("#container")
    const fetchOptions = {
        // POST Method: API creates something new
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(serviceComplete)
    }
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// When you use the DELETE method on an HTTP request, you must identify a single 
// resource. Therefore, the function whose responsiblity it is to initiate the fetch 
// request for DELETE must have the primary key sent to it as an argument.
export const deleteRequest = (id) => {
    const mainContainer = document.querySelector("#container")

    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}