import { useState } from 'react'
import Button from '../component/Button'
import { Card } from '../component/Card'
import ContentModal from '../component/ContentModal'
import { SideBar } from '../component/SideBar'
import { PlusIcon, ShareIcon } from '../icons/Icons'
import useContent from '../hooks/useContent'

function DashBoard() {
  const [modalOpen,setModalOpen] = useState(false);
  const {contents} = useContent();
  console.log(contents);
  
  return (
    <>
    <ContentModal open={modalOpen} setOpen={()=>{
      setModalOpen(false)
    }} />
      <div className='flex'>
        <SideBar />
        <div className='w-[70%] mx-4'>
          <nav className='flex justify-between items-center'>
            <h1 className='text-4xl font-semibold'>All important links</h1>
            <div className='flex '>
              <Button onClick={()=>{
                setModalOpen(p=>!p)
              }} icon={<PlusIcon />} variant='primary' size='lg' content='Add Content' />
              <Button icon={<ShareIcon />} variant='secondary' size='lg' content='Share Brain' />
            </div>
          </nav>
          <div className='flex flex-wrap'>
            {/* {JSON.stringify(contents)} */}
            {contents.map(({type,link, title})=>{
              return(<Card   type={type} link={link} title={title}/>)
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default DashBoard
