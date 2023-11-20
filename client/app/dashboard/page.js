import Link from "next/link";

const Dashboard = () => {
    return ( 
        <div className="flex gap-2 bg-rose-200 items-center  w-full h-1/2 p-2">
            <Link href={'/'} className="w-1/4 bg-lime-200 text-center">
                <div>
                    ABC
                </div>
            </Link>
            <Link href={'/'} className="w-1/4 bg-lime-200 text-center">
                <div>
                    ABC
                </div>
            </Link>
            <Link href={'/'} className="w-1/4 bg-lime-200 text-center">
                <div>
                    ABC
                </div>
            </Link>
            <Link href={'/'} className="w-1/4 bg-lime-200 text-center">
                <div>
                    ABC
                </div>
            </Link>
        </div>
     );
}
 
export default Dashboard;