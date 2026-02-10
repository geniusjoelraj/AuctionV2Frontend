'use client'

import { Player } from "@/types/api";
import StatDisplay from "@/components/StatDisplay";
import { domToPng } from "modern-screenshot";
import '../style.css'
import { useRef, useEffect, useState } from "react";
import { formatNumber } from "@/utils/bid";
import { Download } from "lucide-react";
import Image from "next/image";

const proxyUrl = (url: string) => `/api/image-proxy?url=${encodeURIComponent(url)}`;

export default function PlayerCard({ player, downloadable }: { player: Player | "EMPTY", downloadable: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const [nameFontSize, setNameFontSize] = useState(28);

  useEffect(() => {
    if (player === "EMPTY" || !nameRef.current) return;

    const fitTextToContainer = () => {
      const textElement = nameRef.current;
      if (!textElement) return;

      const parentWidth = textElement.parentElement?.offsetWidth || 0;
      const maxFontSize = 28;
      let fontSize = maxFontSize;

      textElement.style.fontSize = `${fontSize}px`;

      while (textElement.scrollWidth > parentWidth && fontSize > 8) {
        fontSize -= 0.5;
        textElement.style.fontSize = `${fontSize}px`;
      }

      setNameFontSize(fontSize);
    };

    fitTextToContainer();

    window.addEventListener('resize', fitTextToContainer);
    return () => window.removeEventListener('resize', fitTextToContainer);
  }, [player]);

  if (player === "EMPTY") {
    return (<>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="327.5"
        height="505"
        viewBox="0 0 131 202"
        fill="none"
      >
        <defs>
          <clipPath id="cardShape">
            <path d="M1 169.766V28.5C4.5 28.3333 14.1 25.6 24.5 16C34.9 6.40001 46.1667 4.33334 50.5 4.50001C52.5 8.16667 58.4 12.7 66 1.5C73.6 12.7 79 8.16667 81 4.50001C85.3333 4.33334 96.6 6.40001 107 16C117.4 25.6 127 28.3333 130.5 28.5V169.766C130.5 170.253 130.438 170.74 130.247 171.188C129.459 173.038 127.368 176.093 123.5 177.5C118 179.5 87 188.5 75.5 195L65 200.5L56 195C44.5 188.5 13.5 179.5 8 177.5C4.13204 176.093 2.04148 173.038 1.25279 171.188C1.062 170.74 1 170.253 1 169.766Z" />
          </clipPath>

          <linearGradient id="paint0_linear_1_8" x1="65.75" y1="1.5" x2="65.75" y2="200.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E5CE6E" />
            <stop offset="0.509578" stopColor="#B38123" />
            <stop offset="1" stopColor="#B47B11" />
          </linearGradient>
        </defs>

        <g clipPath="url(#cardShape)">
          <image
            href="/card-bg.png"
            x="-50%"
            y="70%"
            width="150%"
            height="100%"
            style={{ transformOrigin: 'center' }}
            transform="rotate(90, 65.5, 101)"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>

        <path
          d="M1 169.766V28.5C4.5 28.3333 14.1 25.6 24.5 16C34.9 6.40001 46.1667 4.33334 50.5 4.50001C52.5 8.16667 58.4 12.7 66 1.5C73.6 12.7 79 8.16667 81 4.50001C85.3333 4.33334 96.6 6.40001 107 16C117.4 25.6 127 28.3333 130.5 28.5V169.766C130.5 170.253 130.438 170.74 130.247 171.188C129.459 173.038 127.368 176.093 123.5 177.5C118 179.5 87 188.5 75.5 195L65 200.5L56 195C44.5 188.5 13.5 179.5 8 177.5C4.13204 176.093 2.04148 173.038 1.25279 171.188C1.062 170.74 1 170.253 1 169.766Z"
          stroke="url(#paint0_linear_1_8)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg></>)
  }

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await domToPng(cardRef.current, {
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `${player.name.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Download failed", error);
    }
  };
  return (
    <>
      <div style={{ position: "relative" }} ref={cardRef}>
        <img src="/ipl-logo-white.png" alt="ipl-logo" height={30} width={30} style={{ position: "absolute", marginLeft: "45%", marginTop: "25px" }} />
        {/* Card Container */}
        <div style={{
          height: "65%", width: "90%", position: "absolute", top: "17%", left: "5%", gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "repeat(10, 1fr)", display: "grid"
        }}>
          {/* left-info */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gridColumn: "span 2 / span 2", gridRow: "span 7 / span 7" }}>
            <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{player.id}</p>
            <p style={{ fontSize: "1.3rem", fontWeight: 550, marginTop: "-10px" }}>{player.type.slice(0, 3)}</p>
            <Image src={`/flags/${player.country}.jpg`} alt="flag" height={50} width={50} style={{ marginTop: "7px", marginBottom: "7px" }} />
            <p style={{ textAlign: "center", fontWeight: 550, lineHeight: "120%" }}>BASE <br /> PRICE</p>
            <p style={{ color: "#FFE2AA", fontSize: "1.5rem", fontWeight: 900 }}>{formatNumber(player.price)}</p>
          </div>
          {/* Image */}
          <Image style={{ gridColumn: "span 6 / span 6", gridRow: "span 7 / span 7", gridColumnStart: 3, gridRowStart: 1, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            height={100}
            width={100}
            src={'/players_images/' + player.name + '.png'}
            // src="https://res.cloudinary.com/dkpijdg6a/image/upload/v1770182396/unnamed-removebg-preview_1_cjvzgk.png"
            alt="player image" />
          {/* Stats */}
          <div style={{ gridColumn: "span 8 / span 8", gridRow: "span 3 / span 3", gridColumnStart: 1, gridRowStart: 8, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <p
              ref={nameRef}
              style={{
                fontSize: `${nameFontSize}px`,
                fontWeight: 800,
                marginTop: 0,
                whiteSpace: 'nowrap',
                width: '100%',
                textAlign: 'center',
              }}
              className="name"
            >{player.name.toUpperCase()}</p>
            <StatDisplay player={player} />
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="327.5"
          height="505"
          viewBox="0 0 131 202"
          fill="none"
        >
          <defs>
            <clipPath id="cardShape">
              <path d="M1 169.766V28.5C4.5 28.3333 14.1 25.6 24.5 16C34.9 6.40001 46.1667 4.33334 50.5 4.50001C52.5 8.16667 58.4 12.7 66 1.5C73.6 12.7 79 8.16667 81 4.50001C85.3333 4.33334 96.6 6.40001 107 16C117.4 25.6 127 28.3333 130.5 28.5V169.766C130.5 170.253 130.438 170.74 130.247 171.188C129.459 173.038 127.368 176.093 123.5 177.5C118 179.5 87 188.5 75.5 195L65 200.5L56 195C44.5 188.5 13.5 179.5 8 177.5C4.13204 176.093 2.04148 173.038 1.25279 171.188C1.062 170.74 1 170.253 1 169.766Z" />
            </clipPath>

            <linearGradient id="paint0_linear_1_8" x1="65.75" y1="1.5" x2="65.75" y2="200.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E5CE6E" />
              <stop offset="0.509578" stopColor="#B38123" />
              <stop offset="1" stopColor="#B47B11" />
            </linearGradient>
          </defs>

          <g clipPath="url(#cardShape)">
            <image
              href={player.isLegend ? "/card-bg-purple.png" : "/card-bg.png"}
              x="-50%"
              y="70%"
              width="150%"
              height="100%"
              style={{ transformOrigin: 'center' }}
              transform="rotate(90, 65.5, 101)"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>

          <path
            d="M1 169.766V28.5C4.5 28.3333 14.1 25.6 24.5 16C34.9 6.40001 46.1667 4.33334 50.5 4.50001C52.5 8.16667 58.4 12.7 66 1.5C73.6 12.7 79 8.16667 81 4.50001C85.3333 4.33334 96.6 6.40001 107 16C117.4 25.6 127 28.3333 130.5 28.5V169.766C130.5 170.253 130.438 170.74 130.247 171.188C129.459 173.038 127.368 176.093 123.5 177.5C118 179.5 87 188.5 75.5 195L65 200.5L56 195C44.5 188.5 13.5 179.5 8 177.5C4.13204 176.093 2.04148 173.038 1.25279 171.188C1.062 170.74 1 170.253 1 169.766Z"
            stroke="url(#paint0_linear_1_8)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {downloadable &&
          <button
            onClick={handleDownload}
            style={{ marginTop: '10px', color: 'white', padding: '10px', position: 'absolute', textAlign: 'center', fontSize: '1.5rem', background: '', fontFamily: 'monospace', display: 'flex', gap: '10px', border: 'solid #0B2782 2px', borderRadius: '10px', right: '20%', backgroundColor: '#0B2782' }}>
            Download<Download size={30} style={{ display: 'inline' }} />
          </button>
        }
      </div>
    </>
  );
}
