import { Lock, Mail, User2Icon, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = useState(urlState || "login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password, name } = formData;

    try {
      if (state === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        if (authError) throw authError;
        alert("Check your email for the confirmation link!");
      }

      // Successful login or signup
      if (state === "login") navigate("/app");
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>
        
        {error && (
          <div className="mt-4 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg animate-shake">
            {error}
          </div>
        )}

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color="#6B7280" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 w-full"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={16} color="#6B7280" />

          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
<Lock size={16} color="#6B7280" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0 w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4 text-left text-green-500">
          <button className="text-sm" type="button">
            Forget password?
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (state === "login" ? "Login" : "Sign up")}
        </button>
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3 mb-11"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a href="#" className="text-green-500 hover:underline">
            click here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
