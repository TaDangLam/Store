'use client'


const InfomationPage = () => {
    return (
        <div>
            <h1 className="px-4 pt-4 text-3xl font-bold w-full">Thông tin tài khoản</h1>
            <h2 className="px-4 text-xl font-medium italic w-full">Đơn hàng</h2>
            <div className="flex h-full p-4 gap-5">
                
                <div className=" w-2/6 h-full">
                    <div class="w-48 text-sm font-medium text-gray-900 bg-white  w-full">
                        <a href="#" class="flex items-center justify-center w-full px-4  cursor-pointer hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white h-12 text-center text-lg font-bold">
                            Account Detail
                        </a>
                        <a href="#" aria-current="true" class="flex items-center justify-center w-full px-4 text-white cursor-pointer bg-gradient-to-r from-pink-500 to-yellow-500 dark:border-gray-600 h-12 text-center text-lg font-bold">
                            Order
                        </a>
                        <a href="#" class="flex items-center justify-center w-full px-4  cursor-pointer hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white h-12 text-center text-lg font-bold">
                            Address
                        </a>
                        <a href="#" class="flex items-center justify-center w-full px-4  cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-blue-500 hover:to-cyan-500 focus:outline-none focus:text-blue-700 dark:border-gray-600 dark:hover:from-blue-500 dark:hover:to-cyan-500 dark:hover:text-transparent  dark:focus:text-transparent h-12 text-center text-lg font-bold">
                            Log out
                        </a>  
                    </div>
                
                
                

                </div>
                <div className="border border-solid w-4/6 h-full border-gray-950 bg-white px-1">

                </div>
            </div>
        </div>
    )
}

export default InfomationPage;
