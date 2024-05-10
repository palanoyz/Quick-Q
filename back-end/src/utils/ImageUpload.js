const { supabase } = require("../lib/supabase");

const uploadImageLogo = async (file) => {
    const fileName = `/logo/${Date.now()}.jpg`;

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

const uploadImageBanner = async (file) => {
    const fileName = `/banner/${Date.now()}.jpg`;

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

module.exports = { uploadImageLogo, uploadImageBanner };