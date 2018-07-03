document.addEventListener("DOMContentLoaded", (event) => {
    // Get Current date
    let current = new Date()
    let currentYear = current.getFullYear()
    let currentDate = current.getDate()
    let currentMonth = current.getMonth()
    let currentDay = current.getDay()
    
    // Get first day of the month
    let firstDay = new Date(currentYear, currentMonth, 1).getDay()

    // Set Feburary to its normal amount of days
    let febDays = 28

    // Check if the year is divisible by 4 and 400 but not 100 to see if there is a leap year
    if(currentYear % 4 == 0 && currentYear % 400 == 0 || currentYear % 100 == 0){
        febDays = 29     
    }
    // Set month, days and days of the week
    let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let dayNames = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let daysPerMonth = [31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    // Get all the days in current month
    let daysInMonth = daysPerMonth[currentMonth]

    // Replace default month name with Current Month
    let monthName = document.getElementById('month')
    monthName.innerHTML = months[currentMonth] + " " + currentYear

    // Grab all current events
    let allEvents = document.getElementById('all-events')
    
    axios.get("http://localhost:3000/api/v1/events").then(function(response){
        for(let i = 0; i < response.data.length; i++){   
            let data = response.data[i]
                start = data.start.split("T")
                startTime = start[1].split(".")
                end = data.end.split("T")
                endTime = end[1].split(".")
                description = data.description
                eventContainer = document.createElement('p')
                eventContainer.innerHTML = `Description: ${description} <br> Start Time: ${start[0]} : ${startTime[0]} <br> End Time: ${end[0]} : ${endTime[0]} <br> <input type="Submit" id="${data.id}-delete" value="Delete">`
                allEvents.appendChild(eventContainer)
        }
        deleteEvent(daysPerMonth, currentMonth)
    })
    
    // Build Calendar
    createCalendar(daysPerMonth, currentMonth, firstDay)
    
    // Attach days with events to it
    eventDays(daysPerMonth, currentMonth)
        
    // Loop through all events, edit(PUT) based on id of event (id is attached to button as class)
    // may need another modal for edit

    // On click submit, POST event
    
    onClickSubmit = document.getElementById("new-event")
    
    onClickSubmit.addEventListener("submit", function(event){
    
        // grab form values
        monthStartInfo = document.getElementById("start-month").value
        monthEndInfo = document.getElementById("end-month").value

        timeStartInfo = document.getElementById("start-time").value
        timeEndInfo = document.getElementById("end-time").value

        descriptionInfo = document.getElementById("description").value 
        
        
        if(timeStartInfo !== null && timeEndInfo !== null){
            console.log("I AM POSTING")
            axios.post(`http://localhost:3000/api/v1/events/`,{
                start: monthStartInfo + "T" + timeStartInfo,
                end: monthEndInfo + "T" + timeEndInfo,
                description: descriptionInfo
            })
        }
    })

    // Delete any Event that shows on a day's page
    
    
})

// Build the calendar
function createCalendar(daysPerMonth, currentMonth, firstDay){
    let day = 1
    for(let i = 1; i < 6; i++){ 
        for(let j = 1; j < 8; j++){
            // set first day
            if(day <= daysPerMonth[currentMonth] && j >= firstDay+1){
                let week = document.getElementById(`week-${i}`)
                let dayRow = document.createElement('td')
                dayRow.id = day
                let aDay = document.createElement('a')
                aDay.setAttribute("data-toggle", "modal")
                aDay.setAttribute("href", "#eventModal")
                let dayValue = document.createTextNode(day)
                aDay.appendChild(dayValue)
                dayRow.appendChild(aDay)
                week.appendChild(dayRow)
                ++day
            }else if(day > 1 && day < daysPerMonth){ // set rest of days
                let week = document.getElementById(`week-${i}`)
                let dayRow = document.createElement('td')
                dayRow.id = day
                let aDay = document.createElement('a')
                aDay.setAttribute("data-toggle", "modal")
                aDay.setAttribute("href", "#eventModal")
                let dayValue = document.createTextNode(day)
                aDay.appendChild(dayValue)
                dayRow.appendChild(aDay)
                week.appendChild(dayRow)
                ++day
            }else{ // create empty days up until first day
                week = document.getElementById(`week-${i}`)
                dayRow = document.createElement('td')
                week.appendChild(dayRow)
            }
        }
    }
}

// Build out days with events
function eventDays(daysPerMonth, currentMonth){
    let dayEvents = []
    // Loop through all days, attach click event listener and ajax their info
    for(let i = 1; i < daysPerMonth[currentMonth]+1; i++){
        onClickDay = document.getElementById(i)
        onClickDay.addEventListener(("click"), function() {
            currentEvents = document.getElementById("current-events")
            
            // GET data
            axios.get(`/api/v1/events/`).then(function(response){
                data = response.data
                for(let j = 0; j < data.length; j++){
                    start = data[j].start.split('-')
                    start = start[2].split("T")
                    if(start[0] == i){ //in js, "01" == 1 returns true
                        // currentEvents.innerHTML = `Description: ${data[j].description} Start: ${data[j].start} End:${data[j].end} <input type="Submit" id="${data[j].id}-edit" value="Edit"> <input type="Submit" id="${data[j].id}-delete" value="Delete">`
                        // currentEvents.insertAdjacentHTML('afterbegin', ` Description: ${data[j].description} Start: ${data[j].start} End:${data[j].end} <input type="Submit" id="${data[j].id}-edit" value="Edit"> <input type="Submit" id="${data[j].id}-delete" value="Delete">`)
                        dayEvents.push(`Description: ${data[j].description} Start: ${data[j].start} End:${data[j].end} `)
                    }
                    
                }
                if(dayEvents.length > 0){
                    // console.log(dayEvents)
                    currentEvents.innerHTML = dayEvents.join("<br>")
                    dayEvents.length = 0
                }else{
                    currentEvents.innerHTML = "<h4>No Events</h4>"
                }
                
            })
            .catch(function(error){
                currentEvents.innerHTML = "<h4>No Events</h4>"
            })
           
        })
    }
}

function deleteEvent(daysPerMonth, currentMonth){
    // Loop through all events, delete based on id of event (id is attached to button as class)
    for(let i = 1; i < daysPerMonth[currentMonth]+1; i++){
        onClickDelete = document.getElementById(`${i}-delete`)
        if(onClickDelete === null){
            continue;
        }
        onClickDelete.addEventListener("click", function() {
            console.log("hello")
            currentEvents = document.getElementById("current-events")
                
            // DELETE data
            axios.delete(`http://localhost:3000/api/v1/events/${i}`, {params: { id: i}})
            location.reload()
            })
        }
}