import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const StaticAsset = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  useEffect(() => {
    // Check if user has already clicked
    // const assetClicked = Cookies.get("assetClicked");
    // if (assetClicked) {
    // setIsClicked(true);
    // } else {
    // Set a random static position if not clicked
    const randomTop = Math.random() * 80 + 10; // Random value between 10% and 90%
    const randomLeft = Math.random() * 80 + 10; // Random value between 10% and 90%
    setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
    // }
  }, []);

  const handleClick = () => {
    setShowModal(true);
    setIsClicked(true);
    Cookies.set("assetClicked", "true", { expires: 1 }); // Valid for 1 day
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // if (isClicked) return null; // Hide asset if already clicked

  return (
    <div>
      {/* Static Asset */}
      <div
        className="static-asset"
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          width: "70px",
          height: "70px",
          background: "url('/llama.png') no-repeat center/contain",
          zIndex: 999,
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        Hi
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" style={modalStyles.overlay}>
          <div className="modal-content" style={modalStyles.content}>
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You’ve unlocked a reward!</p>
            <button onClick={handleCloseModal} style={modalStyles.button}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles for simplicity
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  content: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "300px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default StaticAsset;
