import { useState, useEffect, useRef, useCallback } from "react";

const USERNAMES = [
  "sarah_xo", "jake.runs", "nomad.nina", "dev_dude99", "itsmelily",
  "bigmood_ben", "wanderlust.k", "chloe.creates", "rxn_king", "pixel.pete",
  "vibe.queen", "notjosh_", "amira.arts", "chad_lifts", "sunflower.sam",
  "techie.tara", "mood.mason", "luna_wave", "grind.guru", "ella.esque",
  "frankie.fps", "daisychain", "raw.ricky", "zen.zara", "blitz.boy",
  "mochi.mel", "neon.nate", "ivy.online", "slay.soph", "drift.dan",
  "kira.kodes", "vince.vlog", "poppy.png", "realryan_", "jo.journey",
  "maxed.mia", "clip.carlo", "breezy.bri", "hype.hank", "lana.live",
  "core.cam", "tiff.talks", "rogue.ray", "aria.aura", "blaze.beau",
];

const COMMENTS = [
  "omg hiiii 😍", "you're so handsome", "the smile tho 😭",
  "hiii from brazil 🇧🇷", "how are you so perfect??", "can you say hi to meee",
  "you look amazing!", "I've been waiting all day", "the confidence is so attractive",
  "drop the skincare routine 😩", "ur literally my fav", "the jawline is unfair",
  "I literally can't 💀", "obsessed", "your voice is everything",
  "main character energy", "the fit check tho 🔥", "you always make my day better",
  "say my name please 🥺", "hii from germany 🇩🇪", "no because actually iconic",
  "that haircut is working fr", "why are you so fine", "the way you just smiled 😮",
  "can we be friends?? 😭", "living for this", "you're glowing fr",
  "tell us a secret 👀", "what cologne do you wear?", "😍😍😍",
  "the glow up is insane", "go live more often please",
  "YOOO he is live 🔥", "W stream already", "bro finally went live",
  "first time catching you live", "KING 👑", "real ones got the notif",
  "someone clip that", "bro is locked in", "teach us the sauce",
  "absolute legend", "drop the playlist", "nah this is peak",
  "W man W stream", "chat behave 😂", "bro has aura",
  "this man is inspirational",
];

/* ─── Heart particle rising on the right ─── */
function FloatingHeart({ id, startY, onDone }) {
  const size = 28 + Math.random() * 16;
  const drift = -8 + Math.random() * 16;
  const duration = 2.8 + Math.random() * 1.8;
  const delay = Math.random() * 0.1;
  const startOpacity = 0.35 + Math.random() * 0.65;

  useEffect(() => {
    const t = setTimeout(() => onDone(id), (duration + delay) * 1000);
    return () => clearTimeout(t);
  }, []);

  const animName = `heart_${id}`;

  return (
    <>
      <style>{`
        @keyframes ${animName} {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: ${startOpacity}; }
          30%  { opacity: ${startOpacity}; }
          60%  { transform: translateY(-200px) translateX(${drift}px) scale(0.95); opacity: ${startOpacity * 0.6}; }
          100% { transform: translateY(-380px) translateX(${drift * 1.5}px) scale(0.6); opacity: 0; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          bottom: startY || 0,
          right: 4 + Math.random() * 24,
          animation: `${animName} ${duration}s ${delay}s ease-out forwards`,
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <svg width={size} height={size} viewBox="0 0 24 22" fill="none">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="rgba(255,255,255,0.85)"
          />
        </svg>
      </div>
    </>
  );
}

/* ─── Single comment row (IG style: circle avatar + bold username + text) ─── */
function CommentRow({ username, text, isNew }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "5px 0",
        animation: isNew ? "commentSlide 0.3s ease-out" : "none",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `hsl(${(username.charCodeAt(0) * 47 + username.charCodeAt(1) * 31) % 360}, 20%, 75%)`,
          flexShrink: 0,
        }}
      />
      <div style={{ paddingTop: 2, minWidth: 0 }}>
        <span
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: "#fff",
            marginRight: 6,
            fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
          }}
        >
          {username}
        </span>
        <span
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.9)",
            fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
            lineHeight: 1.4,
            wordBreak: "break-word",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

/* ─── Eye icon SVG ─── */
function EyeIcon() {
  return (
    <svg width="18" height="13" viewBox="0 0 26 19" fill="none" style={{ marginRight: 5, marginTop: 1 }}>
      <path
        d="M13 0C7.1 0 2.1 3.6 0 8.5 2.1 13.4 7.1 17 13 17s10.9-3.6 13-8.5C23.9 3.6 18.9 0 13 0zm0 14.2c-3.1 0-5.7-2.6-5.7-5.7S9.9 2.8 13 2.8s5.7 2.6 5.7 5.7-2.6 5.7-5.7 5.7zm0-9.1c-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4 3.4-1.5 3.4-3.4S14.9 5.1 13 5.1z"
        fill="white"
      />
    </svg>
  );
}

/* ═══════════ MAIN APP ═══════════ */
export default function InstagramLiveSimulator() {
  const videoRef = useRef(null);
  const commentsEndRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");
  const [hearts, setHearts] = useState([]);
  const [comments, setComments] = useState([]);
  const [viewerCount, setViewerCount] = useState(0);
  const [targetViewers, setTargetViewers] = useState(104847);
  const [creatorUsername, setCreatorUsername] = useState("your_stream");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [viewerTargetInput, setViewerTargetInput] = useState("104847");
  const [isLive, setIsLive] = useState(false);
  const [liveTime, setLiveTime] = useState(0);
  const heartIdRef = useRef(0);
  const streamRef = useRef(null);

  const startCamera = useCallback(async (facing) => {
    try {
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1080 }, height: { ideal: 1920 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.log("Camera unavailable:", err);
    }
  }, []);

  const toggleCamera = useCallback(() => {
    const next = facingMode === "user" ? "environment" : "user";
    setFacingMode(next);
    if (isLive) startCamera(next);
  }, [facingMode, isLive, startCamera]);

  const goLive = useCallback(() => {
    const requestedTarget = Number.parseInt(viewerTargetInput.replace(/,/g, ""), 10);
    const nextTarget = Number.isFinite(requestedTarget) ? Math.max(1, requestedTarget) : 104847;
    startCamera(facingMode);
    setIsLive(true);
    setLiveTime(0);
    setViewerCount(0);
    setTargetViewers(nextTarget);
    setComments([]);
    setHearts([]);
  }, [facingMode, startCamera, viewerTargetInput]);

  const handleProfilePhotoChange = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfilePhoto(String(reader.result || ""));
    reader.readAsDataURL(file);
  }, []);

  const endLive = useCallback(() => {
    setIsLive(false);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
  }, []);

  // Live timer
  useEffect(() => {
    if (!isLive) return;
    const i = setInterval(() => setLiveTime((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, [isLive]);

  // Viewer count growth
  useEffect(() => {
    if (!isLive) return;
    const i = setInterval(() => {
      setViewerCount((v) => {
        if (v < targetViewers) return Math.min(v + Math.floor(Math.random() * 18) + 2, targetViewers);
        return Math.max(200, v + Math.floor(Math.random() * 50) - 22);
      });
    }, 350);
    return () => clearInterval(i);
  }, [isLive, targetViewers]);

  // Auto comments
  useEffect(() => {
    if (!isLive) return;
    let alive = true;
    const spawnComment = () => {
      if (!alive) return;
      const username = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
      const text = COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
      setComments((prev) => [...prev.slice(-20), { id: Date.now() + Math.random(), username, text, isNew: true }]);
      setTimeout(spawnComment, 800 + Math.random() * 2200);
    };
    const t = setTimeout(spawnComment, 1200);
    return () => { alive = false; clearTimeout(t); };
  }, [isLive]);

  // Auto hearts from fans
  useEffect(() => {
    if (!isLive) return;
    const i = setInterval(() => {
      if (Math.random() < 0.55) {
        const id = heartIdRef.current++;
        setHearts((h) => [...h, { id, startY: Math.random() * 20 }]);
      }
    }, 500);
    return () => clearInterval(i);
  }, [isLive]);

  // Scroll comments
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const removeHeart = useCallback((id) => setHearts((h) => h.filter((x) => x.id !== id)), []);

  const handleTap = useCallback(() => {
    for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
      const id = heartIdRef.current++;
      setTimeout(() => setHearts((h) => [...h, { id, startY: Math.random() * 10 }]), i * 60);
    }
  }, []);

  const formatViewers = (n) => n >= 1000 ? n.toLocaleString() : String(n);

  /* ═══ PRE-LIVE SCREEN ═══ */
  if (!isLive) {
    return (
      <div style={{
        width: "100%", height: "100vh",
        background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: 260, height: 260, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.06)", top: "25%", left: "50%",
          transform: "translate(-50%, -50%)", animation: "ringPulse 3s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 360, height: 360, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.03)", top: "25%", left: "50%",
          transform: "translate(-50%, -50%)", animation: "ringPulse 3s 0.5s ease-in-out infinite",
        }} />

        {/* Profile photo (tap to upload) */}
        <label style={{ cursor: "pointer", marginBottom: 20, position: "relative" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePhotoChange}
            style={{ display: "none" }}
          />
          <div style={{
            width: 96, height: 96, borderRadius: "50%",
            background: "linear-gradient(135deg, #C13584 0%, #E1306C 50%, #F77737 100%)",
            padding: 3, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 40px rgba(225,48,108,0.35)",
          }}>
            <div style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: profilePhoto ? `url(${profilePhoto}) center/cover` : "#333",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}>
              {!profilePhoto && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              )}
            </div>
          </div>
          <div style={{
            position: "absolute", bottom: 0, right: 0,
            width: 28, height: 28, borderRadius: "50%",
            background: "#3897F0", border: "2px solid #16213e",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </div>
        </label>

        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, margin: "0 0 20px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
          Tap photo to upload
        </p>

        {/* Username input */}
        <input
          type="text"
          value={creatorUsername}
          onChange={(e) => setCreatorUsername(e.target.value)}
          placeholder="your_username"
          style={{
            width: 220, padding: "10px 16px", borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)",
            color: "#fff", fontSize: 15, fontWeight: 600, textAlign: "center",
            fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
            outline: "none", marginBottom: 10,
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(225,48,108,0.5)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
        />

        {/* Viewer target input */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
          <EyeIcon />
          <input
            type="text"
            value={viewerTargetInput}
            onChange={(e) => setViewerTargetInput(e.target.value)}
            placeholder="104847"
            style={{
              width: 110, padding: "8px 12px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)",
              color: "#fff", fontSize: 14, fontWeight: 600, textAlign: "center",
              fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
              outline: "none",
            }}
          />
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>viewers</span>
        </div>

        <button
          onClick={goLive}
          style={{
            padding: "14px 52px", borderRadius: 8, border: "none",
            background: "linear-gradient(90deg, #C13584, #E1306C, #F77737)",
            color: "#fff", fontSize: 15, fontWeight: 700,
            fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
            cursor: "pointer", boxShadow: "0 4px 20px rgba(225,48,108,0.4)",
            letterSpacing: "0.5px", transition: "transform 0.15s",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Start Live Video
        </button>

        <style>{`
          @keyframes ringPulse {
            0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
            50% { transform: translate(-50%,-50%) scale(1.08); opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  /* ═══ LIVE STREAM SCREEN ═══ */
  return (
    <div
      style={{
        width: "100%", height: "100vh", background: "#000",
        position: "relative", overflow: "hidden",
        fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
        touchAction: "manipulation", userSelect: "none",
      }}
      onClick={handleTap}
    >
      <video
        ref={videoRef} autoPlay playsInline muted
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: facingMode === "user" ? "scaleX(-1)" : "none",
        }}
      />

      {/* Top shade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 160,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, transparent 100%)",
        zIndex: 10, pointerEvents: "none",
      }} />

      {/* Bottom shade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 400,
        background: "linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 100%)",
        zIndex: 10, pointerEvents: "none",
      }} />

      {/* ════ TOP BAR ════ */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
        padding: "48px 16px 0", display: "flex", alignItems: "center",
      }}>
        {/* Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
            padding: 2.5, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: profilePhoto ? `url(${profilePhoto}) center/cover` : "#333",
              display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            }}>
              {!profilePhoto && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              )}
            </div>
          </div>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 600, letterSpacing: "-0.2px" }}>
            {creatorUsername}
          </span>
        </div>

        {/* LIVE */}
        <div style={{ background: "#3897F0", borderRadius: 6, padding: "8px 16px", marginRight: 8 }}>
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, letterSpacing: "1px" }}>LIVE</span>
        </div>

        {/* Viewer count */}
        <div style={{
          display: "flex", alignItems: "center",
          background: "rgba(255,255,255,0.25)", borderRadius: 6, padding: "8px 14px", marginRight: 8,
        }}>
          <EyeIcon />
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, letterSpacing: "0.3px" }}>
            {formatViewers(viewerCount)}
          </span>
        </div>

        {/* Close */}
        <button
          onClick={(e) => { e.stopPropagation(); endLive(); }}
          style={{
            width: 36, height: 36, border: "none", background: "transparent",
            color: "#fff", fontSize: 26, cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", padding: 0,
            fontWeight: 200, fontFamily: "-apple-system, sans-serif",
          }}
        >✕</button>
      </div>

      {/* ════ HEARTS COLUMN ════ */}
      <div style={{
        position: "absolute", right: 8, bottom: 120,
        width: 70, height: 400, zIndex: 30, pointerEvents: "none",
      }}>
        {hearts.map((h) => (
          <FloatingHeart key={h.id} id={h.id} startY={h.startY} onDone={removeHeart} />
        ))}
      </div>

      {/* ════ COMMENTS ════ */}
      <div
        style={{
          position: "absolute", bottom: 72, left: 16, right: 90,
          maxHeight: 290, overflowY: "auto", zIndex: 20,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {comments.map((c) => (
          <CommentRow key={c.id} username={c.username} text={c.text} isNew={c.isNew} />
        ))}
        <div ref={commentsEndRef} />
      </div>

      {/* ════ BOTTOM BAR ════ */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
          padding: "10px 16px 28px", display: "flex", alignItems: "center", gap: 12,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          flex: 1, height: 40, borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.35)",
          display: "flex", alignItems: "center", padding: "0 16px",
        }}>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "-apple-system, 'Helvetica Neue', sans-serif" }}>
            Comment
          </span>
        </div>

        <div style={{ display: "flex", gap: 4, padding: "0 4px" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
        </div>

        <div
          style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); handleTap(); }}
        >
          <svg width="28" height="25" viewBox="0 0 24 22" fill="none">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="rgba(255,255,255,0.85)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>

      {/* Flip camera */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleCamera(); }}
        style={{
          position: "absolute", top: 100, right: 16, zIndex: 20,
          width: 36, height: 36, borderRadius: "50%",
          background: "rgba(0,0,0,0.3)", border: "none",
          color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5V13H9v2.5L5.5 12 9 8.5V11h6V8.5l3.5 3.5-3.5 3.5z"/>
        </svg>
      </button>

      <style>{`
        @keyframes commentSlide {
          from { transform: translateY(12px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        div::-webkit-scrollbar { display: none; }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
