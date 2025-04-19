"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { CONTRACTS } from "@/context/constants";

export default function LearnWeb3() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const _provider = new ethers.BrowserProvider(window.ethereum);
          const _signer = await _provider.getSigner();
          const _address = await _signer.getAddress();
          const _contract = new ethers.Contract(
            CONTRACTS.LEARNING_MODULE.address,
            CONTRACTS.LEARNING_MODULE.abi,
            _signer
          );

          setProvider(_provider);
          setSigner(_signer);
          setAddress(_address);
          setContract(_contract);

          const count = await _contract.courseCounter();
          if (Number(count) === 0) {
            const tx1 = await _contract.createCourse(
              "How to Build Ethereum Dapp With IPFS",
              "https://www.youtube.com/watch?v=pTZVoqBUjvI"
            );
            await tx1.wait();
            const tx2 = await _contract.createCourse(
              "Web3 authentication Web3Auth",
              "https://www.youtube.com/watch?v=eIYd_FOT3Fw"
            );
            await tx2.wait();
            const tx3 = await _contract.createCourse(
              "Getting Started with Web3",
              "https://www.youtube.com/watch?v=Wn_Kb3MR_cU"
            );
            await tx3.wait();
            toast.success("Demo courses created!");
          }

          await loadCourses(_contract, _address);
        } catch (err) {
          toast.error("Connection failed");
          console.error(err);
        }
      } else {
        toast.error("Please install Metamask");
      }
    };
    init();
  }, []);

  const loadCourses = async (_contract, _address) => {
    setLoading(true);
    try {
      const count = await _contract.courseCounter();
      const list = [];
      for (let i = 1; i <= count; i++) {
        const course = await _contract.courses(i);
        const isCompleted = await _contract.completed(_address, i);
        list.push({ id: i, title: course.title, uri: course.uri, completed: isCompleted });
      }
      setCourses(list);
    } catch (err) {
      toast.error("Failed to load courses");
    }
    setLoading(false);
  };

  const completeCourse = async (id) => {
    toast.promise(
      contract.completeCourse(id).then((tx) => tx.wait()),
      {
        loading: "Completing course...",
        success: "✅ Course marked as complete!",
        error: "❌ Failed to complete course",
      }
    ).then(() => loadCourses(contract, address));
  };

  const uploadCourse = async () => {
    if (!newTitle || !newUrl) return toast.error("Fill both fields");
    toast.promise(
      contract.createCourse(newTitle, newUrl).then((tx) => tx.wait()),
      {
        loading: "Uploading course...",
        success: "📚 Course uploaded!",
        error: "❌ Upload failed",
      }
    ).then(() => {
      setNewTitle("");
      setNewUrl("");
      loadCourses(contract, address);
    });
  };

  const getYouTubeThumbnail = (url) => {
    const match = url.match(/(?:youtube\.com.*(?:\/|v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : "";
  };

  const completedCount = courses.filter((c) => c.completed).length;
  const progressPercent = courses.length > 0 ? Math.round((completedCount / courses.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">📚 Learn Web3</h1>

        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-1">
            Progress: <span className="text-indigo-600">{progressPercent}%</span> completed
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-10">
          <h2 className="text-lg font-semibold mb-2">➕ Upload New Course</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Course Title"
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="YouTube URL"
              className="border px-4 py-2 rounded w-full"
            />
            <button
              onClick={uploadCourse}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Upload
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow animate-pulse h-64" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                {getYouTubeThumbnail(course.uri) ? (
                  <img
                    src={getYouTubeThumbnail(course.uri)}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    No Thumbnail
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title || "Untitled Course"}
                  </h2>
                  <a
                    href={course.uri}
                    target="_blank"
                    className="text-indigo-500 underline block mb-3"
                    rel="noopener noreferrer"
                  >
                    Watch on YouTube →
                  </a>
                  {course.completed ? (
                    <span className="text-green-600 font-medium">✅ Completed</span>
                  ) : (
                    <button
                      onClick={() => completeCourse(course.id)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                      Mark as Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
