import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'

const AiTools=[
    {
        name: 'AI Products Image',
        desc: 'Generate high quality product images with AI',
        bannerImage: '/product-image.png',
        path: '/creative-ai-tools/product-images'
    },
    {
        name: 'AI Products Video',
        desc: 'Generate high quality product videos with AI',
        bannerImage: '/product-video.png',
        path: '/'
    },
    {
        name: 'AI Products Avatar',
        desc: 'Generate high quality product avatars with AI',
        bannerImage: '/product-avatar.png',
        path: '/'
    },
    
]
function AiToolList() {
  return (
    <div>
      <h2 className='font-bold text-2xl mb-2'>Creative AI Tools</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {AiTools.map((tool,index) => (
            <div key={index} className='flex items-center justify-between p-7 bg-zinc-800 rounded-2xl'>
                <div>
                    <h2 className='font-bold text-2xl'>{tool.name}</h2>
                    <p className='opacity-60 mt-2'>{tool.desc}</p>

                    <a href={tool.path}>
                    <Button className='mt-4'>Create Now</Button>
                    </a>
                </ div>
                <Image src={tool.bannerImage} alt={tool.name} width={300} height={300} className="w-[200px]" />
            </div>
        ))}
      </div>
    </div>
  )
}

export default AiToolList
