import MainService from "./service";
import AppPageTitle from "../../ui/AppPageTitle";

const MainPage: React.FC = () => {
    return (
        <>
            <AppPageTitle>Dashboard</AppPageTitle>

            {/* main service component */}
            <MainService />
        </>
    );
};

export default MainPage;