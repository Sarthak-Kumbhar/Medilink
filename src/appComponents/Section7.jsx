
const Section7 = () => {
  return (
    <div className='w-full min-h-screen relative'>
      <div className='w-full h-50 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white'>
        <h1 className="text-4xl md:text-6xl font-semibold">Agent elevate your understanding</h1>
        <h2 className="mt-8 text-2xl md:text-4xl font-normal">Custom models and more.</h2>
      </div>
      <div className="absolute top-10 w-full h-50 bg-[linear-gradient(0deg,rgba(0,0,0,0)_20%,rgba(136,140,112,0.30)_73%)]"></div>
      <div className="absolute bottom-0 w-full h-full border-2 z-[-1] mt-20 ">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="https://res.cloudinary.com/djo8ngr4y/video/upload/v1761544517/human_tkfzwx.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>
      </div>
    </div>
  )
}

export default Section7