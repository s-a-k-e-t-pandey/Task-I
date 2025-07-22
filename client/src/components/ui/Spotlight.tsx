import { cn } from "../../lib/utils"

type SpotlightProps = {
  className?: string
  fill?: string
  direction?: "left" | "right"
}

export const Spotlight = ({ className, fill, direction = "left" }: SpotlightProps) => {
  const positionClass = direction === "left" ? "left-0 top-0" : "right-0 top-0"
  const animationClass = direction === "left" ? "animate-spotlightLeft" : "animate-spotlightRight"

  // Different transform matrices for left and right spotlights
  const transformMatrix =
    direction === "left"
      ? "matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
      : "matrix(0.822377 -0.568943 0.568943 0.822377 -1000 2291.09)"

  return (
    <svg
      className={cn(
        "pointer-events-none absolute z-[1] h-[200%] w-[200%] opacity-0 mix-blend-screen",
        positionClass,
        animationClass,
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      style={{ filter: "blur(0px)", backgroundColor: "transparent" }}
    >
      {/* Outermost soft glow - very spread out */}
      <g filter={`url(#outerGlow-${direction})`}>
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="3000"
          ry="500"
          transform={transformMatrix}
          fill={fill || "white"}
          fillOpacity="0.25"
        />
      </g>

      {/* Wide spread light */}
      <g filter={`url(#wideSpread-${direction})`}>
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="2200"
          ry="380"
          transform={transformMatrix}
          fill={fill || "white"}
          fillOpacity="0.25"
        />
      </g>

      {/* Main light beam */}
      <g filter={`url(#mainBeam-${direction})`}>
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1600"
          ry="280"
          transform={transformMatrix}
          fill={fill || "white"}
          fillOpacity="0.25"
        />
      </g>

      {/* Inner bright beam */}
      <g filter={`url(#innerBeam-${direction})`}>
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1000"
          ry="180"
          transform={transformMatrix}
          fill={fill || "white"}
          fillOpacity="0.25"
        />
      </g>

      {/* Core bright center */}
      <g filter={`url(#coreBeam-${direction})`}>
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="600"
          ry="100"
          transform={transformMatrix}
          fill={fill || "white"}
          fillOpacity="0.25"
        />
      </g>

      <defs>
        {/* Outermost glow - maximum spread */}
        <filter
          id={`outerGlow-${direction}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="300" result="outerBlur" />
          <feColorMatrix in="outerBlur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>

        {/* Wide spread */}
        <filter
          id={`wideSpread-${direction}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="200" result="wideBlur" />
          <feColorMatrix in="wideBlur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>

        {/* Main beam */}
        <filter
          id={`mainBeam-${direction}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="120" result="mainBlur" />
          <feColorMatrix in="mainBlur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>

        {/* Inner beam */}
        <filter
          id={`innerBeam-${direction}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="80" result="innerBlur" />
          <feColorMatrix in="innerBlur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>

        {/* Core beam */}
        <filter
          id={`coreBeam-${direction}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="40" result="coreBlur" />
          <feColorMatrix in="coreBlur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
      </defs>
    </svg>
  )
}
