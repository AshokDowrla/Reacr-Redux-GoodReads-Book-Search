import React from "react"
import classes from "./AllResults.css"

const AllResults =(props)=>{
  
   
   
return(
<div >
<ul className={classes.ul} >
{props.results.map((x) =>

    <div key={x.id} >

<li  className={classes.li}>

<img src={x.image_url}
alt={x.small_image_url} className="img-circle"  height="170px"
width="120px"  /> 

<div className={classes.title}>{x.title}</div>
{x.author}
</li>

<hr />

</div>


)

}
</ul>
</div>

)

}


export default AllResults