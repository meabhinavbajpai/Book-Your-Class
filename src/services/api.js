export const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  export const generateRandomAvailability = () => {
    return Math.random() < 0.5; 
  };
  
  export const generateRandomClasses = (numClasses) => {
    const classes = [];
  
    for (let i = 0; i < numClasses; i++) {
      const seatsAvailable = generateRandomAvailability() ? generateRandomNumber(1, 15) : 0;
      classes.push({
        id: i + 1,
        date: generateFutureDate(),
        seatsAvailable: seatsAvailable,
      });
    }
  
    return classes;
  };
  
  export const generateFutureDate = () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.setDate(currentDate.getDate() + generateRandomNumber(1, 30)));
    return futureDate.toDateString();
  };