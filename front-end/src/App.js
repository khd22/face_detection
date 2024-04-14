import axios from "axios";
import React, { useState, useEffect } from "react";
function App() {
  const ImageUploadForm = () => {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [pageState, setpageState] = useState("main");

    const goBack = () => {
      setFile(null);
      setpageState("main");
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("image", file);

      try {
        setpageState("loading");
        const response = await axios.post(
          "https://face-detection-1.onrender.com/upload", // to host locally: "http://localhost:5000/upload"
          formData,
          {
            responseType: "blob",
          }
        );

        const objectURL = URL.createObjectURL(response.data);
        setpageState("result");
        setImage(objectURL);
      } catch (error) {
        setFile(null);
        setpageState("main");
        console.error("error uploading file", error);
      }
    };
    return (
      <div className="bg-second min-h-screen from-gray-100 to-gray-300">
        <div className="scrollable-container">
          <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-blue-400">
                Face Detection
              </span>
            </h1>
          </div>
          {pageState === "main" && (
            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
              <form
                onSubmit={handleSubmit}
                className=" mt-4 flex flex-col md:flex-row md:items-center"
              >
                <div className="">
                  <label
                    htmlFor="image"
                    className="form-label text-white"
                    style={{ marginRight: "1rem" }}
                  >
                    Choose an image to detect faces in it:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                  rounded items-center "
                  onClick={handleSubmit}
                >
                  Detect
                </button>
              </form>
              <div class="grid justify-items-center w-full mt-6">
                {file && (
                  <div class="grid justify-items-center w-full">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      style={{
                        border: "5px solid black",
                        width: "50%", // Set the width of the image
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {pageState === "loading" && (
            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col mt-20 items-center justify-center h-full">
              <div className="grid justify-items-center w-full">
                <div className="spinner-box">
                  <div className="configure-border-1">
                    <div className="configure-core"></div>
                  </div>
                  <div className="configure-border-2">
                    <div className="configure-core"></div>
                  </div>
                </div>
              </div>
              <div className="mt-20 text-white text-2xl font-bold">
                Detecting
              </div>
            </div>
          )}

          {pageState === "result" && (
            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
              <div className="grid justify-items-center w-full mt-6">
                {image && (
                  <div className="grid justify-items-center w-full">
                    <img
                      src={image}
                      alt="Uploaded"
                      style={{
                        border: "5px solid black",
                        width: "50%", // Set the width of the image
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white flex gap-2 font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => goBack()}
                >
                  <svg
                    className="w-5 h-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                  <span> Back</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <ImageUploadForm />
    </div>
  );
}

export default App;
