
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className='flex justify-center items-center w-full mt-20'>
       <Loader2 className="h-7 w-7 animate-spin" /> Loading
    </div>
  )
}

export default Loader