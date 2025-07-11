import SideBarItem from "./SideBarItem"
import { YoutubeIcon, TwitterIcon } from "../icons/Icons"
import useContent from "../hooks/useContent"


export function SideBar() {
    const {contents} = useContent();
    return (
        <div className='w-[25%] border-r-slate-400 outline outline-gray-200 h-screen  flex flex-col gap-5 '>
            <div className='text-4xl m-6 flex items-center gap-5 font-semibold'>
                <img className="w-15" src="https://www.vhv.rs/dpng/d/614-6141651_transparent-background-education-logo-hd-png-download.png" alt="" />
                <h2>Second Brain</h2>
            </div>
            <div className='flex flex-col gap-5 m-6'>

                <SideBarItem onClick={()=>{
                   contents.filter(x=> x.type ==="youtube")
                }} title='youtube' icon={<YoutubeIcon />} />
                <SideBarItem onClick={()=>{
                   contents.filter(x => x.type ==="twitter")
                }} title='Twitter' icon={<TwitterIcon />} />
                
            </div>

        </div>
    )
}