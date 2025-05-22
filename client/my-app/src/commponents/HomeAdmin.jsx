import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { logOut  } from '../redux/tokenSlice';

export default function HomeAdmin() {
    const { token, role, user } = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const itemRenderer = (item) => (
    //     <a className="flex align-items-center p-menuitem-link">
    //         <span className={item.icon} />
    //         <span className="mx-2">{item.label}</span>
    //         {item.badge && <Badge className="ml-auto" value={item.badge} />}
    //         {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    //     </a>
    // );
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                navigate('./')
            }
        },
        {
            label: 'menu',
            icon: 'pi pi-list-check',
            command: () => {
                navigate('./menu')
            }
        },
        role==="Admin"?
        {
            label: 'ProductsInStock',
            icon: 'pi pi-list-check',
            command: () => {
                navigate('./products')
            }
        }:{},


        // {
        //     label: 'Projects',
        //     icon: 'pi pi-search',
        //     items: [
        //         {
        //             label: 'Core',
        //             icon: 'pi pi-bolt',
        //             shortcut: '⌘+S',
        //             template: itemRenderer
        //         },
        //         {
        //             label: 'Blocks',
        //             icon: 'pi pi-server',
        //             shortcut: '⌘+B',
        //             template: itemRenderer
        //         },
        //         {
        //             label: 'UI Kit',
        //             icon: 'pi pi-pencil',
        //             shortcut: '⌘+U',
        //             template: itemRenderer
        //         },
        //         {
        //             separator: true
        //         },
        //         {
        //             label: 'Templates',
        //             icon: 'pi pi-palette',
        //             items: [
        //                 {
        //                     label: 'Apollo',
        //                     icon: 'pi pi-palette',
        //                     badge: 2,
        //                     template: itemRenderer
        //                 },
        //                 {
        //                     label: 'Ultima',
        //                     icon: 'pi pi-palette',
        //                     badge: 3,
        //                     template: itemRenderer
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     label: 'Contact',
        //     icon: 'pi pi-envelope',
        //     badge: 3,
        //     // template: itemRenderer
        // }
    ];


const end = (
    <div className="flex align-items-center gap-2">
        <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
        {role?<Button rounded text severity="secondary"  aria-label="Bookmark" icon="pi pi-sign-out"
                onClick={() => {
                    dispatch(logOut());
                    navigate('/');
                }} />:<Button rounded text severity="secondary" aria-label="Bookmark" icon="pi pi-sign-in"
                onClick={() => {
                        navigate('./login')

                }} />}
            <Avatar image="logo.png" shape="circle" />
    </div>
);

return (
    <div className="card">
        <Menubar model={items} end={end} />
    </div>
)
}