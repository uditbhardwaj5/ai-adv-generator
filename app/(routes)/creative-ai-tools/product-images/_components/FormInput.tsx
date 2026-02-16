"use client"
import React from 'react'
import Image from 'next/image'
import { ImagePlus } from 'lucide-react'
import { Client } from '@neondatabase/serverless';

const sampleProduct= [
    '/headphone.png',
    '/juice-can.png',
    '/perfume.png',
    '/burger.png',
    '/ice-cream.png'
]
function FormInput() {
    
    const [preview, setPreview] = React.useState<string | null>();
    const onFileSelect = (files: FileList | null) => {
        if(!files || files.length === 0) return;

        const file = files[0];
        if(file.size > 5 * 1024 * 1024) {
            alert("File size should be less than 5MB");
            return;
        }
        setPreview(URL.createObjectURL(file));

    }
  return (
    <div>
      <div>
         <h2 className='font-semibold'>1. Upload Product Image</h2>
         <div>
            <label htmlFor='imageUpload' className='mt-2 border-dashed border-2 rounded-xl flex flex-col p-4 items-center justify-center min-h-[200px]cursor-pointer'>
                {!preview? <div className='flex flex-col items-center gap-3'>
                    <ImagePlus className='h-8 w-8 opacity-40' />
                    <h2 className='text-xl'>Click here to upload Image</h2>
                    <p className='opacity-45'>Upload image upto 5MB</p>
                </div>
                : <img src={preview} alt='preview' width={300} height={300} className='w-full h-full max-h-[200px] obj-content-rounded' />}
            </label>
             <input type='file' id="imageUpload" className='hidden' accept='image/*'
             onChange={(event) => onFileSelect(event.target.files)}/>
            </div>
            {/* Sample Product Images */}
            <div>
                <h2 className='opacity-40 text-center mt-3'>Select sample product to try</h2>
             <div className='flex gap-5 items-center'>
                {sampleProduct.map((product,index) => (
                    <Image src={product} alt={product} width={100} height={100} key={index} className='w-[60px] h-[60px] rounded-lg cursor-pointer hover:scale-105 transition-all'
                    onClick={()=> setPreview(product)} />
                ))}
                </div>     
      </div>
      <div className='MT-8'>
        <h2 className='font-semibold'>2. Enter product description</h2>
        </div> 
      </div>     
    </div>
  )
}

export default FormInput
