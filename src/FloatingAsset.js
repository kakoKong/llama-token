import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

const FloatingAsset = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [path, setPath] = useState({
    x: [0, 200, 400, 600, 800],
    y: [0, 100, 300, 200, 500],
  });

  useEffect(() => {
    // Only generate path if the asset hasn't been clicked
    if (!isClicked) {
      const generateSmoothPath = () => {
        const newPath = {
          x: path.x.map((_, index) => 
            index === 0 
              ? path.x[path.x.length - 1]
              : Math.random() * window.innerWidth * 0.8
          ),
          y: path.y.map((_, index) => 
            index === 0 
              ? path.y[path.y.length - 1]
              : Math.random() * window.innerHeight * 0.8
          )
        };
        
        setPath(newPath);
      };

      const moveInterval = setInterval(generateSmoothPath, 10000);
      return () => clearInterval(moveInterval);
    }
  }, [isClicked, path]);

  const handleClick = (event) => {
    setIsClicked(true);
    setShowModal(true);

    Cookies.set("assetClicked", "true", { expires: 1 }); // Valid for 1 day
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isClicked && (
          <motion.div
            className="floating-asset"
            style={{
              width: "100px",
              height: "100px",
              background: "url('/llama.png') no-repeat center/contain",
              position: "fixed",
              cursor: "pointer",
              zIndex: 999,
            }}
            animate={{
              x: path.x,
              y: path.y,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              type: "tween",
            }}
            onClick={handleClick}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.5 }
            }}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" style={modalStyles.overlay}>
          <div className="modal-content" style={modalStyles.content}>
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You've unlocked a reward! Continue to this <a href="nani">website</a> to claim rewards</p>
            <button onClick={handleCloseModal} style={modalStyles.button}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Inline styles for modal
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

export default FloatingAsset;