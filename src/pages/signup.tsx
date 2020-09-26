import { useRef, useState } from "react";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);

  const handleLogin = async () => {
    console.log("emailRef.current?.value=", emailRef.current?.value);
    console.log("passwordRef.current?.value=", passwordRef.current?.value);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const res = await fetch(`http://localhost:3000/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await res.json();
    setMessage(json);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Create a new user</h1>
      {/* <form> */}
      <input type="text" placeholder="email" ref={emailRef} />
      <br />
      <input type="text" placeholder="passwor" ref={passwordRef} />
      <br />
      <button onClick={handleLogin}>Login</button>
      {/* </form> */}
      <br />
      {JSON.stringify(message, null, 2)}
    </div>
  );
}
