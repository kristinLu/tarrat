import './App.css';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button, TextField, Box, Grid, Typography } from "@mui/material";

function App() {
    const columns = 8;
    const rows = 14;
    const totalCells = columns * rows;
    const [cells, setCells] = useState(Array(totalCells).fill(""));
    const [index, setIndex] = useState(0);
    const [fillCount, setFillCount] = useState(0);
    const [word1, setWord1] = useState("");
    const [word2, setWord2] = useState("");
    const word1Ref = useRef(null);
    const word2Ref = useRef(null);
    const fillCountRef = useRef(null);

    const handleAdd = () => {
        if (index < totalCells) {
          const newCells = [...cells];
          const cellsToFill = Math.min(fillCount, totalCells - index);

          for (let i = 0; i < cellsToFill; i++) {
              const fillIndex = ((index + i) % rows) * columns + Math.floor((index + i) / rows);
              //newCells[fillIndex] = `${word1}\n${word2}`;
              newCells[fillIndex] = (
                <div style={{ textAlign: 'center', lineHeight: 1.5, fontSize: '11pt' }}>
                  {i === 0 ? (
                    <>
                      <div><strong>{formatWord1(word1)}</strong></div>
                      <div>{word2}</div>
                    </>
                  ) : (
                    <div>{word2 || " "}</div>
                  )}
                </div>
              );
              /*if (i === 0) {
                  newCells[fillIndex] = (
                        <div style={{ textAlign: 'center', lineHeight: 1.5, fontSize: '11pt' }}>
                          <div><strong>{formatWord1(word1)}</strong></div>
                          <div>{word2}</div>
                        </div>
                  );
              } else {
                  //newCells[fillIndex] = `${word2}`;
                  newCells[fillIndex] = word2 || " ";
              }*/
          }
          setCells(newCells);
          setIndex(index + cellsToFill);
          setWord1("");
          setWord2("");
          setFillCount(0);
          word1Ref.current.focus();
        };
    };

    const handleReset = () => {
        setCells(Array(totalCells).fill(""));
        setIndex(0);
        word1Ref.current.focus();
    };

    const handleKeyDownWord1 = (e) => {
        if (e.key === "Enter") {
            word2Ref.current.focus();
        };
    };

    const handleKeyDownWord2 = (e) => {
        if (e.key === "Enter") {
            fillCountRef.current.select()
        };
    };

    const handleKeyDownFillCount = (e) => {
        if (e.key === "Enter") {
            handleAdd();
        };
    };

function formatWord1(input) {
  if (!input) return "";
  input = input.toUpperCase();
  const match = input.match(/^([A-Z]{2})20(\d{2})00(\d+)$/);
  return match ? `${match[1]}${match[2]}-${match[3]}` : input;
}

return (
    <>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "column", lg: "row" },
        gap: 4,
        p: 4,
        alignItems: { xs: "center", md: "center", lg: "flex-start" },
      }}
    >
          <Box sx={{ width: 300, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h3" color="primary" gutterBottom>
              Lasitarrojen tulostus
            </Typography>

            <TextField
              label="PE-numero"
              value={word1}
              onChange={(e) => setWord1(e.target.value.toUpperCase())}
              inputRef={word1Ref}
              onKeyDown={handleKeyDownWord1}
            />
            <TextField
              label="S-numero"
              value={word2}
              onChange={(e) => setWord2(e.target.value.toUpperCase())}
              inputRef={word2Ref}
              onKeyDown={handleKeyDownWord2}
            />
            <TextField
              label="Tarrojen lukumäärä"
              type="number"
              value={fillCount}
              onChange={(e) => setFillCount(Number(e.target.value))}
              inputRef={fillCountRef}
              onKeyDown={handleKeyDownFillCount}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              disabled={index >= totalCells}
            >
              Lisää {fillCount} tarraa
            </Button>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{ flex: 1, mr: 1 }}
              >
                Tyhjennä
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => window.print()}
                sx={{ flex: 1, ml: 1 }}
              >
                Tulosta
              </Button>
            </Box>
          </Box>
            <Box
            className="grid-preview-container"
              sx={{
                p: 4,
                width: "210mm",
                height: "297mm",
                overflow: "hidden",
                border: "0.5px solid #cccccc",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",

                mt: { xs: 4, md: 0 },
                transformOrigin: "top center",
                transform: {
                    xs: "scale(0.4)",
                    sm: "scale(0.7)",
                    md: "scale(0.9)",
                    lg: "scale(1)",
                },
                transition: "transform 0.3s ease",

                "@media print": {
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "white",
                    }
              }}
            >

          <Box
          className="printable-grid"
            sx={{
                display: "grid",
                gridTemplateColumns: `repeat(8, 25mm)`,
                gridTemplateRows: `repeat(14, 20mm)`,
                columnGap: "0mm",
                rowGap: "0mm",
                backgroundColor: "white",
                justifyContent: "center",
                alignContent: "center",
            }}
          >
            {cells.map((cell, i) => (
              <Box
                key={i}
                className="grid-cell"
                sx={{
                  width: "25mm",
                  height: "20mm",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "pre-line",
                  backgroundColor: cell ? "#ba68c8" : "white",
                  transition: "background-color 0.9s",
                  border: "0.1px dashed rgba(0,0,0,0.2)",
                  "@media print": {
                      border: "none",
                      },
                }}
              >
                    <AnimatePresence>
                        {cell && (
                        <motion.div
                          key={cell + i}
                          initial={{ backgroundColor: "#ba68c8", scale: 0.9 }}
                          animate={{ backgroundColor: "#ffffff", scale: 1 }}
                          transition={{ duration: 0.8 }}
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {cell}
                        </motion.div>
                        )}
                    </AnimatePresence>
              </Box>
            ))}
          </Box>
         </Box>
        </Box>

    <style>
    {`
        @media print {
          @page {
            size: A4;
            margin: 8mm 5mm 8mm 5mm;
          }

          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            background: white !important;
            overflow: hidden !important;
          }

          body * {
            visibility: hidden !important;
          }

          .printable-grid,
          .printable-grid * {
            visibility: visible !important;
          }

          .printable-grid {
            position: absolute !important;
            top: 8mm !important;
            left: 5mm !important;
            display: grid !important;
            grid-template-columns: repeat(8, 25mm);
            grid-template-rows: repeat(14, 19.99mm);
            column-gap: 0;
            row-gap: 0;
            margin: 0;
            padding: 0;
            width: auto;
            height: auto;
            box-sizing: border-box;
            background: white !important;
            border: none !important;
            transform: none !important;
          }

          .grid-preview-container {
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .grid-cell {
            page-break-inside: avoid !important;
          }
        }
    `}
    </style>
    </>
  );
}

export default App
