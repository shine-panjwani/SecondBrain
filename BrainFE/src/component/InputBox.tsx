interface onChangeInterface{
    // onChange :()=>void,
    refrence ?: any,
    placeHolder : string,
}
export function InputBox({refrence,placeHolder} :onChangeInterface){
    return(
        <input  type="text" 
        placeholder={placeHolder} 
        className='pl-2 pr-16 py-4 outline outline-slate-400 m-1' 
        ref={refrence}></input>
    )
}