import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview, upload } from "../assets";
import { FormField } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    photo: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.description && form.photo) {
      setLoading(true);

      try {
        const res = await fetch("https://takatuf-gallery.onrender.com/api/v1/post", {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body : JSON.stringify(form)
        })
        await res.json();
        navigate("/")
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false);

      }
    }else {
      alert("يرجى ملأ المعلومات اللازمة")
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        alert(
          "File size exceeds the maximum limit (25 MB). Please choose a smaller file."
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        setForm({ ...form, photo: base64 });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div className="w-full  justify-end text-right  flex">
        <h1 className=" float-right text-[#222328] text-[56px] max-sm:text-[40px]">
          شارك إحدى تجاربك
        </h1>
      </div>
      <div className="flex text-right justify-end">
      <p className="mt-3 text-[#666e75]  float-right text-[22px] max-x:text-[18px] max-w-[500px]">
        شاركنا اجمل اللحظات التي مررت بها خلال ايامك فالمخيم
      </p>
      </div>
      <form className="mt-10 mx-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="اسمك"
            type="text"
            name="name"
            placeholder="مثال : علاوي ابو حسين"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            LabelName="الوصف"
            type="text"
            name="description"
            placeholder="مثال : صورة ﻷيوب يتناول احد اطباق طابخنا الماهر"
            value={form.description}
            handleChange={handleChange}
          />

          <div>
            <p className="ml-auto text-xl font-medium text-gray-900 float-right">
              {" "}
              الصورة
            </p>
            <center>
              <label
                htmlFor="image"
                className={`hover:cursor-pointer bg-[#676a6710] justify-center   flex-col gap-2 items-center mt-14 flex h-96 border-dashed ${
                  !form.photo && "border-2  border-[#486E52]"
                } rounded-lg ${form.photo && "w-fit"} `}
              >
                {form.photo ? (
                  <img
                    src={form.photo}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <>
                    <img src={upload} className="h-10 w-10" />
                    <p className="text-xl">قم بإضافة صورة</p>
                  </>
                )}
              </label>
            </center>
            <input
              type="file"
              onChange={handleFileInputChange}
              id="image"
              placeholder="sad"
              accept=".jpg, .jpeg, .png, .gif"
              className="opacity-0"
            />
          </div>
        </div>
        <div>
          <p className=" float-right text-[#666e75] text-[20px] max-sm:text-[15px]">
            عندما تنتهي من اخنيار الصورة و ملأ المعلومات قم بمشاركتها معنا
          </p>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#486E52] max-md:w-full max-md:mt-3 disabled:bg-gray-500 text-white rounded-lg border-2 p-2"
          >
            {loading ? " ...... يتم النشر" : "قم بالمشاركة"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
