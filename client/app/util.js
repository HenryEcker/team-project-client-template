export function hideElement(shouldHide) {
  if (shouldHide) {
    return 'hidden';
  } else {
    return '';
  }
}

export function parseTime(start,end){
  var startDate = new Date(start);
  var endDate = new Date(end);
  return (startDate.getMonth()+1)+"/"+(startDate.getDate())+"/"+startDate.getFullYear() +" " +
  startDate.getHours()+":"+startDate.getMinutes() + " - " +(endDate.getMonth()+1)+"/"+(endDate.getDate())+"/"+endDate.getFullYear() +" " + endDate.getHours()+":"+endDate.getMinutes();
}

export function unixTimeToString(time) {
    return new Date(time).toLocaleString().substring(0,17);
}

export function unixTimeToStringTimeOnly(time) {
    return new Date(time).toLocaleString().substring(12,17);
}



export function getDayOfWeek(num){
  switch(num){
    case 0: {
      return "Sunday";
    }
    case 1:{
      return "Monday";
    }
    case 2:{
      return "Tuesday";
    }
    case 3:{
      return "Wednesday";
    }
    case 4:{
      return "Thursday";
    }
    case 5:{
      return "Friday";
    }
    case 6:{
      return "Saturday";
    }
    default: return "Not A Day";
  }
}
export function getMonthOfYear(num){
  switch(num){
    case 0: {
      return "January";
    }
    case 1:{
      return "February";
    }
    case 2:{
      return "March";
    }
    case 3:{
      return "April";
    }
    case 4:{
      return "May";
    }
    case 5:{
      return "June";
    }
    case 6:{
      return "July";
    }
    case 7:{
      return "August";
    }
    case 8:{
      return "September";
    }
    case 9:{
      return "October";
    }
    case 10:{
      return "November";
    }
    case 11:{
      return "December";
    }
    default: return "Not A Month";
  }
}
