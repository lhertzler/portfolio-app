'use client';

type LogoProps = {
  isVisible: boolean;
};

export default function Logo({ isVisible }: LogoProps) {

  return (  
    <div className="relative w-full h-full aspect-square overflow-hidden">
      {/* L */}
        {/* Long rect on the far left */}
        <div className={`absolute left-0 w-[16%] bg-primary h-full z-10 transition-all duration-400 ease-in-out ${
          isVisible ? 'top-[0%] delay-100 ' : '-top-[100%] delay-150'
        }`}/>
        {/* bottom rect far left */}
        <div className={`absolute  bottom-0 w-[61%] h-[16%] bg-primary z-1 transition-all duration-700 ease-in-out ${
          isVisible ? 'left-0 delay-300' : '-left-[61%] delay-150'
        }`}/>

      {/* H */}
        {/* Left vertical rect */}
        <div className={`absolute left-[39%] w-[16%] h-[66.666%] bg-primary z-10 transition-all ease-in-out ${
          isVisible ? 'top-[0%] duration-700' : '-top-[66.666%] delay-300 duration-500'
        }`}/>
        {/* Horizontal rect */}
        <div className={`absolute top-[38%] right-0 h-[16%] bg-primary z-1 transition-all ease-in-out ${
          isVisible ? 'w-[60%] delay-200 duration-800' : 'w-[0%] delay-250 duration-500'
        }`}/>
        {/* Far right vertical rect */}
        <div className={`absolute right-0 bottom-0 w-[16%] h-full bg-primary z-10 transition-all duration-700 ease-in-out ${
          isVisible ? 'top-[0%] delay-250' : 'top-[100%] delay-250'
        }`}/>
    </div>
  );
}