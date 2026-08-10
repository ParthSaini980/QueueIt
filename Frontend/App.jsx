import { useState } from "react";
import axios from "axios";

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const [queueName, setQueueName] = useState("");
  const [queueId, setQueueId] = useState("");

  const [joinQueueId, setJoinQueueId] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");

  // REGISTER
  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message || "Registration successful!");

      // Switch to login after registration
      setIsRegistering(false);
      setName("");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  // LOGIN
  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      setToken(res.data.token);
      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // CREATE QUEUE
  const createQueue = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/queue/create",
        {
          name: queueName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQueueId(res.data.queue._id);
      alert("Queue created!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Queue creation failed");
    }
  };

  // JOIN QUEUE
  const joinQueue = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/queue/join",
        {
          queueId: joinQueueId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosition(res.data.position);
      alert("Joined queue successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Join failed");
    }
  };

  // QUEUE STATUS
  const getQueueStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/queue/${queueId}`
      );

      setStatus(
        `Queue: ${res.data.queue} | People: ${res.data.totalPeople} | Status: ${res.data.status}`
      );
    } catch (error) {
      console.error(error);
      alert("Could not get queue status");
    }
  };

  // SERVE NEXT
  const serveNext = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/queue/serve",
        {
          queueId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Serve failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-5xl font-bold text-blue-600 mb-8 text-center">
          QueueIt 🚀
        </h1>

        {/* AUTHENTICATION */}
        {!token && (
          <div>

            {isRegistering ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Create Account
                </h2>

                <input
                  className="border p-2 rounded w-full mb-3"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="border p-2 rounded w-full mb-3"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="border p-2 rounded w-full mb-3"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg w-full mb-3"
                  onClick={register}
                >
                  Register
                </button>

                <button
                  className="text-blue-600 w-full"
                  onClick={() => setIsRegistering(false)}
                >
                  Already have an account? Login
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Login
                </h2>

                <input
                  className="border p-2 rounded w-full mb-3"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="border p-2 rounded w-full mb-3"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full mb-3"
                  onClick={login}
                >
                  Login
                </button>

                <button
                  className="text-green-600 w-full"
                  onClick={() => setIsRegistering(true)}
                >
                  Don't have an account? Register
                </button>
              </>
            )}

          </div>
        )}

        {/* QUEUE DASHBOARD */}
        {token && (
          <div>

            <h2 className="text-2xl font-semibold mb-3">
              Create Queue
            </h2>

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Queue name"
              value={queueName}
              onChange={(e) => setQueueName(e.target.value)}
            />

            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg w-full mb-4"
              onClick={createQueue}
            >
              Create Queue
            </button>

            {queueId && (
              <p className="bg-gray-100 p-3 rounded mb-5 break-all">
                Queue ID:
                <br />
                {queueId}
              </p>
            )}

            <h2 className="text-2xl font-semibold mb-3">
              Join Queue
            </h2>

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Enter Queue ID"
              value={joinQueueId}
              onChange={(e) => setJoinQueueId(e.target.value)}
            />

            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full mb-3"
              onClick={joinQueue}
            >
              Join Queue
            </button>

            {position && (
              <p className="text-lg font-semibold mb-4">
                Your Position: {position}
              </p>
            )}

            <h2 className="text-2xl font-semibold mb-3">
              Queue Status
            </h2>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-3"
              onClick={getQueueStatus}
            >
              Check Status
            </button>

            <p className="bg-gray-100 p-3 rounded mb-4">
              {status}
            </p>

            <h2 className="text-2xl font-semibold mb-3">
              Admin Control
            </h2>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg w-full"
              onClick={serveNext}
            >
              Serve Next Person
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;