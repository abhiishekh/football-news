
import image1 from '@/app/assets/images/seriesA/mastercard/logo1.png'
import image2 from '@/app/assets/images/seriesA/mastercard/logo2.jpeg'

const timestamp = Date.now()
const currentDate = new Date(timestamp);
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based
const day = currentDate.getDate();

const newDate = `${day}-${month}-${year}`
const data = [
    {

        image1:image1,
        image2:image2,
        title1:"Premier League",
        title2:"Bundesliga",
        score1:2,
        score2:2,
        status:"Finished",
        date:newDate,
        series:"A",
        location:"FootballStadium,Europe ",
    },
    {

        image1:image1,
        image2:image2,
        title1:"Premier League",
        title2:"Bundesliga",
        score1:2,
        score2:2,
        status:"Finished",
        date:newDate,
        series:"A",
        location:"FootballStadium,Europe ",
    },
    {

        image1:image1,
        image2:image2,
        title1:"Premier League",
        title2:"Bundesliga",
        score1:2,
        score2:2,
        status:"Finished",
        date:newDate,
        series:"A",
        location:"FootballStadium,Europe ",
    },
    {

        image1:image1,
        image2:image2,
        title1:"Premier League",
        title2:"Bundesliga",
        score1:2,
        score2:2,
        status:"Finished",
        date:newDate,
        series:"A",
        location:"FootballStadium,Europe ",
    },
]

export default data;
