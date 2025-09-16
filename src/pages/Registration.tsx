import React, { useState } from "react";
import { ArrowRight, User, Image as ImageIcon } from "lucide-react";
import { useWalletClient } from "wagmi";
import { CHAT_ABI } from "../config/abi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegistrationForm: React.FC<RegistrationOptions> = () => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data } = useWalletClient();
 


  const handleRegister = async (name: string, profilePic: File) => {

    const formData = new FormData();
    formData.append("file", profilePic);
    formData.append("network","public")
    const request = await fetch("https://uploads.pinata.cloud/v3/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_JWT}`,
      },
      body: formData,
    });

    const response = await request.json();


    if (!data) {
      toast.error("Connect your wallet")
      return
    };



    // const txSimulation = await publicClient?.simulateCalls({
    //   account: data.account.address,
    //   calls: [
    //     {
    //       to: import.meta.env.VITE_CHAT_CONTRACT,
    //       abi: CHAT_ABI,
    //       args: [name, response.data.cid],
    //       functionName: "register",
    //     },
    //   ],
    // });


    // if (txSimulation?.results[0].status !== "success"){
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   const errorCause = (txSimulation?.results[0].error as any)?.cause;
    //   const reason = errorCause?.reason || "Unknown error";
    //   const [title, description] = reason.split(":");
    //   console.log(description);
    //   toast.error(title, {
    //     // message: title,
    //     description: description,
    //   });
    //   return
    // }

    try {
      await data.writeContract({
      address: import.meta.env.VITE_CHAT_CONTRACT,
      abi: CHAT_ABI,
      functionName: "register",
      args: [name, response.data.cid],
      });

      navigate("/chat");
    } catch (error) {
      toast.error("Registration failed", {
      description: (error as Error).message,
      });
      return;
    }


     

    
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateENS = (value: string) => {
    return /^[a-z0-9-]+\.web3chat$/.test(value.toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profilePic || !name) {
      alert("Please upload a picture and enter a name.");
      return;
    }

    if (!validateENS(name)) {
      alert("ENS name must end with .web3chat and only contain a-z, 0-9, or -");
      return;
    }

    handleRegister(name, profilePic);

  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Your Web3Chat ID
        </h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center bg-gray-700 rounded-full mb-4">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <label className="cursor-pointer px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full font-medium text-sm">
            Upload Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* ENS Name */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">ENS Name</label>
          <div className="flex items-center bg-gray-800 rounded-lg px-3">
            <User className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="username.web3chat"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent focus:outline-none py-3"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-full font-semibold text-lg transition-all flex items-center justify-center space-x-2"
        >
          <span>Register</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
