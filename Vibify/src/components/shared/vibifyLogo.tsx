interface VibifyLogoProps extends React.SVGProps<SVGSVGElement> {
    width: string,
    height: string
}

export default function VibifyLogo({ width = "120", height = "120", ...props }: VibifyLogoProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect
                x="32"
                y="50"
                width="10"
                height="20"
                rx="5"
                fill="oklch(0.58 0.25 288.25)"
                className="origin-bottom animate-pulse"
            />
            <rect
                x="50"
                y="40"
                width="10"
                height="40"
                rx="5"
                fill="oklab(0.7 0.27 -0.17)"
                className="origin-bottom animate-pulse delay-75"
            />
            <rect
                x="68"
                y="55"
                width="10"
                height="15"
                rx="5"
                fill="oklch(0.58 0.25 288.25)"
                className="origin-bottom animate-pulse delay-100"
            />
            <rect
                x="86"
                y="45"
                width="10"
                height="30"
                rx="5"
                fill="oklch(0.967 0.001 286.375)"
                className="origin-bottom animate-pulse delay-150"
            />
            <circle cx="60" cy="60" r="48" stroke="oklch(0.985 0 0)" strokeWidth="2" opacity="0.08" />
        </svg>
    )
}
