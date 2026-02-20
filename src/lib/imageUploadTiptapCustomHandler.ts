import axios from "axios";

export const imageUploadTiptapCustomHandler = async (
  file: File
): Promise<string> => {
  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("from_system", "language_center");

  const res = await axios.post(
    "/api/misc/uploadImageCustomTiptapEditor",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  //   const res = await axios.post(
  //     `${process.env.SERVICE_URL}/v2/utility/save-image-texteditor`,
  //     formData
  //   );

  if (res.data && res.data.data.s3_url) {
    return res.data.data.s3_url;
  } else {
    throw new Error("Gagal mengunggah gambar");
  }
};
