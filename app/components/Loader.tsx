import Image from "next/image"

const Loader = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-50'>
      <Image src={'/assets/logo.png'} alt="Logo" width={250} height={250}/>
      <div className="loader"></div>
    </div>
  )
}

export default Loader
