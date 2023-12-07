import React, { useState } from 'react';

const GitHubCard = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  };
  const cardAnimationClass = userData ? 'opacity-100 transition duration-1000' : 'opacity-0';

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-gray-400 rounded shadow-md">
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          GitHub Username:
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </label>
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>

      {userData && (
        <div className={`github-card ${cardAnimationClass}`}>
          <img src={userData.avatar_url} alt="Avatar" className="rounded-full w-40 h-40 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">{userData.login}</h2>
          <p className="text-black">Name: {userData.name}</p>
          <p className="text-black">Public Repos: {userData.public_repos}</p>
          <p className="text-black">Public Gists: {userData.public_gists}</p>
          <p className="text-black">
            Profile Created At: {new Date(userData.created_at).toLocaleDateString('en-US')}
          </p>
        </div>
      )}
    </div>
  );
};

export default GitHubCard;
