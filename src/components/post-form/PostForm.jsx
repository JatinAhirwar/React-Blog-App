import React, { useCallback, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ID } from "appwrite";

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
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            setLoading(true);

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            console.log(data);
            setLoading(true);

            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                data.name = userData.name;
                const dbPost = await appwriteService.createPost({ ...data, slug: postId, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } 
                
            } else {
                console.log("image is required");
            }
        }
    };

    // const slugTransform = useCallback((value) => {
    //     if (value && typeof value === "string")
    //         return value
    //             .trim()
    //             .toLowerCase()
    //             .replace(/[^a-zA-Z\d\s]+/g, "-")
    //             .replace(/\s/g, "-")
    //             .substring(0, 36);;

    //     return "";
    // }, []);

    // useEffect(() => {
    //     setValue("slug", postId, {shouldValidate: true})
    // }, []);

    // useEffect(() => {
    //     const subscription = watch((value, { name }) => {
    //         if (name === "title") {
    //             setValue("slug", slugTransform(value.title), { shouldValidate: true });
    //         }
    //     });

    //     return () => subscription.unsubscribe();
    // }, []);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap w-full py-8 mt-4 text-center min-h-screen">
            <div className="w-2/3 px-2 ">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                {/* <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    disabled={true}
                    {...register("slug", { required: true, })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
                value = {postId}
                /> */}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="w-1/3 px-2  ">

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
                            src={appwriteService.getFilePreview(post.featuredImage)}
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
                    {loading ? 'Uploading...' : (post ? "Update" : "Submit")} {/* Display loading text or button label */}
                </Button>

            </div>
        </form>
    );
}