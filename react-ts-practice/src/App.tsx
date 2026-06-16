// =======================================================
// Practice Project : 1
// =======================================================

// import React, { useState } from "react";

// export default function App() {
//   const [text, setText] = useState<string>("");

//   const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setText(e.target.value);
//   };

//   return (
//     <div>
//       <h2>React + TS Simple Test</h2>

//       <input type="text" value={text} onChange={handleType} />

//       <p>
//         You Type : <strong>{text}</strong>
//       </p>
//     </div>
//   );
// }

// ================================================================
// Practice Project : 2
// ================================================================

import "./App.css";

interface User {
  name: string;
  role: string;
  experience: number;
}

export default function App() {
  const myUser: User = {
    name: "Hardeep Singh",
    role: "MERN Stack Developer",
    experience: 2,
  };

  return (
    <div>
      <h2>InterFace Example</h2>
      <div>
        <h3>{myUser.name}</h3>
        <p>
          <strong>Role:</strong>
          {myUser.role}
        </p>
        <p>
          <strong>Experience:</strong>
          {myUser.experience}
        </p>
      </div>
    </div>
  );
}
