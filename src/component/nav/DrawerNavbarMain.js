import { useState } from 'react';
import { userDataConnect } from '../../data_connect/userDataConnect';
import DrawerNavbarComponent from './DrawerNavbarComponent';
import DrawerNavbarSiderComponent from './DrawerNavbarSiderComponent';

const DrawerNavbarMain = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const __handleDataConnect = () => {
        return {
            postLogout: async function () {
                await userDataConnect().postLogout()
                    .then(res=>{
                        if(res.status == 200){
                            window.location.reload();
                        }
                    })
                    .catch(err=>{
                        console.log('undefined error.');
                    })
            }
        }
    }
    const __handleEventControl = () => {
        return {
            drawer: function () {
                return {
                    open: function () {
                        setDrawerOpen(true);
                    },
                    close: function () {
                        setDrawerOpen(false);
                    }
                }
            },
            logoutSubmit: async function (e) {
                e.preventDefault();
                await __handleDataConnect().postLogout();
            }
        }
    }
    return (
        <>
            <DrawerNavbarComponent
                __handleEventControl={__handleEventControl}
            ></DrawerNavbarComponent>
            <DrawerNavbarSiderComponent
                open={drawerOpen}

                __handleEventControl={__handleEventControl}
            ></DrawerNavbarSiderComponent>
        </>
    );
}

export default DrawerNavbarMain;