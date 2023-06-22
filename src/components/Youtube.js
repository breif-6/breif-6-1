import React, { useEffect, useState } from 'react'
// import axios from 'axios';
const API ='AIzaSyCSvv-KiRO2XiJGYpAKL5BtksBGvuxS0jg'
const channelId="@OrangeMobjordan"

var fetchurl =`https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`
export const YTvideos=()=>{
const [allvideos,setAllvideos]=useState([])
    useEffect(()=>{
        fetch(fetchurl).then((Response)=>Response.json()).then((resJson)=>{
            const result = resJson.items.map(doc=>({
                ...doc,
                Videolink: "https://www.youtube.com/embed/"+doc.id.videoId
            }));
            setAllvideos(result)
        })
    },[])

    return (
        <div> 
            {allvideos.map((item)=>{
                return(
                    <div>
                        <iframe width="560" height="315" src={item.Videolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        <p>{item.snippet.title}</p>
                         </div>
                )
            })}
          </div>
    )
}