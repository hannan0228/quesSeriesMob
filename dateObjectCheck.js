let isValidDate = (value) => value instanceof Date && !isNaN(value);

console.log(isValidDate(new Date(86400000)))