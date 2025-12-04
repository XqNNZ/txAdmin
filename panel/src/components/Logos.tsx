import React from "react";

type LogoProps = {
    /** Optional override to fine-tune per use without changing code */
    boxHeight?: string; // e.g. "96px" or "12vh"
    boxWidth?: string;  // optional; defaults to auto
    className?: string;
    style?: React.CSSProperties;
};

const imgUrl = "https://bhrp.nz/assets/server/tx-banner.png";

/**
 * Generic balanced logo box that preserves aspect ratio and never squashes.
 * The <img> stretches to the box (contain), centered with no distortion.
 */
function BalancedLogo({
    boxHeight,
    boxWidth,
    className,
    style,
    alt,
    }: LogoProps & { alt: string }) {
    return (
        <div
        className={className}
        style={{
            // Responsive “balanced” height with an easy override
            height: boxHeight ?? "clamp(72px, 10vh, 128px)",
            // Width can be constrained if you like; by default it sizes to content
            width: boxWidth, // undefined = auto
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            // Prevent layout shift and keep things tidy
            lineHeight: 0,
            ...style,
        }}
        >
        <img
            src={imgUrl}
            alt={alt}
            // Keep native aspect ratio, never squashed
            style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
            display: "block",
            }}
            // In case the GIF header takes a sec, avoid layout jank
            loading="eager"
            decoding="async"
        />
        </div>
    );
}

/**
 * The three exports use different default box heights to balance visual weight:
 * - Thin (bannerish) gets a touch more height.
 * - Square variants slightly smaller so all three feel even in a row.
 * You can still override per instance with the boxHeight prop.
 */

export function LogoFullSolidThin(props: LogoProps) {
    return (
        <BalancedLogo
        alt="Logo Full Solid Thin"
        boxHeight={props.boxHeight ?? "clamp(88px, 11vh, 136px)"}
        {...props}
        />
    );
}

export function LogoFullSquareGreen(props: LogoProps) {
    return (
        <BalancedLogo
        alt="Logo Full Square Green"
        boxHeight={props.boxHeight ?? "clamp(76px, 9.5vh, 120px)"}
        {...props}
        />
    );
}

export function LogoSquareGreen(props: LogoProps) {
    return (
        <BalancedLogo
        alt="Logo Square Green"
        boxHeight={props.boxHeight ?? "clamp(76px, 9.5vh, 120px)"}
        {...props}
        />
    );
}
