'use client'

import NavBar from "@/components/navbar";
import axios from "axios";
import { useEffect, useState } from "react"

export default function Home() {

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
        <h1>aaaaaaaaa</h1>
      </div>
        
    </div>
  )
}
