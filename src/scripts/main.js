import { ClownResy } from "./ClownResy.js"
import { fetchRequests, fetchCompletions, fetchClowns } from "./dataAccess.js"

/* 
    You need to fetch the data from the API and store it in application state
    before you can convert the data structures to HTML representations. 
 */

const mainContainer = document.querySelector("#container")
// invoking completions and plumbers
const render = () => {
    fetchRequests()
        .then(() => fetchCompletions())
        .then(() => fetchClowns())
        .then(
            () => {
                mainContainer.innerHTML = ClownResy()
            }
    )
}

render()

// Now your main module has to listen for the custom event and invoke the render() 
// function to build all the HTML again.
mainContainer.addEventListener(
    "stateChanged", 
    customEvent => {
        render()
    }
)