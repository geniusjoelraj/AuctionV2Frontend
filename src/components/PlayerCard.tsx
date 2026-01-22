import { Player } from "@/types/api";
import StatDisplay from "@/components/StatDisplay";
import '../style.css'

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div style={{ position: "relative" }}>
      <img src="/ipl-logo-white.png" alt="ipl-logo" height={30} width={30} style={{ position: "absolute", marginLeft: "45%", marginTop: "25px" }} />
      {/* <div className="rect-1"> */}
      {/* </div> */}
      {/* Card Container */}
      <div style={{
        height: "65%", width: "90%", position: "absolute", top: "17%", left: "5%", gridTemplateColumns: "repeat(8, 1fr)",
        gridTemplateRows: "repeat(10, 1fr)", display: "grid"
      }}>
        {/* left-info */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gridColumn: "span 2 / span 2", gridRow: "span 7 / span 7" }}>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{player.id}</p>
          <p style={{ fontSize: "1.3rem", fontWeight: 550, marginTop: "-10px" }}>{player.type.slice(0, 3)}</p>
          <img src="https://flagsapi.com/IN/flat/64.png" alt="flag" width={50} style={{ marginTop: "7px", marginBottom: "7px" }} />
          <p style={{ textAlign: "center", fontWeight: 550, lineHeight: "120%" }}>BASE <br /> PRICE</p>
          <p style={{ color: "#FFE2AA", fontSize: "1.5rem", fontWeight: 900 }}>{player.price}L</p>
        </div>
        {/* Image */}
        <img style={{ gridColumn: "span 6 / span 6", gridRow: "span 7 / span 7", gridColumnStart: 3, gridRowStart: 1, scale: "110%" }} src="https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/playerimages/Surya%20Kumar%20Yadav.png" alt="player image" />
        {/* Stats */}
        <div style={{ gridColumn: "span 8 / span 8", gridRow: "span 3 / span 3", gridColumnStart: 1, gridRowStart: 8, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <p style={{
            fontSize: "1.7vw",
            fontWeight: 800,
            // background: "linear-gradient(0deg, #B38123 0 %, #E5CE6E 43.27 %)",
            // backgroundClip: "text",
            // WebkitBackgroundClip: "text",
            // WebkitTextFillColor: "transparent",
            // border: "0.2px solid #B47B11",
            // textShadow: "0px 2px 9.9px rgba(0, 0, 0, 0.73)"
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
            href="/card-bg.jpg"
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
    </div>
  );
}
