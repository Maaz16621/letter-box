'use client';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero} from '../../tina/__generated__/types';
import { iconSchema } from '@/tina/fields/icon';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { TextEffect } from '../motion-primitives/text-effect';
import { formatOne, formatPair, formatTriple } from '../utils/formatters'
const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export const Hero = ({ data }: { data: PageBlocksHero }) => {
const [bgClass, setBgClass] = useState("bg-default");
const [bgImageUrl, setBgImageUrl] = useState("");
 
async function fetchDictionary(): Promise<string[]> {
  try {
    const res = await fetch('/sources/new_dic.txt')  // keep leading slash
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const txt = await res.text()
    return txt
      .split('\n')
      .map((w) => w.trim())
      .filter((w) => w.length >= 3 && w.length <= 12)
  } catch (err) {
    console.error('Failed to load dictionary:', err)
    return []
  }
}

  /* ---------------------------------------------------- */
  /* everything you already have … inputs, refs, handlers */
  /* ---------------------------------------------------- */

const background = bgImageUrl ? bgImageUrl : bgClass;
  // Extract the background style logic into a more readable format
  let gradientStyle: React.CSSProperties | undefined = undefined;
  if (data.background) {
    const colorName = data.background.replace(/\/\d{1,2}$/, '').split('-').slice(1).join('-');
    const opacity = data.background.match(/\/(\d{1,3})$/)?.[1] || '100';

    gradientStyle = {
      '--tw-gradient-to': `color-mix(in oklab, var(--color-${colorName}) ${opacity}%, transparent)`,
    } as React.CSSProperties;
  }

const [isLoading, setIsLoading] = useState(false);
const [solveLevel, setSolveLevel] = useState(1);



const handleClear = () => {
  setInputs(Array(12).fill(""));
};

const autoFillToday = async () => {
  setIsLoading(true);
  // Simulate or fetch today's puzzle input
  const example = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  setTimeout(() => {
    setInputs(example);
    setIsLoading(false);
  }, 1000);
};

const [inputs, setInputs] = useState<string[]>(Array(12).fill(''))
  const refs = useRef<(HTMLInputElement | null)[]>([])

  /* ---------------- handlers ---------------- */
  const focusInput = (idx: number) => {
    refs.current[idx]?.focus()
    refs.current[idx]?.select()
  }

  const handleInputChange = (idx: number, val: string) => {
    /* accept only A‑Z */
    const letter = val.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 1)

    setInputs((prev) => {
      const next = [...prev]
      next[idx] = letter
      return next
    })

    /* jump ahead if a letter was typed */
    if (letter && idx < inputs.length - 1) focusInput(idx + 1)
  }

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    /* backspace on empty box → go back */
    if (e.key === 'Backspace' && !inputs[idx] && idx > 0) {
      e.preventDefault()
      focusInput(idx - 1)
    }
  }

  /* ---------------- utility buttons ---------------- */
  const clearAll = () => {
    setInputs(Array(12).fill(''))
    focusInput(0)
  }

  useEffect(() => setSolutions([]), [solveLevel]);
const autofillToday = async () => {
  try {
    const res   = await fetch(
      "https://www.aiwordsolver.com/dashboard/api/proxy.php"
    )
    const json  = await res.json()    // → { sides: ["YUN","REA","OIB","HTX"] }
    const sides = json?.sides ?? []

    if (!Array.isArray(sides) || sides.length !== 4) {
      throw new Error("Unexpected API response")
    }

    /* Build the 12‑letter array in the order your UI expects:
       top (0‑2), right (3‑5), left (6‑8), bottom (9‑11)        */
    const letters = [
      ...sides[0].split(""),        // top    Y U N
      ...sides[1].split(""),        // right  R E A
      ...sides[3].split(""),        // left   H T X
      ...sides[2].split(""),        // bottom O I B
    ].slice(0, 12)

    setInputs(letters)
    focusInput(0)                   // put caret back on the first box
  } catch (err) {
    console.error("Autofill failed:", err)
    alert("Could not fetch today’s puzzle – please try again later.")
  }
}

const [dictionary, setDictionary] = useState<string[]>([])
  useEffect(() => { fetchDictionary().then(setDictionary) }, [])

  /* ---------------- web‑worker ---------------- */
  const workerRef = useRef<Worker>()
  const [solutions, setSolutions] = useState<string[]>([])
  const [loading,   setLoading]   = useState(false)

/* ---------- worker wiring (inside useEffect) ---------- */
useEffect(() => {
  const w = new Worker(
    new URL('../workers/solver.worker.ts', import.meta.url),
    { type: 'module' }
  )
  workerRef.current = w

  /* one global handler */
  w.onmessage = (e) => {
    console.log("Worker result:", e.data)
    setSolutions(e.data as string[])
    setLoading(false)          // ← stop spinner
  }

  return () => w.terminate()
}, [])

  /* ---------------- solve button -------------- */
 /* ---------- solve button ---------- */
const handleSolve = () => {
  if (inputs.some((l) => !l)) {
    alert('Fill all 12 boxes first')
    return
  }
  if (!dictionary.length) {
    alert('Dictionary still loading, please wait…')
    return
  }

  setLoading(true)             // show “Finding…”
  setSolutions([])             // clear previous run

  workerRef.current?.postMessage({
    userLetters: inputs,
    wordLength : solveLevel,   // 1 / 2 / 3
    dictionary ,
  })
}

  /* -------- existing handlers / UI kept as-is -------- */
/* utils/formatPair.ts */
const rowFor = (s: string) => {
  const parts = s.split(' → ');

  if (solveLevel === 1 && parts.length === 1)
    return <div key={s}>{formatOne(s)}</div>;

  if (solveLevel === 2 && parts.length === 2)
    return <div key={s}>{formatPair(s)}</div>;

  if (solveLevel === 3 && parts.length === 3)
    return <div key={s}>{formatTriple(s)}</div>;

  return null; // ignore malformed rows
};





  /* ------------ render solutions box --------------- */


const heading = solveLevel === 1
  ? 'One‑Word Solutions'
  : solveLevel === 2
  ? 'Two‑Word Solutions'
  : 'Three‑Word Solutions'

  return (
    
   <Section
  background={data.background!}
  className="items-center pb-8 pt-26"
  style={{
    backgroundImage: "url('uploads/assets/Group 1171275408.png')",
  }}
>
    <style>
    {`
      input[type="text"] {
        width: 50px;
        height: 50px; 
        border-radius: 50px;
      }

      .glass-card {
        position: relative;
        max-width: 320px;
        min-width: 280px;
        width: 100%;
        aspect-ratio: 1; 
      }
        .bg-antiquewhite{
        background:antiquewhite;
        }

  

     
      .word-middle {
        text-align: center;
        white-space: nowrap;
      }
      .word-left {
        text-align: right;
        white-space: nowrap;
      }

      .word-right {
        text-align: left;
        white-space: nowrap;
      }

      .arrow {
        font-weight: bold;
      }

      .option-item {
        background-color: antiquewhite;
      }

      .option-item:hover {
        background-color: var(--orange-web);
        color: white;
      }

      #dropdownOptions {
        z-index: 1;
      }

      @keyframes colorTransition {
        0%, 50%, 100% {
          background-color: var(--orange-web);
          color: #ffffff;
        }
        25%, 75% {
          background-color: #ffffff;
          color: black;
        }
      }

      .animate-color-transition {
        transition: background-color 0.05s ease-in-out, color 0.05s ease-in-out !important;
        animation: colorTransition 10s infinite ease-in-out;
      }

      .loading {
        margin-left: auto;
        margin-right: auto;
        width: 40px;
        height: 40px;
        --c:no-repeat linear-gradient(orange 0 0);
        background: var(--c),var(--c),var(--c),var(--c);
        background-size: 21px 21px;
        animation: l5 1.5s infinite cubic-bezier(0.3,1,0,1);
      }

      @keyframes l5 {
        0%   {background-position: 0    0,100% 0   ,100% 100%,0 100%}
        33%  {background-position: 0    0,100% 0   ,100% 100%,0 100%;width:60px;height: 60px}
        66%  {background-position: 100% 0,100% 100%,0    100%,0 0   ;width:60px;height: 60px}
        100% {background-position: 100% 0,100% 100%,0    100%,0 0   }
      }

      #output-heading {
        margin: -15px 30px 15px 30px;
      }

      @media (max-width:426px ) {
        #output-heading {
          margin: -40px 30px 15px 30px;
        }
      }
    `}
  </style>
  <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
    {data.headline && (
      <div data-tina-field={tinaField(data, "headline")}>
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="mt-8 text-balance text-6xl md:text-7xl xl:text-[48px] text-white"
        >
          {data.headline!}
        </TextEffect>
      </div>
    )}

    {data.tagline && (
      <div data-tina-field={tinaField(data, "tagline")}>
        <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.5}
          as="p"
          className="mx-auto mt-0 max-w-2xl text-balance text-lg text-white"
        >
          {data.tagline!}
        </TextEffect>
      </div>
    )}

  
    {/* Puzzle Form */}
  {/* Glass Card with Form and Results */}
<div className="relative z-0 flex items-center justify-center">
  {/* Background Ellipses */}
{/* first ellipse – left */}
<div
  className="
    absolute aspect-square
    w-[60vw] max-w-[400px]            
    bg-[#56FF78]/20 rounded-full blur-3xl -z-10
    -translate-x-1/4  translate-y-[10%]
  "
/>

{/* second ellipse – right */}
<div
  className="
    absolute aspect-square
    w-[60vw] max-w-[400px]
    bg-[#56FF78]/20 rounded-full blur-3xl -z-10
    translate-x-1/4  translate-y-[10%]
  "
/>


<div
  className="
    relative mt-6 mx-auto
    rounded-3xl bg-white/10 backdrop-blur-lg border border-white/30 shadow-2xl p-8
    w-[100%]                 
                 
    max-w-[1280px]         
  "
>

<div className="hidden lg:block absolute inset-y-0 left-1/2 w-px h-[90%] my-auto -translate-x-1/2 bg-white/30" />

  {/* Form + Buttons Column */}
 <div className="flex flex-col lg:flex-row items-stretch gap-12 justify-between">
<div className="flex-1 flex flex-col items-center">

      <form
        id="puzzle-form"
        className="relative w-full aspect-square  max-w-[360px] bg-white/30 border border-gray-300 rounded-xl shadow-xl flex items-center justify-center mb-6"
      >
        {/* central buttons */}
    <div className="flex flex-col items-center gap-3">
  {/* Autofill button */}
<button
  type="button"
  onClick={autofillToday}
  className="
    relative overflow-hidden                      
    px-2 py-2 md:px-6 md:py-2 rounded-[10px]  text-white                  
    text-sm md:text-base font-semibold shadow cursor-pointer
    bg-gradient-to-r from-[#67FF56] to-[#34792C]  
    transition-all duration-300 ease-in-out
    hover:scale-105 hover:bg-gradient-to-l hover:from-[#34792C] hover:to-[#67FF56]
  "
>
  Autofill&nbsp;With&nbsp;Today’s&nbsp;Puzzle
</button>

  {/* Clear‑all button */}
  <button
    type="button"
    onClick={clearAll}
    className="px-6 py-2 rounded-[10px] border border-[#67FF56] text-white hover:bg-[#67FF56]/10 flex items-center gap-2 cursor-pointer"
  >
    <span className="material-symbols-outlined text-sm">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 14.9994H6.09162M8.6347 13.0903L2.90783 7.36349M11.8176 6.72725L9.27235 4.18199M1.45201 8.5333L8.5451 1.45176C9.14776 0.850065 10.1249 0.850065 10.7275 1.45176L14.5469 5.26492C15.1496 5.86662 15.1496 6.84213 14.5469 7.44388L7.41504 14.5641C7.13595 14.8428 6.75734 14.9994 6.36259 14.9994C5.96784 14.9994 5.58925 14.8428 5.31013 14.5641L1.45201 10.7122C0.84933 10.1106 0.84933 9.1351 1.45201 8.5333Z"
          stroke="#8D8F94"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
    Clear&nbsp;All
  </button>
</div>


      {/* Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2" style={{ top: "-25px" }}>
       {inputs.slice(0, 3).map((value, i) => (
  <input
    key={i}
ref={(el) => { refs.current[i] = el }}      
    type="text"
    value={value}
    onChange={e => handleInputChange(i, e.target.value)}
    onKeyDown={e => handleKeyDown(i, e)}              
    maxLength={1}
    className="w-10 h-10 text-center bg-white border border-[#42CD42] rounded-full"
    required
  />
))}
      </div>

      {/* Right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col gap-2" style={{ right: "-25px" }}>
      {inputs.slice(3, 6).map((value, i) => (
  <input
    key={i + 3}
   ref={(el) => { refs.current[i] = el }}
    type="text"
    value={value}
    onChange={e => handleInputChange(i + 3, e.target.value)}
    onKeyDown={e => handleKeyDown(i + 3, e)}
    maxLength={1}
    className="w-10 h-10 text-center bg-white border border-[#42CD42] rounded-full"
    required
  />
))}
      </div>

      {/* Left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col gap-2" style={{ left: "-25px" }}>
       {inputs.slice(6, 9).map((value, i) => (
  <input
    key={i + 6}
 ref={(el) => { refs.current[i] = el }}
    type="text"
    value={value}
    onChange={e => handleInputChange(i + 6, e.target.value)}
    onKeyDown={e => handleKeyDown(i + 6, e)}
    maxLength={1}
    className="w-10 h-10 text-center bg-white border border-[#42CD42] rounded-full"
    required
  />
))}
      </div>

      {/* Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2" style={{ bottom: "-25px" }}>
       {inputs.slice(9, 12).map((value, i) => (
  <input
    key={i + 9}
  ref={(el) => { refs.current[i] = el }}
    type="text"
    value={value}
    onChange={e => handleInputChange(i + 9, e.target.value)}
    onKeyDown={e => handleKeyDown(i + 9, e)}
    maxLength={1}
    className="w-10 h-10 text-center bg-white border border-[#42CD42] rounded-full"
    required
  />
))}
      </div>
    </form>

    {/* Buttons */}
{/* ——— Difficulty + Solve (inline) ——— */}
<div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full text-green-400 font-semibold">

  {/* label */}
  <span className="w-full md:w-auto text-center md:text-left">Solve Puzzle In&nbsp;#:</span>

  {/* numeric buttons */}
  <div className="flex gap-1 p-1 rounded-full shadow-inner">
    {[1, 2, 3].map((num) => (
      <button
        key={num}
        onClick={() => setSolveLevel(num)}
        className={`cursor-pointer
          w-9 h-9 rounded-md flex items-center justify-center
          font-bold transition
          ${
            solveLevel === num
              ? "bg-white text-green-700 shadow"
              : "bg-transparent text-white hover:bg-white/20"
          }`}
      >
        {num}
      </button>
    ))}
  </div>

  {/* solve button */}
  <button
    type="button"
    onClick={handleSolve}
    className="
      cursor-pointer
      px-4 py-2 rounded-md                        
      bg-green-500 hover:bg-green-600
      text-white text-sm font-semibold
      shadow-md transition
    "
  >
    Solve
  </button>
</div>
  </div>

  {/* Vertical Divider */}
<div className="flex-1 text-white max-w-lg mx-auto">
  {/* heading with soft neon outline */}
  <h3
    className="
      text-center text-lg sm:text-xl font-bold mb-4
      px-4 py-1 rounded-md border border-[#67FF56]/70
      bg-white/10 backdrop-blur-sm
    "
  >
    {heading}
  </h3>

  {/* scrollable results */}
  <div className="scroll-box  shadow-inner text-base sm:text-lg space-y-1">
  {loading && <p className="text-orange-web text-center">Finding…</p>}
  {!loading && !solutions.length && (
    <p className="text-center">No results yet.</p>
  )}

{!loading &&
  solutions.slice(0, 50).map((item, i) => (
    <div
      key={i}
      className={`whitespace-nowrap font-semibold tracking-wide `}
    >
      {rowFor(item)}
    </div>
  ))}

</div>
</div>

    </div>
    </div>
</div>


  </div>
</Section>

  )

};



export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          icon: true,
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        iconSchema as any,
        {
          label: 'Link',
          name: 'link',
          type: 'string',
        },
      ],
    },
    // {
    //   type: 'object',
    //   label: 'Image',
    //   name: 'image',
    //   fields: [
    //     {
    //       name: 'src',
    //       label: 'Image Source',
    //       type: 'image',
    //     },
    //     {
    //       name: 'alt',
    //       label: 'Alt Text',
    //       type: 'string',
    //     },
    //     {
    //       name: 'videoUrl',
    //       label: 'Video URL',
    //       type: 'string',
    //       description: 'If using a YouTube video, make sure to use the embed version of the video URL',
    //     }
    //   ],
    // },
  ],
};
