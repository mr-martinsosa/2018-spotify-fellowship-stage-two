document.addEventListener("DOMContentLoaded", (event) => {
    // Grab all current events
    let allEvents = document.getElementById('all-events')
    
    axios.get("http://localhost:3000/api/v1/events").then(function(response){
        let data = response.data[0]
        start = data.start
        end = data.end
        description = data.description
        eventContainer = document.createElement('p')
        eventData = document.createTextNode(`Description: ${description}/n Start Time: ${start}/n End Time: ${end}`)
        eventContainer.appendChild(eventData)
        allEvents.appendChild(eventContainer)
    })

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
            }else if(day > 1){ // set rest of days
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

    // Loop through all days, attach click event listener and ajax their info
    for(let i = 1; i < daysPerMonth[currentMonth]+1; i++){
        onClickDay = document.getElementById(i)
        onClickDay.addEventListener(("click"), function() {
            currentEvents = document.getElementById("current-events")
            
            // GET data
            axios.get(`http://localhost:3000/api/v1/events/`).then(function(response){
                data = response.data
                for(let j = 0; j < data.length; j++){
                    start = data[j].start.split('-')
                    start = start[2].split("T")
                    if(parseInt(start[0]) == i){
                        currentEvents.innerHTML = `Description: ${data[j].description} Start: ${data[j].start} End:${data[j].end} <input type="Submit" class=${data[j].id} value="Edit"> <input type="Submit" class=${data[j].id} value="Delete">`
                    }else{
                        currentEvents.innerHTML = "<h4>No Events</h4>"
                    }
                }
                
            })
            .catch(function(error){
                currentEvents.innerHTML = "<h4>No Events</h4>"
            })
        })
    }

    // Loop through all events, delete based on id of event (id is attached to button as class)

    // Loop through all events, edit(PUT) based on id of event (id is attached to button as class)
    // may need another modal for edit

    // On click submit, POST event
})