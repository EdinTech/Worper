import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import AppLayout from "../../ui/AppLayout";
import MainPage from "../main";
import { useEffect } from "react";

const ErrorPage = () => {

    const error = useRouteError();
    useEffect(()=> {
        if (isRouteErrorResponse(error)) {
            console.log(error.data);
        } else {
            console.log(error);
        }
        return () => {
            console.log("unmounted");
        }
    }, [])

    return (
        <>
            <AppLayout>
                <MainPage></MainPage>
            </AppLayout>
        </>
    );
}

export default ErrorPage;