import React from 'react'
import Examwindow from '../components/Examwindow'
import { useState } from 'react';
import { Clock, BookOpen, AlertCircle, ArrowRight} from 'lucide-react';
import Button from '../components/Button';


function Exampage() {
  const [isOpen, setIsOpen] = useState(true);



  return (
    <>
      <div className={`h-screen px-4 bg-black pb-[10px] ${isOpen ? 'blur-lg' : ''}`}>
        <Examwindow />
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">



          <div className='h-[350px] w-[450px] rounded-lg bg-darkGray shadow-xl p-4 pt-4'>

            <div className='text-center text-white'>
              <h1 className='text-2xl mb-2'>Ready to begin your exam</h1>
              <p className='text-sm text-textGray'>Please review the exam details below</p>

            </div>



            <div className='space-y-4 flex flex-col items-center w-full max-w-md mx-auto p-4'>
              <div className="flex items-center gap-3 text-gray-300 bg-gray-800/50 w-full p-3 rounded-lg hover:bg-gray-800/70 transition-colors">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Duration: 2 hours</span>
              </div>

              <div className="flex items-center gap-3 text-gray-300 bg-gray-800/50 w-full p-3 rounded-lg hover:bg-gray-800/70 transition-colors">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="font-medium">50 Multiple Choice Questions</span>
              </div>

              <div className="flex items-start gap-3 bg-amber-900/20 w-full p-2 rounded-lg border border-amber-500/20">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-300">
                  Once started, the exam cannot be paused. Ensure you have a stable internet connection and sufficient time.
                </p>
              </div>

              <Button  
               iconStyle={{size: 14, className: ' translate-y-0 '}} 
               Icon={ArrowRight} 
               label={'START'} 
               disabled={false} 
               buttonClass={'text-textGray text-white bg-green-700 hover:shadow-xl'}
               action={()=>setIsOpen(false)}
               />
               

            </div>

          </div>

        </div>
      )}

    </>

  )
}

export default Exampage