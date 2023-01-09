import { sendCompletion, getRequests, deleteRequest, getClowns, getCompletions } from "./dataAccess.js"

export const requestListElement = (request) => {
    const clowns = getClowns()
    const completions = getCompletions()
    let html = "" 
    html += `<li>${request.parent}`
    html += `<select class="clowns" id="clowns">
            <option value="">Choose</option>
                ${clowns.map(clown => {
                    return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
                    }).join("")
                }
            </select>
            <button class="request__deny"
                id="request--${request.id}">
                Deny
            </button>
        </li>`
    completions.map (completion => {
        if (completion.requestId === request.id){
            html = `<li> ${request.parent}
            <button class= "request_deny" id= "request-- ${request.id}">
            Deny
        </button><li>`
        }
    }
    )
    return html
}

// maps and joins all <li> elements together
export const Requests = () => {
    const requests = getRequests()
    let html = `
        <ul>
            ${requests.map(requestListElement).join("")}
        </ul>
    `
    return html
}

// add event listener to the main container

const mainContainer = document.querySelector("#container")
// func detects and denies an ID
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


/* 
    Creating New State for Completion
    Add the following event listener to your requests module.
    It should create a new state object, and then send that state to 
    a function in your data access module which will POST it to the API.
*/
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [requestId, clownId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                1. requestId
                2. clownId
                3. date_created
            */
            

            const completion = {
                requestId: parseInt(requestId),
                clownId: parseInt(clownId),
                date_completed: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            sendCompletion(completion)
        }
    }
)