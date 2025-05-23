import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';
import conf from '../conf/conf';
import appwriteService from "../appwrite/config";
import axios from 'axios';


// Cloudinary image upload function
const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "tyzwt8gj"); // Your Cloudinary upload preset
  formData.append("cloud_name", "dom2vntvg"); // Your Cloudinary cloud name

  try {
      const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dom2vntvg/image/upload", // Cloudinary upload URL
          formData
      );
      console.log("Upload Success:", response.data);
      return response.data.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
      console.error("Error uploading to Cloudinary", error);
      throw new Error("Image upload failed");
  }
};


export default function RTE({name, control, label, defaultValue =""}) {

// Function to handle the image upload
const handleImageUpload = (blobInfo, progress) => new Promise(async (resolve, reject) => {

  const file = blobInfo.blob(); // Get the file from blobInfo
  const uploadedFile = await uploadImageToCloudinary(file);

  console.log("upload file rte mjjsx",uploadedFile);
  

  // const fileName = appwriteService.getFilePreview(uploadedFile.$id);
  // console.log(uploadedFile);
  // console.log("file name:: ",fileName);

  resolve(uploadedFile);
});

  return (
    <div className=' '> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        apiKey = {conf.RTEapiKey}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            images_upload_handler: handleImageUpload,
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}

