const conf = {
    appwriteUrl: toString(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: toString(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: toString(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: toString(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: toString(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;

//verderLO