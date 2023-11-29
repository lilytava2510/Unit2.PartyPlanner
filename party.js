const COHORT = '/2109-CPU-RM-WEB-PT';
const API_URL = `https://fsa-async-await.herokuapp.com/api/${COHORT}/events`;

const state = {
    events: [],
};
const eventList = document.querySelector("#events");

const addNewEvent = document.querySelector("#addEvent");
addNewEvent.addEventListener("submit", addEvents);


// const deleteThisEvent = document.querySelector("#delete");
// deleteThisEvent.addEventListener("click", deleteEvent);

//calls the two functions 
async function render(){
    await getEvents();
    renderEvents();
}
render();

async function getEvents(){
    try {
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events");
        const json = await response.json();
        state.events = json.data;
    } catch (error) {
        console.error(error);
    }
}

function renderEvents(){
    if (!state.events.length){
        eventList.innerHTML = "<li>Sorry no events scheduled.</li>";
        return;
    }
    const eventInfo = state.events.map((party) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <h2>${party.name}</h2>
        <p>${party.id}</p>
        <p>${party.description}</p>
        <p>${party.date}</p>
        <p>${party.location}</p>`;
        return li;
    });
    eventList.replaceChildren(...eventInfo);
}


async function addEvents(event) {
    event.preventDefault();
    
    try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: addNewEvent.id.value,
                name: addNewEvent.name.value,
                date:addNewEvent.date.value,
                location: addNewEvent.location.value,
                description: addNewEvent.description.value,
            }),
        });
        
        if (!response.ok) {
            throw new Error("Failed to create event");
        }
        
        render();
    } catch (error) {
        console.error(error);
    }
    
}

const deleteEventPlanned = document.querySelector("#delete-btn");
// deleteEventPlanned.setAttribute('id', 'delete-btn');
// deleteEventPlanned.innerText = "delete event";

deleteEventPlanned.addEventListener('click', function(e){
    if(e.target.id === 'delete-btn'){
        fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events/${events.id}`,{
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                accept: "application/json"
            }
        }).then(response => response.json())
          .then(() => {
            events.innerHTML = "";
            const home = events.querySelector(`[data-id='${events.id}']`);
            home.remove();
          })
      
    }
})
// async function deleteEvent(id) {
    //     try {
        //         await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/events/${id}`, {
            //             method: 'DELETE',
            
            //         });
            //     } catch (err) {
                //         console.log(err);
                //     }
                // }
                
                // document.getElementById('deleteBtn').addEventListener('click', async function(){
                    //     await deleteEvent(482);
                    // });
                    
                    
                    
                    
                    