// components/Navbar.tsx
import Link from "next/link";

export type NavbarProps = {
  buttonText: string;
  buttonColor: string;
  buttonLink: string;
  logoType: "text" | "image";
  logoText?: string;
  logoImage?: string; // URL to the image
};

export default function Navbar({
  buttonText,
  buttonColor,
  buttonLink,
  logoType,
  logoText,
  logoImage,
}: NavbarProps) {
  return (
    <nav
      style={{
        width: "1320px",
        height: "68px",
        borderRadius: "20px",
        background: "#FFFFFF",
        margin: "12px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div>☰ Menu</div>

      <div>
        {logoType === "text" ? (
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>{logoText || "My Logo"}</span>
        ) : (
          logoImage && (
            <img src={logoImage} alt="Logo" style={{ height: "40px", objectFit: "contain" }} />
          )
        )}
      </div>

      <Link href={buttonLink || "#"}>
        <a
          style={{
            padding: "8px 16px",
            backgroundColor: buttonColor || "#000",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          {buttonText || "Contact Us"}
        </a>
      </Link>
    </nav>
  );
}
