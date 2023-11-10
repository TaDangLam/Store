'use client'
import React, { useEffect } from 'react';
import '../globals.css'


const Introduce = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => { 
            entries.forEach((entry) => {
                console.log(entry);
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });

        const observer2 = new IntersectionObserver((entries) => { 
            entries.forEach((entry) => {
                console.log(entry);
                if (entry.isIntersecting) {
                    entry.target.classList.add('textAnimatedShow');
                } 
                else {
                    entry.target.classList.remove('textAnimatedShow');
                }
            });
        });
        
        const hiddenElements = document.querySelectorAll('.animateHidden , .animateHidden2, .animateHidden3');
        const hiddenElements2 = document.querySelectorAll('.textAnimatedHidden');

        hiddenElements.forEach((el) => observer.observe(el));
        hiddenElements2.forEach((el) => observer2.observe(el));
    }, []);
    return (
        <h1 className="bg-slate-100 py-5 ">
            <div className="bg-slate-100 border-1 border-rose-600 animateHidden ">
                <h1 className="text-4xl font-bold text-center">CỬA HÀNG THIẾT BỊ VÀ LINH KIỆN ĐIỆN TỬ </h1>
                <h1 className="text-4xl font-bold text-center">LK STORE</h1>
            </div>
            <div className="grid grid-rows-1 my-10 my-24">
                <div className="grid grid-cols-2 flex items-center animateHidden">
                    <p className="font-medium text-justify pl-10">
                    Là công ty hoạt động trong lĩnh vực bán lẻ và sửa chữa các sản phẩm công nghệ và lĩnh vực truyền thông giải trí bao gồm 3 công ty thành viên CellphoneS 
                    - Điện thoại vui - Smedia và chuỗi trung tâm bảo hành Apple AASP với quy mô hơn 2.000 nhân viên
                    </p>
                    <div className="flex items-center justify-center">
                        <img src="/logo.jpg" 
                            className="w-96 text-center rounded-md"/>
                    </div>
                </div>
            </div>
            <div className="grid grid-rows-1 grid-cols-3 my-10 mx-10 gap-4 ">
                <div className="bg-white rounded-pd h-100 w-full border border-4 rounded-md border-zinc-950 text-ellipsis overflow-hidden animateHidden">
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/wysiwyg/cover-p0wrfk6z9h9gj2mzmxldovhtcsa62y19miw3i1k2mq_1.png"
                        className="rounded-md h-48 w-full"/>
                    <h1 className="text-2xl font-bold text-center mt-2" >
                        Schannel Network
                    </h1>
                    <p className="font-medium text-justify px-5">
                        Được xem là 1 trong những Network về YouTube hàng đầu Việt Nam điều hành hơn 18 kênh YouTube chất lượng.
                    </p>
                </div>
                <div className="bg-white rounded-pd h-100 w-full border border-4 rounded-md border-zinc-950 text-ellipsis overflow-hidden animateHidden2">
                    <img src="https://www.homepaylater.vn/static/7558f9c71d6356dedc95925471b4e62e/8b458/cell_phone_s_logo_f626c95055.jpg"
                        className="rounded-md h-48 w-full"/>
                    <h1 className="text-2xl font-bold text-center mt-2" >
                        CellphoneS
                    </h1>
                    <p className="font-medium text-justify px-5 ">
                    Sau hơn 10 năm vận hành và phát triển không ngừng, hệ thống bán lẻ CellphoneS liên tục mở rộng với chuỗi hơn 100 cửa hàng trên toàn quốc và tự hào là 1 trong 5 hệ thống lớn nhất tại Việt Nam trong lĩnh vực công nghệ.
                    </p>
                </div>
                <div className="bg-white rounded-pd h-100 w-full border border-4 rounded-md border-zinc-950 text-ellipsis overflow-hidden animateHidden3">
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/wysiwyg/download_6__1.png"
                        className="rounded-md h-48 w-full"/>
                    <h1 className="text-2xl font-bold text-center mt-2" >
                        Trung tâm bảo hành Apple AASP
                    </h1>
                    <p className="font-medium text-justify px-5 ">
                    Điện Thoại Vui là trung tâm bảo hành uỷ quyền của Apple và là trung tâm bảo hành (APPLE Authorised Service Provider AASP) đầu tiên tại Hà Nội.
                    </p>
                </div>
                
            </div>
            <div className="mx-8 ">
                <h2 className="text-xl font-bold textAnimatedHidden">Tầm nhìn</h2>
                <ul className="list-disc mx-4 text-lg ">
                    <li className="font-medium textAnimatedHidden" >
                        Xây dựng một doanh nghiệp vững mạnh về tài chính và vững chãi về đời sống tinh thần.
                    </li>
                    <li className="font-medium textAnimatedHidden" >
                        Doanh nghiệp hạnh phúc và phụng sự, góp phần xây dựng xã hội phồn vinh.
                    </li>
                    <li className="font-medium textAnimatedHidden" >
                        Phủ sóng tất cả các tỉnh/ thành phố lớn tại Việt Nam cung cấp các sản phẩm giá tốt, mang lại sự an tâm, tin tưởng và các trải nghiệm hài lòng cho khách hàng.                    
                    </li>
                </ul>
            </div>
            <br/>
            <div className="mx-8 ">
                <h2 className="text-xl font-bold textAnimatedHidden">Cam kết của công ty</h2>
                <ul className="list-disc mx-4 text-lg">
                    <li className="font-medium textAnimatedHidden" >
                        Đem đến cho khách hàng các sản phẩm giá tốt, mang lại sự an tâm, tin tưởng.
                    </li>
                    <li className="font-medium textAnimatedHidden" >
                        Đem đến cho nhân viên một môi trường làm việc thân thiện, có nhiều cơ hội phát triển.
                    </li>
                    <li className="font-medium textAnimatedHidden" >
                        Đem đến cho quản lý một sân chơi công bằng để thể hiện, đảm bảo cuộc sống sung túc.
                    </li>
                    <li className="font-medium textAnimatedHidden" >
                        Đem đến cho mọi đối tác sự hợp tác chặt chẽ, tôn trọng lẫn nhau & đôi bên cùng phát triển.
                    </li>
                </ul>
            </div>
            <br/>
            <div className="mx-8 ">
                <h2 className="text-xl font-bold textAnimatedHidden">Mục tiêu hướng tới</h2>
                <ul className="list-disc mx-4 text-lg">
                    <li className="font-medium textAnimatedHidden" >
                        Phát triển cá nhân: Tạo ra môi trường bình đẳng cho các thành viên phát huy năng lực cá nhân & có một đời sống đầy đủ, sung túc cả về vật chất lẫn đời sống tinh thần.
                    </li>
                    <li className="font-medium textAnimatedHidden" >
                        Môi trường làm việc: Xây dựng môi trường làm việc đoàn kết, thương yêu nhau trên giá trị cốt lõi của tình huynh đệ.
                    </li>
                    <li className="font-medium textAnimatedHidden" >
                    Đóng góp xã hội: Tạo ra hàng ngàn việc làm, đóng thuế đầy đủ. Tích cực tham gia các hoạt động thiện nguyện, cứu trợ các hoàn cảnh khó khăn trong xã hội..
                    </li>
                </ul>
            </div>
        </h1>
        
       
    )
}

export default Introduce;