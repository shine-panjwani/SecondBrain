import { useRef, useState } from 'react'
import { CrossIcon } from '../icons/Icons'
import Button from './Button'
import { InputBox } from './InputBox'
import axios from 'axios'
import { BACKEND_URL } from '../utils'
interface ContentModalInterface {
    open: boolean,
    setOpen: () => void
}
type ContentType = "youtube" | "twitter"
const ContentModal = ({ open, setOpen }: ContentModalInterface) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [type,setType] = useState<ContentType>("youtube")
    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title,
            link,
            type 
        },{
            headers :{
                Authorization : localStorage.getItem("token")
            }
        })
        alert("Content added")
        setOpen()
    }
    return (
        <>
            {open && <div className='h-screen w-screen bg-black/70 absolute  flex items-center justify-center'>
                <div className='text-black relative bg-white  px-6 py-3 rounded-xl  flex flex-col justify-center'>
                    <div className="flex justify-end">
                        <span onClick={() => {
                            setOpen()
                        }} className='cursor-pointer'><CrossIcon /></span>

                    </div>
                    <InputBox refrence={linkRef} placeHolder='Paste your URL here' />
                    <InputBox refrence={titleRef} placeHolder='Title' />
                    <div className='flex justify-center items-center'>
                        <Button onClick={()=>{
                            setType("youtube")
                        }} variant={type ==="youtube" ? "primary": "secondary"} content='youtube' size='lg' />
                        <Button onClick={()=>{
                            setType("twitter")
                        }} variant={type ==="twitter" ? "primary": "secondary"}  content='Twitter' size='lg' />
                    </div>
                    <div className='flex items-center justify-center'>
                        <Button onClick={addContent} variant='primary' content='Submit' size='md' />
                    </div>

                </div>
            </div>
            }
        </>
    )
}
export default ContentModal

