"use client";

import FormInput from './_components/FormInput'
import React,{useState} from 'react'
import PreviewResult from './_components/PreviewResult'
import axios from 'axios';

type FormData = {
  file?: File;
  description?: string;
  size?: string;
  imageUrl?: string;
};

function ProductImages() {

  const [formData, setFormData] = useState<FormData>({});
  const [loading,setLoading]=useState(false);

  const onHandleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const next: FormData = { ...(prev ?? {}), [field]: value };
      // Ensure only one image source is active at a time.
      if (field === 'file') next.imageUrl = '';
      if (field === 'imageUrl') next.file = undefined;
      return next;
    });
  }
  const OnGenerate=async()=>{
    if (!formData.file && !formData.imageUrl){
      alert('Please upload Product Image');
      return;
    }
    if (!formData.description || !formData.size) {
      alert('Enter all fields');
      return;
    }
    setLoading(true);
    try {
      const formData_ = new FormData();
      if (formData.file) {
        formData_.append('file', formData.file);
      }
      if (formData.imageUrl) {
        formData_.append('imageUrl', formData.imageUrl);
      }
      formData_.append('description', formData.description ?? '');
      formData_.append('size', formData.size ?? '1028x1028');

      console.log('Generate payload state:', {
        hasFile: !!formData.file,
        file: formData.file ? { name: formData.file.name, type: formData.file.type, size: formData.file.size } : null,
        imageUrl: formData.imageUrl,
        description: formData.description,
        size: formData.size,
      });
      console.log('Generate multipart keys:', Array.from(formData_.keys()));

      // Make API Call
      const response = await axios.post('/api/user/generate-product-image', formData_);
      console.log('Generate product image response:', response.data);
    } catch (error: any) {
      console.error('Error generating product image:', error.response?.data || error.message);
      alert('Failed to upload image or generate product image. Check the console for details.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <h2 className='font-bold text-2xl mb-3'>AI Product Image Generator</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div>
          <FormInput onHandleInputChange={onHandleInputChange}
            OnGenerate={OnGenerate}
            loading={loading}
            />
        </div>
        <div className='md:grid-cols-2'>
          <PreviewResult />

        </div>
      </div>
    </div>
  )
}

export default ProductImages
