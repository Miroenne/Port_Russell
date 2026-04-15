import {Outlet} from 'react-router-dom';

/**
 * AuthLayout Component
 * This acts as a Layout wrapper for authentication-related routes (e.g., Login).
 * It provides a consistent structure for all nested routes defined under it.
 */
function AuthLayout() {
    return (
        <div>
            {/* The <Outlet /> is a placeholder that renders the child route's component.
                i.e., if the path is '/login', the Login component will appear here.
            */}
            <Outlet />
        </div>
    )
}

export default AuthLayout;