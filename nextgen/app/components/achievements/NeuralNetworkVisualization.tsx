"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { useInView } from "framer-motion";
import type { MemberInput, MemberOutput } from "./achievementsData";

interface NeuralNetworkVisualizationProps {
  memberName: string;
  inputs: MemberInput[];
  outputs: MemberOutput[];
  onHoverCategories: (categories: string[]) => void;
}

// Layout constants
const SVG_WIDTH = 520;
const SVG_HEIGHT = 480;
const INPUT_X = 60;
const HIDDEN_X = SVG_WIDTH / 2;
const OUTPUT_X = SVG_WIDTH - 60;
const NODE_RADIUS = 20;
const HIDDEN_RADIUS = 30;
const LABEL_FONT_SIZE = 9;

function getNodeY(index: number, total: number, height: number): number {
  const padding = 50;
  const usable = height - padding * 2;
  if (total === 1) return height / 2;
  return padding + (usable / (total - 1)) * index;
}

function NeuralNetworkVisualizationInner({
  memberName,
  inputs,
  outputs,
  onHoverCategories,
}: NeuralNetworkVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [animationPhase, setAnimationPhase] = useState(0);
  const [hoveredInputId, setHoveredInputId] = useState<string | null>(null);
  const animStarted = useRef(false);

  // Trigger sequential animation when card enters viewport
  useEffect(() => {
    if (!isInView || animStarted.current) return;
    animStarted.current = true;

    // Phase 1: Input nodes appear
    setAnimationPhase(1);

    // Phase 2: Connections illuminate
    const t2 = setTimeout(() => setAnimationPhase(2), 400);

    // Phase 3: Center node glows
    const t3 = setTimeout(() => setAnimationPhase(3), 900);

    // Phase 4: Output nodes activate
    const t4 = setTimeout(() => setAnimationPhase(4), 1300);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isInView]);

  const handleInputHover = useCallback(
    (input: MemberInput | null) => {
      if (input) {
        setHoveredInputId(input.id);
        onHoverCategories(input.categories);
      } else {
        setHoveredInputId(null);
        onHoverCategories([]);
      }
    },
    [onHoverCategories]
  );

  // Precompute positions
  const inputPositions = inputs.map((_, i) => ({
    x: INPUT_X,
    y: getNodeY(i, inputs.length, SVG_HEIGHT),
  }));

  const outputPositions = outputs.map((_, i) => ({
    x: OUTPUT_X,
    y: getNodeY(i, outputs.length, SVG_HEIGHT),
  }));

  const hiddenPos = { x: HIDDEN_X, y: SVG_HEIGHT / 2 };

  // Determine which outputs are highlighted by the hovered input
  const hoveredInput = inputs.find((inp) => inp.id === hoveredInputId);
  const highlightedOutputIds = hoveredInput
    ? outputs
        .filter((out) =>
          out.categories.some((c) => hoveredInput.categories.includes(c))
        )
        .map((out) => out.id)
    : [];

  const hasHover = hoveredInputId !== null;

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] md:min-h-[480px]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filter for nodes */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for center node */}
          <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse gradient for connection animation */}
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4DBC1B" stopOpacity="0" />
            <stop offset="40%" stopColor="#4DBC1B" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#4DBC1B" stopOpacity="1" />
            <stop offset="100%" stopColor="#4DBC1B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Connection Lines: Input → Hidden ── */}
        {inputs.map((input, i) => {
          const start = inputPositions[i];
          const isThisHovered = hoveredInputId === input.id;
          const lineOpacity =
            animationPhase >= 2
              ? hasHover
                ? isThisHovered
                  ? 0.7
                  : 0.08
                : 0.2
              : 0;

          return (
            <g key={`conn-in-${input.id}`}>
              <line
                x1={start.x}
                y1={start.y}
                x2={hiddenPos.x}
                y2={hiddenPos.y}
                stroke="#4DBC1B"
                strokeWidth={isThisHovered ? 2 : 1}
                strokeOpacity={lineOpacity}
                className="transition-all duration-300"
              />
              {/* Animated pulse along connection */}
              {animationPhase >= 2 && animationPhase < 4 && (
                <circle r="3" fill="#4DBC1B" opacity="0.8">
                  <animateMotion
                    dur={`${0.8 + i * 0.15}s`}
                    begin={`${i * 0.1}s`}
                    repeatCount="1"
                    fill="freeze"
                  >
                    <mpath>
                      <path
                        d={`M${start.x},${start.y} L${hiddenPos.x},${hiddenPos.y}`}
                      />
                    </mpath>
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    dur={`${0.8 + i * 0.15}s`}
                    begin={`${i * 0.1}s`}
                    repeatCount="1"
                    fill="freeze"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* ── Connection Lines: Hidden → Output ── */}
        {outputs.map((output, i) => {
          const end = outputPositions[i];
          const isHighlighted = highlightedOutputIds.includes(output.id);
          const lineOpacity =
            animationPhase >= 3
              ? hasHover
                ? isHighlighted
                  ? 0.7
                  : 0.08
                : 0.2
              : 0;

          return (
            <g key={`conn-out-${output.id}`}>
              <line
                x1={hiddenPos.x}
                y1={hiddenPos.y}
                x2={end.x}
                y2={end.y}
                stroke="#4DBC1B"
                strokeWidth={isHighlighted ? 2 : 1}
                strokeOpacity={lineOpacity}
                className="transition-all duration-300"
              />
              {/* Animated pulse along connection */}
              {animationPhase >= 3 && animationPhase < 4 && (
                <circle r="3" fill="#4DBC1B" opacity="0.8">
                  <animateMotion
                    dur={`${0.6 + i * 0.12}s`}
                    begin={`${0.1 + i * 0.08}s`}
                    repeatCount="1"
                    fill="freeze"
                  >
                    <mpath>
                      <path
                        d={`M${hiddenPos.x},${hiddenPos.y} L${end.x},${end.y}`}
                      />
                    </mpath>
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    dur={`${0.6 + i * 0.12}s`}
                    begin={`${0.1 + i * 0.08}s`}
                    repeatCount="1"
                    fill="freeze"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* ── Input Nodes ── */}
        {inputs.map((input, i) => {
          const pos = inputPositions[i];
          const isThisHovered = hoveredInputId === input.id;
          const nodeOpacity =
            animationPhase >= 1
              ? hasHover
                ? isThisHovered
                  ? 1
                  : 0.3
                : 1
              : 0;

          return (
            <g
              key={`input-${input.id}`}
              className="cursor-pointer"
              onMouseEnter={() => handleInputHover(input)}
              onMouseLeave={() => handleInputHover(null)}
              style={{
                opacity: nodeOpacity,
                transition: "opacity 0.3s ease",
              }}
            >
              {/* Node circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_RADIUS}
                fill="rgba(0,0,0,0.6)"
                stroke="#4DBC1B"
                strokeWidth={isThisHovered ? 2 : 1}
                filter={isThisHovered ? "url(#nodeGlow)" : undefined}
                className="transition-all duration-300"
              />

              {/* Animated ring on hover */}
              {isThisHovered && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_RADIUS + 4}
                  fill="none"
                  stroke="#4DBC1B"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                >
                  <animate
                    attributeName="r"
                    values={`${NODE_RADIUS + 2};${NODE_RADIUS + 10};${NODE_RADIUS + 2}`}
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.5;0;0.5"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Label */}
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isThisHovered ? "#4DBC1B" : "#9ca3af"}
                fontSize={LABEL_FONT_SIZE}
                fontWeight="700"
                fontFamily="monospace"
                className="select-none pointer-events-none transition-colors duration-300 uppercase"
                style={{ letterSpacing: "0.05em" }}
              >
                {input.label.length > 10
                  ? input.label.slice(0, 9) + "…"
                  : input.label}
              </text>
            </g>
          );
        })}

        {/* ── Hidden (Center) Node ── */}
        <g
          style={{
            opacity: animationPhase >= 3 ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {/* Outer glow ring */}
          <circle
            cx={hiddenPos.x}
            cy={hiddenPos.y}
            r={HIDDEN_RADIUS + 8}
            fill="none"
            stroke="#4DBC1B"
            strokeWidth="1"
            strokeOpacity="0.2"
          >
            <animate
              attributeName="r"
              values={`${HIDDEN_RADIUS + 6};${HIDDEN_RADIUS + 14};${HIDDEN_RADIUS + 6}`}
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0.3;0.05;0.3"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Main circle */}
          <circle
            cx={hiddenPos.x}
            cy={hiddenPos.y}
            r={HIDDEN_RADIUS}
            fill="rgba(77,188,27,0.15)"
            stroke="#4DBC1B"
            strokeWidth="2"
            filter="url(#centerGlow)"
          />

          {/* Inner dot */}
          <circle
            cx={hiddenPos.x}
            cy={hiddenPos.y}
            r="4"
            fill="#4DBC1B"
          >
            <animate
              attributeName="r"
              values="3;5;3"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Name label — split into two lines if needed */}
          <text
            x={hiddenPos.x}
            y={hiddenPos.y + HIDDEN_RADIUS + 16}
            textAnchor="middle"
            fill="#4DBC1B"
            fontSize="10"
            fontWeight="900"
            fontFamily="monospace"
            className="select-none uppercase"
            style={{ letterSpacing: "0.1em" }}
          >
            ● {memberName}
          </text>
        </g>

        {/* ── Output Nodes ── */}
        {outputs.map((output, i) => {
          const pos = outputPositions[i];
          const isHighlighted = highlightedOutputIds.includes(output.id);
          const nodeOpacity =
            animationPhase >= 4
              ? hasHover
                ? isHighlighted
                  ? 1
                  : 0.2
                : 1
              : 0;

          return (
            <g
              key={`output-${output.id}`}
              style={{
                opacity: nodeOpacity,
                transition: "opacity 0.3s ease",
                transitionDelay: animationPhase === 4 && !hasHover ? `${i * 0.1}s` : "0s",
              }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_RADIUS}
                fill={
                  isHighlighted
                    ? "rgba(77,188,27,0.2)"
                    : "rgba(0,0,0,0.6)"
                }
                stroke="#4DBC1B"
                strokeWidth={isHighlighted ? 2 : 1}
                filter={isHighlighted ? "url(#nodeGlow)" : undefined}
                className="transition-all duration-300"
              />

              {/* Highlight pulse ring */}
              {isHighlighted && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_RADIUS + 4}
                  fill="none"
                  stroke="#4DBC1B"
                  strokeWidth="1"
                >
                  <animate
                    attributeName="r"
                    values={`${NODE_RADIUS + 2};${NODE_RADIUS + 10};${NODE_RADIUS + 2}`}
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.5;0;0.5"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHighlighted ? "#4DBC1B" : "#9ca3af"}
                fontSize={LABEL_FONT_SIZE}
                fontWeight="700"
                fontFamily="monospace"
                className="select-none pointer-events-none transition-colors duration-300 uppercase"
                style={{ letterSpacing: "0.05em" }}
              >
                {output.label.length > 10
                  ? output.label.slice(0, 9) + "…"
                  : output.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const NeuralNetworkVisualization = memo(NeuralNetworkVisualizationInner);
export default NeuralNetworkVisualization;
