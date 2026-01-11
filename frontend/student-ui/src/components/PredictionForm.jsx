import { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Chip
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function PredictionForm() {
  const [math, setMath] = useState("");
  const [reading, setReading] = useState("");
  const [writing, setWriting] = useState("");

  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        math_score: Number(math),
        reading_score: Number(reading),
        writing_score: Number(writing)
      });

      setResult(res.data.prediction);
      setConfidence(res.data.confidence);
    } catch (err) {
      alert("Backend not responding");
    }
    setLoading(false);
  };

  const chartData = [
    { subject: "Math", score: Number(math) },
    { subject: "Reading", score: Number(reading) },
    { subject: "Writing", score: Number(writing) }
  ];

  return (
    <>
      {/* DARK AURORA BACKGROUND */}
      <div className="background">
        <span></span>
      </div>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 1100,
            borderRadius: 4,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              fontWeight="700"
              textAlign="center"
              mb={4}
            >
              🎓 Student Performance Predictor
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 4
              }}
            >
              {/* LEFT SIDE - FORM */}
              <Box>
                <Typography variant="h6" mb={2}>
                  Enter Student Scores
                </Typography>

                <TextField
                  fullWidth
                  label="Math Score"
                  type="number"
                  value={math}
                  onChange={(e) => setMath(e.target.value)}
                  margin="normal"
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                />

                <TextField
                  fullWidth
                  label="Reading Score"
                  type="number"
                  value={reading}
                  onChange={(e) => setReading(e.target.value)}
                  margin="normal"
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                />

                <TextField
                  fullWidth
                  label="Writing Score"
                  type="number"
                  value={writing}
                  onChange={(e) => setWriting(e.target.value)}
                  margin="normal"
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                />

                <Button
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg,#38bdf8,#a78bfa)"
                  }}
                  onClick={handlePredict}
                  disabled={loading}
                >
                  {loading ? "Predicting..." : "Predict Performance"}
                </Button>
              </Box>

              {/* RIGHT SIDE - RESULT + GRAPH */}
              <Box>
                <Typography variant="h6" mb={2}>
                  Analysis & Prediction
                </Typography>

                {result && (
                  <>
                    <Chip
                      label={`Result: ${result}`}
                      color={result === "Pass" ? "success" : "error"}
                      sx={{ mb: 2, fontWeight: 600 }}
                    />

                    <Typography variant="body2" mb={1}>
                      Confidence Level
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={confidence}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        mb: 3
                      }}
                    />

                    <Typography variant="body2" mb={2}>
                      Model confidence indicates probability of passing
                      based on historical student performance.
                    </Typography>
                  </>
                )}  

                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                   <defs>
  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#38bdf8" />
    <stop offset="100%" stopColor="#a78bfa" />
  </linearGradient>
</defs>

                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                 <Bar
  dataKey="score"
  fill="url(#scoreGradient)"
  radius={[6, 6, 0, 0]}
/>



                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
