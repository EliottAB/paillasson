import Image from "next/image"
import { useEffect, useState } from "react"

const PopupConfirm = ({title, text, imgPath, buttonText, buttonFunction, showed, setShowed}: {title: string, text: string, imgPath: string,buttonText: string, buttonFunction: () => void, showed: boolean, setShowed: (value: boolean) => void}) => {
  
  const [hide, setHide] = useState(false);

  useEffect(() => {
    document.body.classList.add('active-modale');
  }, [])

  const closePopUp = () => {
    setHide(false);
    setShowed(false);
    setTimeout(() => {
      setHide(true);
    }, 300);
    document.body.classList.remove('active-modale');
  }

  return (
    <div className={`absolute top-0 left-0 flex items-center justify-center w-[100vw] h-[100svh] z-50 bg-black bg-opacity-50 ${showed ? 'appear' : 'disappear'} ${(hide && !showed) && 'hidden'}`}>
      <div className="flex flex-col items-center justify-between h-[30rem] w-[40rem] max-w-[90vw] rounded-3xl p-8 bg-white">
        <div className="flex flex-col items-center">
          <Image src={imgPath} alt="sending mail gif" width={200} height={200} />
          <h3 className="text-black font-bold text-2xl mt-2">{title}</h3>
          <p className="text-black mt-3 text-center" dangerouslySetInnerHTML={{ __html: text.replace(/\./g, ".<br/>") }} />
        </div>
        <button className=" inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-[100%] max-w-[12rem]" onClick={closePopUp}>{buttonText}</button>

      </div>
    </div>
  )
}

export default PopupConfirm
