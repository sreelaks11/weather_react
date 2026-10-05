import React, { useState } from "react";

function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");
      setWeather(null);
      setLoading(true);

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found. Please check the city name.");
      }

      const data = await response.json();

      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchWeather();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "70px 15px",
        background:
          "linear-gradient(135deg, #0f172a, #172554, #0369a1)",
        color: "#ffffff",
      }}
    >
      {/* Background Decorations */}

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "#38bdf8",
          opacity: 0.18,
          filter: "blur(10px)",
          top: "-100px",
          left: "-100px",
          animation: "floatOne 7s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "#60a5fa",
          opacity: 0.18,
          filter: "blur(10px)",
          right: "-80px",
          top: "35%",
          animation: "floatTwo 8s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "#22d3ee",
          opacity: 0.15,
          filter: "blur(10px)",
          bottom: "-80px",
          left: "30%",
          animation: "floatOne 9s ease-in-out infinite",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1100px",
        }}
      >
        {/* Header */}

        <div
          className="text-center"
          style={{
            marginBottom: "45px",
            animation: "fadeDown 0.8s ease",
          }}
        >
          <div
            style={{
              fontSize: "65px",
              marginBottom: "10px",
              animation: "iconFloat 3s ease-in-out infinite",
            }}
          >
            🌤️
          </div>

          <h1
            style={{
              fontSize: "clamp(38px, 7vw, 60px)",
              fontWeight: "800",
              marginBottom: "12px",
            }}
          >
            Weather{" "}
            <span style={{ color: "#38bdf8" }}>
              Explorer
            </span>
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "17px",
              margin: 0,
            }}
          >
            Discover the current weather conditions of any city
          </p>
        </div>

        {/* Search */}

        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "18px",
                transition: "0.3s",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  margin: "0 10px 0 15px",
                }}
              >
                🔍
              </span>

              <input
                type="text"
                placeholder="Search for a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#ffffff",
                  padding: "14px 5px",
                  fontSize: "16px",
                }}
              />

              <button
                onClick={searchWeather}
                style={{
                  border: "none",
                  background: "#38bdf8",
                  color: "#082f49",
                  fontWeight: "700",
                  padding: "13px 24px",
                  borderRadius: "13px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#7dd3fc";
                  e.target.style.transform = "scale(1.04)";
                  e.target.style.boxShadow =
                    "0 8px 20px rgba(56,189,248,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#38bdf8";
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Search
              </button>
            </div>

          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6">

              <div
                style={{
                  padding: "15px 20px",
                  borderRadius: "14px",
                  background: "rgba(239,68,68,0.15)",
                  border:
                    "1px solid rgba(248,113,113,0.5)",
                  color: "#fecaca",
                  textAlign: "center",
                  animation: "shake 0.4s ease",
                }}
              >
                ⚠️ {error}
              </div>

            </div>
          </div>
        )}

        {/* Loading */}

        {loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: "50px",
              color: "#cbd5e1",
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                margin: "auto",
                border: "4px solid rgba(255,255,255,0.2)",
                borderTop: "4px solid #38bdf8",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />

            <p style={{ marginTop: "15px" }}>
              Fetching weather...
            </p>
          </div>
        )}

        {/* Weather Result */}

        {weather && !loading && (
          <div className="row justify-content-center mt-5">

            <div className="col-12 col-md-10 col-lg-9">

              <div
                style={{
                  padding: "35px",
                  borderRadius: "25px",
                  background: "rgba(15,23,42,0.72)",
                  backdropFilter: "blur(20px)",
                  border:
                    "1px solid rgba(56,189,248,0.3)",
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.3)",
                  animation:
                    "cardAppear 0.7s ease",
                }}
              >

                {/* City */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>

                    <p
                      style={{
                        color: "#38bdf8",
                        fontSize: "12px",
                        letterSpacing: "2px",
                        fontWeight: "700",
                        marginBottom: "8px",
                      }}
                    >
                      CURRENT WEATHER
                    </p>

                    <h2
                      style={{
                        fontSize: "35px",
                        fontWeight: "700",
                        marginBottom: "3px",
                      }}
                    >
                      {weather.name}
                    </h2>

                    <p
                      style={{
                        color: "#94a3b8",
                        margin: 0,
                      }}
                    >
                      {weather.sys.country}
                    </p>

                  </div>

                  <div
                    style={{
                      fontSize: "70px",
                      animation:
                        "iconFloat 3s ease-in-out infinite",
                    }}
                  >
                    ☀️
                  </div>
                </div>

                {/* Temperature */}

                <div
                  style={{
                    textAlign: "center",
                    margin: "25px 0",
                  }}
                >

                  <h3
                    style={{
                      fontSize: "clamp(55px,10vw,85px)",
                      fontWeight: "800",
                      margin: 0,
                    }}
                  >
                    {Math.round(weather.main.temp)}
                    <span
                      style={{
                        color: "#38bdf8",
                        fontSize: "35px",
                      }}
                    >
                      °C
                    </span>
                  </h3>

                  <p
                    style={{
                      color: "#cbd5e1",
                      fontSize: "18px",
                      textTransform: "capitalize",
                      marginBottom: "10px",
                    }}
                  >
                    {weather.weather[0].description}
                  </p>

                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: "14px",
                    }}
                  >
                    Feels like{" "}
                    {Math.round(weather.main.feels_like)}°C
                  </div>

                </div>

                {/* Details */}

                <div className="row g-3">

                  {/* Humidity */}

                  <div className="col-6 col-md-3">

                    <div
                      style={{
                        padding: "20px 10px",
                        textAlign: "center",
                        background:
                          "rgba(30,41,59,0.7)",
                        border:
                          "1px solid rgba(148,163,184,0.15)",
                        borderRadius: "16px",
                        transition: "0.3s",
                        height: "100%",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-7px)";
                        e.currentTarget.style.borderColor =
                          "#38bdf8";
                        e.currentTarget.style.boxShadow =
                          "0 12px 25px rgba(56,189,248,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0)";
                        e.currentTarget.style.borderColor =
                          "rgba(148,163,184,0.15)";
                        e.currentTarget.style.boxShadow =
                          "none";
                      }}
                    >
                      <div style={{ fontSize: "28px" }}>
                        💧
                      </div>

                      <p
                        style={{
                          color: "#94a3b8",
                          fontSize: "13px",
                          marginBottom: "6px",
                        }}
                      >
                        Humidity
                      </p>

                      <h5 className="fw-bold">
                        {weather.main.humidity}%
                      </h5>
                    </div>

                  </div>

                  {/* Wind */}

                  <div className="col-6 col-md-3">

                    <div
                      style={{
                        padding: "20px 10px",
                        textAlign: "center",
                        background:
                          "rgba(30,41,59,0.7)",
                        border:
                          "1px solid rgba(148,163,184,0.15)",
                        borderRadius: "16px",
                        transition: "0.3s",
                        height: "100%",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-7px)";
                        e.currentTarget.style.borderColor =
                          "#38bdf8";
                        e.currentTarget.style.boxShadow =
                          "0 12px 25px rgba(56,189,248,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0)";
                        e.currentTarget.style.borderColor =
                          "rgba(148,163,184,0.15)";
                        e.currentTarget.style.boxShadow =
                          "none";
                      }}
                    >
                      <div style={{ fontSize: "28px" }}>
                        💨
                      </div>

                      <p
                        style={{
                          color: "#94a3b8",
                          fontSize: "13px",
                          marginBottom: "6px",
                        }}
                      >
                        Wind Speed
                      </p>

                      <h5 className="fw-bold">
                        {weather.wind.speed} m/s
                      </h5>
                    </div>

                  </div>

                  {/* Pressure */}

                  <div className="col-6 col-md-3">

                    <div
                      style={{
                        padding: "20px 10px",
                        textAlign: "center",
                        background:
                          "rgba(30,41,59,0.7)",
                        border:
                          "1px solid rgba(148,163,184,0.15)",
                        borderRadius: "16px",
                        transition: "0.3s",
                        height: "100%",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-7px)";
                        e.currentTarget.style.borderColor =
                          "#38bdf8";
                        e.currentTarget.style.boxShadow =
                          "0 12px 25px rgba(56,189,248,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0)";
                        e.currentTarget.style.borderColor =
                          "rgba(148,163,184,0.15)";
                        e.currentTarget.style.boxShadow =
                          "none";
                      }}
                    >
                      <div style={{ fontSize: "28px" }}>
                        🌡️
                      </div>

                      <p
                        style={{
                          color: "#94a3b8",
                          fontSize: "13px",
                          marginBottom: "6px",
                        }}
                      >
                        Pressure
                      </p>

                      <h5 className="fw-bold">
                        {weather.main.pressure} hPa
                      </h5>
                    </div>

                  </div>

                  {/* Min Max */}

                  <div className="col-6 col-md-3">

                    <div
                      style={{
                        padding: "20px 10px",
                        textAlign: "center",
                        background:
                          "rgba(30,41,59,0.7)",
                        border:
                          "1px solid rgba(148,163,184,0.15)",
                        borderRadius: "16px",
                        transition: "0.3s",
                        height: "100%",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-7px)";
                        e.currentTarget.style.borderColor =
                          "#38bdf8";
                        e.currentTarget.style.boxShadow =
                          "0 12px 25px rgba(56,189,248,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0)";
                        e.currentTarget.style.borderColor =
                          "rgba(148,163,184,0.15)";
                        e.currentTarget.style.boxShadow =
                          "none";
                      }}
                    >
                      <div style={{ fontSize: "28px" }}>
                        🌡️
                      </div>

                      <p
                        style={{
                          color: "#94a3b8",
                          fontSize: "13px",
                          marginBottom: "6px",
                        }}
                      >
                        Min / Max
                      </p>

                      <h5 className="fw-bold">
                        {Math.round(weather.main.temp_min)}°
                        {" / "}
                        {Math.round(weather.main.temp_max)}°
                      </h5>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* Welcome Message */}

        {!weather && !loading && !error && (

          <div
            style={{
              textAlign: "center",
              marginTop: "70px",
              color: "#cbd5e1",
              animation: "cardAppear 0.8s ease",
            }}
          >

            <div
              style={{
                fontSize: "60px",
                marginBottom: "15px",
              }}
            >
              🌎
            </div>

            <h3 className="fw-bold">
              Search for a city
            </h3>

            <p style={{ color: "#94a3b8" }}>
              Enter a city name above to see the latest
              weather information.
            </p>

          </div>
        )}

      </div>

      {/* Animations */}

      <style>
        {`
          @keyframes floatOne {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-30px);
            }
          }

          @keyframes floatTwo {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(35px);
            }
          }

          @keyframes iconFloat {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes fadeDown {
            from {
              opacity: 0;
              transform: translateY(-25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes cardAppear {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.97);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            50% { transform: translateX(8px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          input::placeholder {
            color: #cbd5e1;
          }

          @media (max-width: 576px) {
            .container {
              padding-left: 8px;
              padding-right: 8px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;
