import axios from 'axios'; //Makes it easy to import the files

const url = 'https://covid19.mathdro.id/api';

//Anonymous asynchronous function
export const fetchData = async (country) => {
   let changeableUrl = url;   //4

   if(country){
      changeableUrl = `${url}/countries/${country}`;
   }


   try {
    const {data} = await axios.get(changeableUrl);

    const modifiedData = {
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths,
        lastUpdate: data.lastUpdate,
    }
    // console.log(modifiedData); //Prints all the information on the map in the info window
    return modifiedData;

   }catch (error) {
       console.log(error);

   }
}

export const fetchDailyData = async () => {
   try {
    const {data} = await axios.get(`${url}/daily`); //Add the extension to the URL to get the information we need
    
    const modifiedData = data.map((dailyData) => ({
       confirmed: dailyData.confirmed.total,
       deaths: dailyData.deaths.total,
       date: dailyData.reportDate,
   }));

   return modifiedData;

   }catch (error) {
     console.log(error);  
   }
}

export const fetchCountries = async () => {
   try {
     const {data: { countries }} = await axios.get(`${url}/countries`);

     return countries.map((country) => country.name);
   } catch (error) {
      console.log(error);
   }
}
