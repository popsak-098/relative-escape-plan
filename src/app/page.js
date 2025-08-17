// This line is necessary for Next.js to know this is a client-side component,
// allowing us to use interactive features like buttons and state.
"use client";

// We're importing two essential tools from React: 'useState' and 'useEffect'.
// We're also importing 'useRef' to get a direct reference to our ringtone object.
import { useState, useEffect, useRef } from "react";

// These are some fun, silly excuses we can show the user.
const funnyExcuses = [
 "Onn wait cheyye, enne NASA il ninnu vilikkunnu",
  "Hello enth, kalyana chekkan olichodi enno",
  "Ammaava, sadhya theeraraayi enn",
  "February 30, please save the date",
  "Ente jyolsyan aa viliche, ente oru ammavan marikkaar enn",
  "Onn wait cheyye, ente gynaecologist vilikkunnu",
];

// This is our main component, the heart of our app.
export default function HomePage() {
  // Here we set up our "memory boxes" (state) using useState.
  const [isCallScreenVisible, setIsCallScreenVisible] = useState(false);
  const [timer, setTimer] = useState(5); // The call will be triggered in 5 seconds.
  const [isCallActive, setIsCallActive] = useState(false);
  const [showExcuse, setShowExcuse] = useState(false);
  const [selectedExcuse, setSelectedExcuse] = useState("");

  // We use a ref to hold our ringtone synthesizer. This prevents it from
  // being recreated on every render, which is more efficient.
  const ringtone = useRef(null);

  // This useEffect hook runs a countdown when the call screen is visible but not yet active.
  useEffect(() => {
    if (isCallScreenVisible && !isCallActive) {
      if (timer === 0) {
        setIsCallActive(true);
        // When the call becomes active, we start the ringtone.
        // We check if Tone is available (loaded by the script).
        if (window.Tone) {
          // Create a simple synthesizer for the sound.
          ringtone.current = new window.Tone.Synth().toDestination();
          // This creates a looping pattern for a classic ringtone sound.
          const loop = new window.Tone.Loop(time => {
            ringtone.current.triggerAttackRelease("C5", "8n", time);
            ringtone.current.triggerAttackRelease("G4", "8n", time + 0.5);
          }, "1n").start(0);
          window.Tone.Transport.start();
        }
        return; 
      }
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isCallScreenVisible, isCallActive, timer]);

  // A helper function to stop the ringtone sound.
  const stopRingtone = () => {
    if (window.Tone && window.Tone.Transport.state === 'started') {
      window.Tone.Transport.stop();
      window.Tone.Transport.cancel(); // Clears any scheduled events.
    }
  };

  // This function is called when the main "Activate" button is pressed.
  const handleActivate = async () => {
    // Audio can only start after a user interaction. This ensures
    // the audio context is ready when we need it.
    if (window.Tone && window.Tone.context.state !== 'running') {
      await window.Tone.start();
    }
    setIsCallScreenVisible(true);
  };

  // This function simulates "answering" the call.
  const handleAnswerCall = () => {
    // Stop the ringtone when the call is answered.
    stopRingtone();
    const randomIndex = Math.floor(Math.random() * funnyExcuses.length);
    setSelectedExcuse(funnyExcuses[randomIndex]);
    setShowExcuse(true);
    setIsCallActive(false);
  };

  // This function resets the app back to its starting state.
  const handleReset = () => {
    // Stop the ringtone if the user resets.
    stopRingtone();
    setIsCallScreenVisible(false);
    setIsCallActive(false);
    setShowExcuse(false);
    setTimer(5); // Reset the timer back to 5 seconds.
  };

  // This is the JSX, which looks like HTML. It describes what our app looks like.
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4 font-sans">
      {/* Main Container */}
      <div className="w-full max-w-sm rounded-2xl bg-gray-800 shadow-2xl p-6 text-center">
        
        {/* Conditional Rendering: What to show depends on the app's state. */}

        {!isCallScreenVisible && !showExcuse ? (
          // --- 1. The Initial Screen ---
          <>
            <h1 className="text-3xl font-bold text-teal-400 mb-2">"kalyanam onnum aayille mole"</h1>
            <p className="text-gray-300 mb-6">
              Need a quick exit? Activate a fake call to your phone.
            </p>
            <button
              onClick={handleActivate}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-4 rounded-xl text-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Escape!!!
            </button>
          </>
        ) : showExcuse ? (
          // --- 2. The Excuse Screen ---
          <>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Your Perfect Excuse:</h2>
            {/* THIS IS THE FIX: The quotation marks have been removed from around the excuse. */}
            <p className="text-lg bg-gray-700 p-4 rounded-lg mb-6">
              {selectedExcuse}
            </p>
            <button
              onClick={handleReset}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
            >
              Reset
            </button>
          </>
        ) : isCallActive ? (
          // --- 3. The Incoming Call Screen ---
          <div className="bg-black rounded-2xl p-6 animate-pulse">
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-lg">Incoming Call...</p>
              <h2 className="text-5xl font-bold my-4">UNKNOWN NUMBER</h2>
              <div className="w-full flex justify-around mt-8">
                <button 
                  onClick={handleAnswerCall}
                  className="bg-green-600 hover:bg-green-700 rounded-full h-20 w-20 flex items-center justify-center shadow-lg"
                >
                  {/* SVG Icon for Answer */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          // --- 4. The Countdown Screen ---
          <>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Get Ready...</h2>
            <p className="text-gray-300 mb-4">Fake call will trigger in:</p>
            <div className="text-8xl font-bold text-teal-400 mb-6">
              {timer}
            </div>
            <p className="text-sm text-gray-500">Put your phone down and act natural!</p>
          </>
        )}
      </div>
    </main>
  );
}
