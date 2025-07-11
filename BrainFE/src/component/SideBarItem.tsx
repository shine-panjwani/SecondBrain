import { type ReactElement } from 'react'
interface SideBarItemInterface{
    title : string,
    icon : ReactElement,
    onClick ?: ()=>void;
}
const SideBarItem = ({title, icon,onClick} : SideBarItemInterface) => {
  return (
    <div onClick={onClick} className='w-100  flex items-center cursor-pointer gap-3 p-2 hover:bg-slate-100'>
        <div className='text-gray-500 text-3xl'>{icon}</div>
        <div className='text-gray-500 text-2xl font-medium'>{title}</div>
    </div>
  )
}

export default SideBarItem