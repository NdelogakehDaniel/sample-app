import React, { useEffect ,useState} from 'react'

export default function Tests() {
    const [count,setCount] = useState(()=>0)
useEffect(()=>{
    console.log("hello world")
    console.log(count)
})
  return (
    <div>
        <button onClick={()=> setCount((count)=> count+1)}>click</button>
    </div>
  )
}
