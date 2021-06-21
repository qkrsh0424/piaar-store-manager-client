import DrawerNavbarMain from '../nav/DrawerNavbarMain';
import moment from 'moment';

// Component
import HomeBody from './HomeBody';
import CalendarMain from '../calendar/CalendarMain';

const HomeMain = () => {
    const ClipboardDataHandler = () => {
        navigator.clipboard.readText().then(r => {
            let data = r.match(/(입금|출금)+[ 0-9,]+원/g)[0];
            console.log(data.match(/[ㅁ-ㅋ]+/g)[0]);

        })
    }
    return (
        <>
            <button type='button' onClick={(e) => ClipboardDataHandler()}>클립보드 겟</button>
            <DrawerNavbarMain></DrawerNavbarMain>
            <HomeBody></HomeBody>
            {/* <CalendarMain></CalendarMain> */}
        </>
    );
}

export default HomeMain;