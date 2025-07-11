import type { ReactElement } from "react"
import { DeleteIcon, ShareIcon } from "../icons/Icons"
import axios from "axios"
import { BACKEND_URL } from "../utils"
interface CardInterface {
    startIcon?: ReactElement,
    title: string,
    link: string,
    type: "twitter" | "youtube"
}
async function deleteFunc(){
   
    
    await axios.delete(`${BACKEND_URL}/api/v1/content`,{
        
    })
}
export const Card = ({ title, link, startIcon, type }: CardInterface) => {
    return (
        <div className="shadow-xl m-4 bg-white rounded-xl w-90 outline outline-slate-300 p-7 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-3">
                <div className="flex">
                    <div className="text-gray-400 text-3xl">{startIcon}</div>
                    <h1 className="text-2xl font-semibold">{title}</h1>
                </div>
                <div className="flex align-middle gap-3 text-gray-500">
                    <div><a href={link} target="_blank"><ShareIcon /></a></div>
                    <div onClick={deleteFunc} className="cursor-pointer">{<DeleteIcon />}</div>
                </div>
            </div>
            <div className="rounded-2xl">
                {type === "youtube" && <iframe className="w-[100%] rounded-xl my-1"
                    src={link.replace("watch", "embed")}

                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>}
                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>}
            </div>
        </div>
    )
}