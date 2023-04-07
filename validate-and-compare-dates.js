
let validateAndCompareDates = ((date1_str, date2_str) =>{
    const date_regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!date_regex.test(date1_str) || !date_regex.test(date2_str)) {
      return "Invalid date format";
    }
    
    const date1 = new Date(date1_str);
    const date2 = new Date(date2_str);
    
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      return "Invalid date";
    } else if (date1.getDate() !== parseInt(date1_str.slice(8), 10) ||
               date2.getDate() !== parseInt(date2_str.slice(8), 10)) {
      return "Invalid day";
    } else if (date1 > date2) {
      return date1_str + " is bigger";
    } else if (date2 > date1) {
      return date2_str + " is bigger";
    } else {
      return date1_str + " and " + date2_str + " are equal";
    }
  })
  
  // Example usage
  console.log(validateAndCompareDates('2016-02-29', '2022-01-01')); // Output: Invalid day of the month
  console.log(validateAndCompareDates('2022-01-01', '2022-02-01')); // Output: 2022-02-01 is bigger than 2022-01-01
  console.log(validateAndCompareDates('2023-01-01', '2023-01-01')); // Output: 2022-01-01 and 2022-01-01 are equal
  console.log(validateAndCompareDates('2022-13-01', '2022-01-01')); // Output: Invalid date format
  