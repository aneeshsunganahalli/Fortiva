'use client';

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post('http://localhost:5000/api/user/register', formData);

      if (data.success) {
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-white">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-gray-900/50 text-white placeholder:text-gray-400 p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-gray-900/50 text-white placeholder:text-gray-400 p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-gray-900/50 text-white placeholder:text-gray-400 p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
        />
        <button
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-50 transition-all duration-200 font-medium"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      {error && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-400 p-3 rounded-lg mt-4">
          {error}
        </div>
      )}

      <div className="flex gap-2 mt-5 justify-center">
        <p className="text-gray-400">Have an account?</p>
        <Link 
          href="/sign-in" 
          className="text-gray-500 hover:text-white transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;