import {Outlet} from 'react-router-dom';
import Nav from '../components/Nav';

/**
 * MainLayout Component
 * This component serves as the primary structural template for the application's authenticated area.
 * It ensures that the Navigation bar is consistently displayed across all internal pages.
 */
function MainLayout() {
    
   
    return (
        /**
         * React Fragment (<>...</>)
         * Used to wrap multiple elements (Nav and the main content div) 
         * without adding an extra unnecessary node to the DOM.
         */
        <>
            {/* Global Navigation Bar: Persists at the top of the layout */}
            <Nav />

            {/* Content Container */}
            <div>
                {/**
                 * The <Outlet /> component is a placeholder from react-router-dom.
                 * It dynamically renders the child route's component (e.g., Home, Catways, Reservations)
                 * based on the current URL path.
                 */}
                <Outlet />
            </div>
        </>
        
    )
}

export default MainLayout;