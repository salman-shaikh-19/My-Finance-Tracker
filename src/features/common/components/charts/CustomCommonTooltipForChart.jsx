import { useSelector } from "react-redux"

function CustomCommonTooltipForChart({ active, payload, label }) {
  
    if (!(active && payload && payload.length)) return null;
    return (

        <div className={`card shadow-2xl bg-base-100  rounded-lg p-3`}>
            <div className="text-center ">
                <p className="font-bold border-b border-gray-200" >{label}</p>
            </div>
            <div>
                {payload.map((item, i) => {
                    const color = item.color || item.fill ||  item.payload.stroke || item.payload?.fill  ;
                    // console.log("color:"+color);
                    
                    return (
                        <p className=" " key={i}>
                            <span className="me-1" style={{display:'inline-block',height:"12px",width:"12px", borderRadius: "50%", backgroundColor:color }}></span>
                            <span >{item.name} </span>: {item.value}
                        </p>
                    )
                })}
            </div>
        </div>
        
    )

}
export default CustomCommonTooltipForChart