import Image from "next/image"
import { useEffect, useState } from "react"
import LittleLoader from "./LittleLoader";

const PopupConfirm = ({title, text, imgPath, children, buttonText, cancelButtonText, cancelButtonFunction, buttonFunction, showed, setShowed}:
  {title: string, text?: string, imgPath?: string, children?: React.ReactNode, buttonText: string, buttonFunction: () => void, cancelButtonText?: string, cancelButtonFunction?: () => void, showed: boolean, setShowed: (value: boolean) => void}
) => {
  
  const [hide, setHide] = useState(false);
  const [firstAppear, setFirstAppear] = useState(true);
  const [loadingFunction, setLoadingFunction] = useState(false);

  useEffect(() => {
    document.body.classList.add('active-modale');
  })

  const closePopUp = async (cancel=false) => {
    if(loadingFunction) return;
    if(!cancel) {
      setLoadingFunction(true);
      const result = await buttonFunction() as any;
      setLoadingFunction(false);
      if(result == 'error') return;
    }
    setHide(false);
    setShowed(false);
    setTimeout(() => {
      setHide(true);
    }, 300);
    document.body.classList.remove('active-modale');
    setFirstAppear(false);
  }

  return (
    <div className={`absolute top-0 left-0 flex items-center justify-center w-[100vw] h-[100svh] z-50 bg-black bg-opacity-50 ${showed ? 'appear' : 'disappear'} ${(hide && !showed || firstAppear && !showed) && 'hidden'}`}>
      <div className="flex flex-col items-center justify-between h-[30rem] w-[40rem] max-w-[90vw] rounded-3xl p-8 bg-white">
        <div className="flex flex-col items-center">
          {imgPath && <Image src={imgPath} alt="" width={200} height={200} />}
          <h3 className="text-black font-bold text-2xl mt-2">{title}</h3>
          {children}
          {text && <p className="text-black mt-3 text-center" dangerouslySetInnerHTML={{ __html: text.replace(/\./g, ".<br/>") }} />}
        </div>
        <div className="flex justify-center gap-3 w-full">
          <button className="inline-block rounded-lg  px-5 py-3 text-sm font-medium text-gray-500 w-[100%] max-w-[12rem]" onClick={() => closePopUp(true)}>{cancelButtonText}</button>
          <button className={`relative justify-center flex rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-[100%] max-w-[12rem] ${loadingFunction && 'bg-opacity-70 text-opacity-70'}'}`} onClick={() => closePopUp()}>{buttonText}
            {loadingFunction && <LittleLoader/>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupConfirm
