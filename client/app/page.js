'use client'

import axios from "axios";
import { useEffect, useState } from "react"

export default function Home() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/category').then(result => setCategory(result.data));
  },[])

  return (
    <div className="grid">
      <div className="bg-white">
        <ul>
          <li>aa</li>
        </ul>
      </div>
      <div className="bg-green-200">bb</div>
    </div>
  )
}
