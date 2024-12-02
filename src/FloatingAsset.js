import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WixFloatingAsset = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [path, setPath] = useState({
    x: [0, 200, 400, 600, 800],
    y: [0, 100, 300, 200, 500],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getDocumentHeight = () => {
        return Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
      };

      const getDocumentWidth = () => {
        return Math.max(
          document.body.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.clientWidth,
          document.documentElement.scrollWidth,
          document.documentElement.offsetWidth
        );
      };

      const generateSmoothPath = () => {
        const documentHeight = getDocumentHeight();
        const documentWidth = getDocumentWidth();

        const newPath = {
          x: path.x.map(() => Math.random() * (documentWidth * 0.8)),
          y: path.y.map(() => Math.random() * (documentHeight * 0.8)),
        };

        setPath(newPath);
      };

      const moveInterval = setInterval(generateSmoothPath, 10000);
      return () => clearInterval(moveInterval);
    }
  }, [path]);

  const handleClick = () => {
    setIsClicked(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <motion.div
        className="floating-asset"
        style={{
          width: "100px",
          height: "100px",
          background: "url('/llama.png') no-repeat center/contain",
          position: "absolute",
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
      />

      {/* Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          style={{
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
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You've unlocked a reward! Continue to this <a href="nani">website</a> to claim rewards</p>
            <button
              onClick={handleCloseModal}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                background: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Wix-specific wrapper
function WixEmbeddedFloatingAsset() {
  useEffect(() => {
    const adjustContainer = () => {
      const container = document.getElementById("floating-asset-container");
      if (container) {
        container.style.position = "absolute";
        container.style.top = "0";
        container.style.left = "0";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.pointerEvents = "none";
        container.style.zIndex = "9999";
      }
    };

    adjustContainer();
    window.addEventListener("resize", adjustContainer);

    return () => {
      window.removeEventListener("resize", adjustContainer);
    };
  }, []);

  return <WixFloatingAsset />;
}

export default WixEmbeddedFloatingAsset;
