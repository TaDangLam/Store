'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Link from 'next/link'
import NavBar from "@/components/navbar";

const ApiProduct = process.env.NEXT_PUBLIC_API_PRODUCT_BY_CATEGORY;
const ApiStaticFile = process.env.NEXT_PUBLIC_API_STATIC_FILE;
const ApiCategory = process.env.NEXT_PUBLIC_API_CATEGORY;

export default function Home() {
  const categoryId = ['653e45e706e76d10b763e191','653e460f06e76d10b763e193','653e467106e76d10b763e196','653e468906e76d10b763e198', '653e46c206e76d10b763e19a','653e46d606e76d10b763e19d','653e46db06e76d10b763e19f','653e46ff06e76d10b763e1a1','653e472406e76d10b763e1a3']
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [nameCategory, setNameCategory] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  useEffect(() => {
    const userJSON = sessionStorage.getItem('user');

    const axiosRequests = categoryId.map((categoryId) =>
      axios.get(ApiProduct + `/home/${categoryId}`)
        .then(result => result.data)
        .catch(err => {
          console.log(err);
          return []; 
        })
    );

    const axiosRequests2 = categoryId.map((categoryId) =>
      axios.get(ApiCategory+`/${categoryId}`)
        .then(response => response.data)
        .catch(err => {
        console.log(err);
        return [];
      }),
  );

    Promise.all(axiosRequests)
      .then((results) => {
        console.log(results);
        // Combine data from all categories into a single array
        const categoryProducts = results.reduce((accumulator, categoryData) => {
          return accumulator.concat(categoryData);
        }, []);

        setProductByCategory(categoryProducts);
        
      })
      .catch((err) => console.log(err));

      Promise.all(axiosRequests2)
      .then((results) => {
        console.log(results);
        // Combine data from all categories into a single array
        const categoryDetail = results.reduce((accumulator, categoryDetail) => {
          return accumulator.concat(categoryDetail);
        }, []);
        setNameCategory(categoryDetail);
      })
      .catch((err) => console.log(err));
    // const axiosRequests = categoryId.map((categoryId) =>
    //   axios.get(ApiProduct + `/home/${categoryId}`)
    //       .then(result => setProductByCategory(result.data))
    //       .catch(err => console.log(err))
    // );
    // Promise.all(axiosRequests)
    //   .then((results) => {
    //     // Extract data from each result and update the state
    //     const categoryProducts = results.map((result) => result.data);
    //     setProductByCategory(categoryProducts);
    //   })
    //   .catch((err) => console.log(err));
    if(userJSON){
        setUser(JSON.parse(userJSON));
    }
  }, []);
  

  return (
    <div className="">
      <div className="content1 grid grid-cols-4 grid-rows-3 gap-2 py-2">
        <div className="bg-white row-start-1 row-end-3 rounded-lg cursor-pointer"><NavBar /></div>
        <div className=" row-start-1 row-end-3 col-start-2 col-end-4 cursor-pointer">
          <img src="/637730464244580551_cac-dong-mainboard-asus-1.png" className="object-cover  h-full w-full rounded-lg"/>
        </div>
        <div className="row-start-1 row-end-2 cursor-pointer">
          <img src="/amd-ryzen-5000-processor.webp" alt="image" className="rounded-lg h-full object-cover"/>
        </div>
        <div className=" row-start-2 row-end-3 cursor-pointer">
          <img src="/intel-14th-gen-raptor-lake-refresh-cpu-lineup_345d37e7909d47338333553ef1adeae7_master.jpg" className="w-full h-full object-cover rounded-lg"/>
        </div>
        <div className="col-start-1 col-end-3">
          <img src="/Content-Page-Banner-2.jpg" className="img-banner"/>
        </div>
        <div className="col-start-3 col-end-5">
          <img src="/msi-twin_frozr_6-beef_up_your_rig-banner.jpg" className="img-banner"/>
        </div>
        
      </div>

      <div className="content2">
      <div className="">
          {categoryId.map((category, index) => (
            <div key={category} className="py-1"> 
              <div className=" text-white uppercase text-center text-4xl my-3">
                {nameCategory.filter(categories => categories._id === category)
                  .map(categories => (
                    <Link href={`/category/${categories._id}`} className='cursor-pointer'>
                      <div className='flex items-center justify-center font-mono  text-5xl bg-gradient-to-r from-signup-left to-signup-right h-16 rounded-md'> 
                          <h1 className ="hover:animate-bounce"> {categories.name}</h1>
                      </div>
                    </Link> 
                  ))}
              </div>
              <div className='grid grid-cols-4 grid-rows-1 gap-5 '>
                {productByCategory.filter(product => product.categories === category)
                  .map(product => (
                    <Link key={product._id} href={`/productdetail/${product._id}`} className=' '>
                      <div className='bg-white rounded-pd h-100 w-full overflow-hidden m'>
                        <img src={ApiStaticFile + `/${product.name}/${product.images[0]}`} alt="logo" className='w-full h-4/6 object-cover'/>
                            <div className='h-1/6 text-sm text-center mt-0'>{product.name}</div>
                            <div className=' h-1/6 mb-0 flex items-center justify-center'>
                            <span className='text-sm  text-category'>{product.price} &ensp;</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div> 
      </div>
    </div>
  )
}
