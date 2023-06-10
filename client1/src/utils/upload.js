import axios from "axios";

const uploadImage = async (image) => {
  const data = new FormData();
  data.append("image", image);
  // data.append("upload_preset", "fiverr");
  try {
    const res = await axios.post(
      "http://localhost:8080/api/images/upload",
      data
    );
    const { url } = res.data;
    return url;
  } catch (error) {
    console.log(error);
  }
};

export default uploadImage;
