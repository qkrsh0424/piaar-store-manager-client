import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import moment from 'moment';

// Component
import HomeBody from './HomeBody';
import CalendarMain from '../calendar/CalendarMain';

const HomeMain = () => {
    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <HomeBody></HomeBody>
            {/* <CalendarMain></CalendarMain> */}
        </>
    );
}

export default HomeMain;