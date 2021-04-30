import { useState } from 'react';
import DrawerNavbarComponent from './DrawerNavbarComponent';
import DrawerNavbarSiderComponent from './DrawerNavbarSiderComponent';

const DrawerNavbarMain = () =>{
    const [drawerOpen, setDrawerOpen] = useState(false);

    const __handleEventControl =  ()=>{
        return{
            drawer: function(){
                return {
                    open: function(){
                        setDrawerOpen(true);
                    },
                    close: function(){
                        setDrawerOpen(false);
                    }
                }
            }
        }
    }
    return (
        <>
            <DrawerNavbarComponent
                __handleEventControl = {__handleEventControl}
            ></DrawerNavbarComponent>
            <DrawerNavbarSiderComponent
                open={drawerOpen}

                __handleEventControl = {__handleEventControl}
            ></DrawerNavbarSiderComponent>
        </>
    );
}

export default DrawerNavbarMain;