export function getCalendarDays(year, month){



const LastDay = new Date(year, month + 1, 0)
const daysInMonth = LastDay.getDate()
const firstDay = new Date(year, month, 1)
const startDayofMonth = firstDay.getDay()


const calendarDays = []

for(let i = startDayofMonth - 1; i >= 0; i-- )
    {
    calendarDays.push(null) 
    }


for(let i = 1; i <= daysInMonth; i++  )
    {
    calendarDays.push(i) 
    }

      return calendarDays;
}


