import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ID } from "appwrite";
import axios from "axios";
import appwriteService from "../../appwrite/config";

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

export default function PostForm({ post }) {
    const [loading, setLoading] = useState(false);
    const postId = ID.unique();
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);

        try {
            let imageUrl = null;

            if (data.image[0]) {
                // Upload image to Cloudinary
                imageUrl = await uploadImageToCloudinary(data.image[0]);
            }

            if (post) {
                // If updating, delete the old featured image from appwrite and update post
                if (imageUrl) {
                    // If appwrite service supports deleting images, call the delete method here
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: imageUrl || post.featuredImage, // Set Cloudinary URL or keep the old one
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // If creating new post
                const postData = {
                    ...data,
                    name: userData.name,
                    slug: postId,
                    userId: userData.$id,
                    featuredImage: imageUrl, // Set Cloudinary URL
                };

                const dbPost = await appwriteService.createPost(postData);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error during image upload or post submission:", error);
            alert("Something went wrong while submitting the post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap w-full py-8 mt-4 text-center min-h-screen flex-col sm:flex-row">
            <div className="sm:w-2/3 w-full px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="sm:w-1/3 sm:px-2 w-full sm:mt-0 mt-8">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" disabled={loading}>
                    {loading ? "Uploading..." : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
