import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {

    const error = useRouteError();
    const navigate = useNavigate();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            navigate('/');
        }

        if (error.status === 401) {
            return <div>You aren't authorized to see this</div>;
        }

        if (error.status === 503) {
            return <div>Looks like our API is down</div>;
        }

        if (error.status === 418) {
            return <div>🫖</div>;
        }
    }

    return (
        <>
            <h1>Error</h1>
            <p>Page not found</p>
            <p>
                <i>404</i>
            </p>
            <p>
                <i>Error</i>
            </p>
        </>
    );
}

export default ErrorPage;