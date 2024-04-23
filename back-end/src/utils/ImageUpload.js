const { supabase } = require("../lib/supabase");

const uploadImage = async (file) => {
    const fileName = `/test/${Date.now()}.jpg`;

    const { error } = await supabase.storage
        .from("WebproImg")
        .upload(fileName, file.buffer, {
            cacheControl: "image/jpg",
            contentType: "image/jpg"
        });

    if (error) {
        throw error;
    }

    const { data } = await supabase.storage
        .from("WebproImg")
        .getPublicUrl(fileName);

    return data.publicUrl;
};

module.exports = { uploadImage }