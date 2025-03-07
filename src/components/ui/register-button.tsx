import { ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";

const RegButton = () => {
    const router = useRouter();
    return (
      <>
        <button onClick={() => router.push("/register")} className='group relative h-12 rounded-full border-2 border-[#e54c4c] bg-gradient-to-r dark:from-[#c95050] dark:to-[#eb1c2c] from-[#ff7b7b] to-[#ff1e1e] px-5 dark:text-white text-white'>
          <span className='relative inline-flex overflow-hidden'>
            <div className='translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-24'>
            Register Now<ChevronsRight className='inline-block w-6 h-8' />
            </div>
            <div className='absolute translate-y-[116%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0'>
              Register Now<ChevronsRight className='inline-block w-6 h-8 ' />
            </div>
          </span>
        </button>
      </>
    );
  };
  
  export default RegButton;
  