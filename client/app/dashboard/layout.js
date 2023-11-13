import Navbar from "./components/navbar";

const DashboardLayout = ({ children }) => {
    return ( 
        <div className="bg-blue-900 min-h-screen flex w-min-full">
            <div className="w-1/6"><Navbar /></div>
            <div className="bg-white w-5/6 rounded-lg mr-2 my-1.5 p-4">{children}</div>
        </div>
    );
}
 
export default DashboardLayout;