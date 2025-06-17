import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const KoshMarketplace: React.FC = () => {
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isVerySmallScreen = windowWidth <= 356;
  const isSmallScreen = windowWidth <= 375;

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    color: "#000066",
    padding: isVerySmallScreen ? "8px 12px" : isSmallScreen ? "10px 16px" : "12px 24px",
    margin: "10px",
    borderRadius: "20px",
    border: "none",
    fontWeight: "bold", 
    fontSize: isVerySmallScreen ? "11px" : isSmallScreen ? "12px" : "14px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    minWidth: isVerySmallScreen ? "auto" : isSmallScreen ? "80px" : "120px",
    cursor: "pointer",
    textAlign: "center",


    whiteSpace: isVerySmallScreen ? "nowrap" : "normal", 
    overflowWrap: isVerySmallScreen ? "normal" : "break-word",
    wordBreak: "normal", 
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: "#000080",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderTopLeftRadius: "150px",
    borderBottomRightRadius: "150px",
    flexDirection: "column",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px 30px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    width: "100%",
    maxWidth: isSmallScreen ? "320px" : "400px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isSmallScreen ? "40px" : "60px",
    fontWeight: "900",
    color: "#fff",
    marginBottom: "10px",
    fontFamily: "'Impact', 'Arial Black', sans-serif",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: isSmallScreen ? "18px" : "22px",
    color: "#fff",
    marginBottom: "30px",
  };

  const fullWidthStyle: React.CSSProperties = {
    ...buttonStyle,
    gridColumn: "span 2",
    justifySelf: "center",
  };

  const buttons = [
    { text: "Kosh Token", link: "https://koshtoken.info" },
    { text: "Kosh Market", link: "/kosh-market" },
    { text: "Buy Kosh", link: "https://buy.koshtoken.info" },
    { text: "Secondary Market", link: "/secondary-market" },
    { text: "Custom Order", link: "/custom-order" },
    { text: "Learn with AAA", link: "/learn-with-aaa" },
    { text: "Games", link: "/games", fullWidth: true },
  ];

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        style={titleStyle}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        KOSH
      </motion.div>

      <motion.div
        style={subtitleStyle}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Marketplace
      </motion.div>

      <motion.div
        style={gridStyle}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {buttons.map((btn, i) => {
          const isExternal = btn.link.startsWith("http");

          return (
            <motion.button
              key={btn.text}
              style={btn.fullWidth ? fullWidthStyle : buttonStyle}
              onClick={() =>
                isExternal
                  ? window.open(btn.link, "_blank", "noopener,noreferrer")
                  : navigate(btn.link)
              }
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            >
              {btn.text}
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default KoshMarketplace;
