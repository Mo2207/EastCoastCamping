import React from 'react';
import Card from 'react-bootstrap/Card'; //react-bootstrap
import CardGroup from 'react-bootstrap/CardGroup'; //react-bootstrap
import Container from 'react-bootstrap/Container';
import '../styles/Home.css'
import 'react-datepicker/dist/react-datepicker.css' //date-picker css
import Button from 'react-bootstrap/Button';
import GifComponent from '../components/Homepage/Gifcomponent';
import Iconscomponent from '../components/Homepage/Iconscomponent';
import AllCamps from '../components/Homepage/Allcamps';
import CampsByLocation from '../components/Homepage/CampsByLocation';
import Footer from '../components/Footer';





export default function Home() {


    // const [destination, setDestination] = useState('');
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null)

    // const navigate = useNavigate();
    // const toSearchResult = () => {
    //     if (destination || startDate || endDate) {
    //         const start = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`
    //         const end = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`
    //         navigate('/search', { state: { search: destination, date1: start, date2: end } });
    //     } else {
    //         navigate('/search');
    //     }
    // }

    // const { loading, error, data } = useQuery(QUERY_CAMPGROUNDBYLOCATION, {
    //     variables: { location: destination },
    // })

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error.message}</p>


    return (
        <>
            <div className='bg-white'>
                <Card className='searchBar-Bg'>
                    <Container className='text-white'>
                        <h2 className='mb-4'>Welcome to EastCoastCamping</h2>
                        <p>Looking for a memorable camping experience? Look no further than EastCoastCamping, where we connect you with the best campsites and outdoor destinations. </p>
                    </Container>


                </Card>

                <Container className='mt-5 text-center'>
                    <h2>Your One-Stop Destination for Booking Your Perfect Camping Adventure!</h2>
                    <p>  Whether you're a seasoned outdoor enthusiast or a first-time camper, our website makes it easy to plan and book your perfect camping trip. </p>
                    <p> Our user-friendly platform makes it easy to find and reserve the perfect campsite for your next outdoor adventure.</p>
                    <p>With EastCoastCamping, you can browse through a selection of coamgrounds, read review, and book your preferred campsite with just a few clicks,making planning your next camp</p>
                </Container>

                <Iconscomponent />

                <CampsByLocation />
                <hr />

                <Container >
                    <GifComponent />
                </Container>

                <Footer />
            </div>
        </>






    );
}
