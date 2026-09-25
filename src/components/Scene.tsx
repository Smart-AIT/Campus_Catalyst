import { memo, useId, type ReactNode } from 'react'
import type { SceneKind } from '../data/event'

/* ---------------------------------------------------------------------------
   Illustrated vintage "photographs" drawn in SVG.
   These are the fallback for every photo slot until real images are added to
   src/assets/photos. Film grain, dust and light leaks are layered on top by
   <Photo>, so these only need to carry composition + a faded colour palette.
   ------------------------------------------------------------------------- */

const SKIN = ['#b07a52', '#9a6443', '#c48d63', '#8a5a3c']
const HAIR = '#1d1410'
const SHIRTS = ['#c9b79a', '#a33b2a', '#6d7a4a', '#d8cdb7', '#8b5a3c', '#3f5566', '#b8864a', '#e7dcc5']
const PANTS = ['#3b4556', '#5a4a3a', '#2e2a28', '#6b5d4b', '#44506a']

function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

type PersonProps = {
  x: number
  y: number
  s?: number
  shirt?: string
  pants?: string
  skin?: string
  long?: boolean
  bag?: boolean
  saree?: boolean
}

function Person({ x, y, s = 1, shirt = SHIRTS[0], pants = PANTS[0], skin = SKIN[0], long, bag, saree }: PersonProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {saree ? (
        <path d="M-11 -40 L11 -40 L14 0 L-14 0 Z" fill={shirt} />
      ) : (
        <>
          <rect x={-8} y={-40} width={7} height={40} rx={2} fill={pants} />
          <rect x={1} y={-40} width={7} height={40} rx={2} fill={pants} />
        </>
      )}
      <rect x={-11} y={-72} width={22} height={36} rx={6} fill={shirt} />
      <rect x={-15} y={-70} width={5} height={28} rx={2.5} fill={shirt} />
      <rect x={10} y={-70} width={5} height={28} rx={2.5} fill={shirt} />
      {bag && <rect x={9} y={-56} width={10} height={14} rx={2} fill="#4a2e20" />}
      <rect x={-3} y={-78} width={6} height={7} fill={skin} />
      <circle cx={0} cy={-84} r={8} fill={skin} />
      {long ? (
        <path d="M-10 -84 Q-11 -96 0 -95 Q11 -96 10 -84 L12 -64 Q0 -70 -12 -64 Z" fill={HAIR} />
      ) : (
        <path d="M-8.5 -85 Q-9 -95 0 -94 Q9 -95 8.5 -85 Q5 -90 0 -89 Q-5 -90 -8.5 -85 Z" fill={HAIR} />
      )}
    </g>
  )
}

function Seated({ x, y, s = 1, shirt = SHIRTS[1], pants = PANTS[0], skin = SKIN[1], long }: PersonProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-10} y={-8} width={26} height={8} rx={3} fill={pants} />
      <rect x={10} y={-8} width={7} height={24} rx={3} fill={pants} />
      <rect x={-12} y={-40} width={22} height={34} rx={6} fill={shirt} />
      <rect x={-3} y={-46} width={6} height={7} fill={skin} />
      <circle cx={0} cy={-52} r={8} fill={skin} />
      {long ? (
        <path d="M-10 -52 Q-11 -64 0 -63 Q11 -64 10 -52 L11 -34 Q0 -40 -11 -34 Z" fill={HAIR} />
      ) : (
        <path d="M-8.5 -53 Q-9 -63 0 -62 Q9 -63 8.5 -53 Q5 -58 0 -57 Q-5 -58 -8.5 -53 Z" fill={HAIR} />
      )}
    </g>
  )
}

function Palm({ x, y, h = 150, lean = 8, c = '#2f3a1f' }: { x: number; y: number; h?: number; lean?: number; c?: string }) {
  const tx = x + lean
  const ty = y - h
  const leaves = [-160, -125, -95, -60, -25, 10, 35]
  return (
    <g>
      <path d={`M${x - 3} ${y} Q${x + lean * 0.3} ${y - h / 2} ${tx - 1.5} ${ty} L${tx + 1.5} ${ty} Q${x + lean * 0.3 + 4} ${y - h / 2} ${x + 3} ${y} Z`} fill="#4b3a28" />
      {leaves.map((a, i) => {
        const r = (a * Math.PI) / 180
        const L = 46 + (i % 2) * 10
        const ex = tx + Math.cos(r) * L
        const ey = ty + Math.sin(r) * L * 0.55 + 18
        const cx = tx + Math.cos(r) * L * 0.5
        const cy = ty - 14
        return <path key={i} d={`M${tx} ${ty} Q${cx} ${cy} ${ex} ${ey} Q${cx} ${cy + 8} ${tx} ${ty} Z`} fill={c} />
      })}
    </g>
  )
}

function Tree({ x, y, r = 30, c = '#4a5429' }: { x: number; y: number; r?: number; c?: string }) {
  return (
    <g>
      <rect x={x - 3} y={y - r * 0.4} width={6} height={r * 1.4} fill="#4b3a28" />
      <circle cx={x} cy={y - r * 0.6} r={r} fill={c} />
      <circle cx={x - r * 0.6} cy={y - r * 0.2} r={r * 0.7} fill={c} />
      <circle cx={x + r * 0.6} cy={y - r * 0.3} r={r * 0.75} fill={c} />
    </g>
  )
}

function Frame({ id, sky, children }: { id: string; sky: [string, string]; children: ReactNode }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.75" cy="0.2" r="0.6">
          <stop offset="0" stopColor="#fff6dc" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-sky)`} />
      {children}
    </>
  )
}

function Campus({ id }: { id: string }) {
  const arches = Array.from({ length: 9 }, (_, i) => 58 + i * 32)
  return (
    <Frame id={id} sky={['#dcc49a', '#efdcb8']}>
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />
      {/* building */}
      <rect x="30" y="92" width="340" height="128" fill="#e9d9b8" />
      <rect x="30" y="86" width="340" height="10" fill="#cdb993" />
      <rect x="150" y="58" width="100" height="40" fill="#e3d0ab" />
      <path d="M140 60 L200 34 L260 60 Z" fill="#c9b28a" />
      <rect x="150" y="104" width="100" height="10" fill="#6b4a2f" opacity=".75" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={44 + i * 32} y={124} width="14" height="20" fill="#5a4332" opacity=".55" />
      ))}
      {arches.map((x) => (
        <path key={x} d={`M${x - 11} 220 L${x - 11} 172 Q${x} 156 ${x + 11} 172 L${x + 11} 220 Z`} fill="#3b2b20" opacity=".7" />
      ))}
      <rect x="30" y="218" width="340" height="6" fill="#bda57f" />
      {/* ground */}
      <rect y="222" width="400" height="78" fill="#c9ad7f" />
      <path d="M150 300 L185 222 L215 222 L250 300 Z" fill="#d9c197" />
      <Palm x={22} y={236} h={180} lean={14} />
      <Palm x={372} y={240} h={170} lean={-16} />
      <Palm x={330} y={232} h={120} lean={6} c="#394524" />
      {[
        [110, 276, 0.62, 1, 0],
        [140, 282, 0.7, 3, 1],
        [200, 290, 0.8, 6, 2],
        [236, 280, 0.66, 0, 3],
        [268, 286, 0.74, 2, 4],
        [305, 272, 0.55, 5, 1],
        [80, 268, 0.5, 4, 2],
      ].map(([x, y, s, c, p], i) => (
        <Person key={i} x={x} y={y} s={s} shirt={SHIRTS[c]} pants={PANTS[p]} skin={SKIN[i % 4]} bag={i % 2 === 0} long={i === 3} />
      ))}
    </Frame>
  )
}

function Students({ id }: { id: string }) {
  return (
    <Frame id={id} sky={['#b99c74', '#d6bf98']}>
      <rect x="0" y="0" width="400" height="150" fill="#cdb28a" />
      <rect x="240" y="10" width="120" height="120" fill="#6b4a2f" opacity=".35" />
      <rect x="250" y="20" width="100" height="100" fill="#e2cfa8" opacity=".45" />
      <Tree x={60} y={120} r={46} c="#58602f" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={0} y={150 + i * 38} width="400" height="38" fill={i % 2 ? '#a8977d' : '#b8a68a'} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`e${i}`} x={0} y={150 + i * 38} width="400" height="3" fill="#8a7a62" />
      ))}
      <Seated x={70} y={226} s={1.35} shirt={SHIRTS[3]} pants={PANTS[1]} skin={SKIN[0]} />
      <Seated x={130} y={226} s={1.35} shirt={SHIRTS[1]} pants={PANTS[0]} skin={SKIN[2]} long />
      <Seated x={200} y={264} s={1.5} shirt={SHIRTS[6]} pants={PANTS[4]} skin={SKIN[1]} />
      <Seated x={270} y={226} s={1.35} shirt={SHIRTS[5]} pants={PANTS[2]} skin={SKIN[3]} />
      <Person x={335} y={230} s={1.3} shirt={SHIRTS[7]} pants={PANTS[3]} skin={SKIN[0]} />
      <rect x="165" y="232" width="46" height="30" fill="#f2ead7" transform="rotate(-8 188 247)" />
      <path d="M170 240 H204 M170 246 H200 M170 252 H198" stroke="#6f6152" strokeWidth="1.2" transform="rotate(-8 188 247)" />
    </Frame>
  )
}

function Library({ id }: { id: string }) {
  const r = rng(11)
  const spines = ['#7a2f22', '#3f5566', '#6d7a4a', '#b8864a', '#4a2e20', '#8e6d3e', '#2f3a2a', '#a3503a']
  const books: ReactNode[] = []
  for (let shelf = 0; shelf < 5; shelf++) {
    for (const col of [0, 1]) {
      let x = col ? 262 : 8
      const max = col ? 392 : 150
      while (x < max) {
        const w = 6 + r() * 8
        const h = 34 + r() * 12
        books.push(<rect key={`${shelf}-${col}-${x}`} x={x} y={52 + shelf * 50 - h + 44} width={w - 1} height={h} fill={spines[Math.floor(r() * spines.length)]} />)
        x += w
      }
    }
  }
  return (
    <Frame id={id} sky={['#5b3f2a', '#3a271b']}>
      <rect x="0" y="0" width="160" height="300" fill="#6b4a2f" />
      <rect x="254" y="0" width="146" height="300" fill="#6b4a2f" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="0" y={46 + i * 50} width="160" height="6" fill="#3a271b" />
          <rect x="254" y={46 + i * 50} width="146" height="6" fill="#3a271b" />
        </g>
      ))}
      {books}
      <rect x="160" y="0" width="94" height="300" fill="#2c1f16" />
      <polygon points="175,0 240,0 300,300 150,300" fill="#ffe7b0" opacity=".22" />
      <Person x={206} y={300} s={2.3} shirt="#b8864a" pants="#3b4556" skin={SKIN[0]} long saree />
      <rect x="192" y="172" width="34" height="24" fill="#efe3c8" transform="rotate(12 209 184)" />
    </Frame>
  )
}

function Mess({ id }: { id: string }) {
  return (
    <Frame id={id} sky={['#d8c29a', '#c8ab7c']}>
      <rect x="0" y="0" width="400" height="120" fill="#e3cfa6" />
      <rect x="0" y="118" width="400" height="4" fill="#8e6d3e" />
      <circle cx="320" cy="50" r="22" fill="#f6ecd4" stroke="#4a2e20" strokeWidth="4" />
      <path d="M320 50 L320 36 M320 50 L330 54" stroke="#1b1714" strokeWidth="2.5" strokeLinecap="round" />
      {[60, 180, 300].map((x) => (
        <g key={x}>
          <rect x={x - 30} y="14" width="60" height="5" rx="2" fill="#fffaf0" />
          <rect x={x - 30} y="14" width="60" height="5" rx="2" fill="#fff" opacity=".6" filter="blur(3px)" />
        </g>
      ))}
      <rect x="20" y="30" width="110" height="60" fill="#a33b2a" opacity=".6" />
      <rect x="0" y="122" width="400" height="178" fill="#b59a70" />
      {[140, 200].map((y, row) =>
        [40, 110, 180, 250, 320].map((x, i) => (
          <Seated key={`${row}-${i}`} x={x + row * 30} y={y} s={1.05 + row * 0.2} shirt={SHIRTS[(i + row * 3) % 8]} pants={PANTS[i % 5]} skin={SKIN[(i + row) % 4]} long={(i + row) % 3 === 0} />
        )),
      )}
      <polygon points="0,196 400,176 400,214 0,244" fill="#6b4a2f" />
      <polygon points="0,244 400,214 400,300 0,300" fill="#8e6d3e" />
      {[30, 100, 170, 240, 310, 370].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={236 - i * 4} rx="24" ry="8" fill="#cfd2d0" />
          <ellipse cx={x} cy={235 - i * 4} rx="18" ry="5" fill="#a9acaa" />
          <circle cx={x - 6} cy={234 - i * 4} r="3" fill="#e0b043" />
          <circle cx={x + 5} cy={235 - i * 4} r="3.4" fill="#f2ead7" />
        </g>
      ))}
    </Frame>
  )
}

function MapScene({ id }: { id: string }) {
  return (
    <Frame id={id} sky={['#e8dcc0', '#dfcfae']}>
      <path d="M0 210 Q120 170 200 190 T400 150" stroke="#b9a37a" strokeWidth="18" fill="none" />
      <path d="M120 0 Q140 120 110 300" stroke="#b9a37a" strokeWidth="14" fill="none" />
      <path d="M260 0 Q240 90 300 300" stroke="#b9a37a" strokeWidth="10" fill="none" />
      {[
        [30, 30, 70, 50, '#a33b2a'],
        [160, 40, 80, 60, '#6d7a4a'],
        [300, 30, 70, 90, '#b8864a'],
        [20, 230, 80, 50, '#3f5566'],
        [160, 220, 90, 60, '#a33b2a'],
        [320, 200, 60, 70, '#6d7a4a'],
      ].map(([x, y, w, h, c], i) => (
        <g key={i}>
          <rect x={x as number} y={y as number} width={w as number} height={h as number} fill={c as string} opacity=".55" />
          <rect x={x as number} y={y as number} width={w as number} height={h as number} fill="none" stroke="#4a2e20" strokeWidth="1.5" />
        </g>
      ))}
      {[[60, 130], [80, 150], [220, 130], [360, 130], [270, 160], [40, 180]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill="#58602f" opacity=".75" />
      ))}
      <path d="M60 255 C 120 200, 160 140, 200 110 S 320 70, 335 75" stroke="#b3261e" strokeWidth="3" strokeDasharray="7 6" fill="none" />
      {[[60, 255], [335, 75], [200, 110]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0 C -10 -12 -10 -24 0 -24 C 10 -24 10 -12 0 0 Z" fill="#b3261e" />
          <circle cx="0" cy="-16" r="3.5" fill="#f2ead7" />
        </g>
      ))}
      <g transform="translate(360 262)">
        <circle r="20" fill="none" stroke="#4a2e20" strokeWidth="1.5" />
        <path d="M0 -18 L5 0 L0 18 L-5 0 Z" fill="#4a2e20" />
        <path d="M0 -18 L5 0 L-5 0 Z" fill="#b3261e" />
      </g>
    </Frame>
  )
}

function Ideas({ id }: { id: string }) {
  const notes: [number, number, number, string][] = [
    [30, 30, -6, '#efe3c8'],
    [130, 20, 4, '#e0b043'],
    [240, 34, -3, '#f2ead7'],
    [60, 150, 5, '#e3a78e'],
    [170, 140, -4, '#efe3c8'],
    [280, 150, 7, '#cfd9b0'],
  ]
  return (
    <Frame id={id} sky={['#8e6d3e', '#7a5a34']}>
      <rect x="10" y="10" width="380" height="280" fill="#a07a4a" stroke="#4a2e20" strokeWidth="10" />
      {notes.map(([x, y, r, c], i) => (
        <g key={i} transform={`rotate(${r} ${x + 45} ${y + 50})`}>
          <rect x={x + 2} y={y + 4} width="92" height="100" fill="#000" opacity=".2" />
          <rect x={x} y={y} width="92" height="100" fill={c} />
          {[0, 1, 2, 3].map((l) => (
            <path key={l} d={`M${x + 12} ${y + 40 + l * 14} q 20 ${l % 2 ? -4 : 4} ${60 - l * 8} 0`} stroke="#3a2a20" strokeWidth="2" fill="none" opacity=".7" />
          ))}
          <circle cx={x + 46} cy={y + 8} r="5" fill="#b3261e" />
        </g>
      ))}
      <g transform="translate(100 60)">
        <circle cx="0" cy="0" r="12" fill="none" stroke="#1b1714" strokeWidth="2.2" />
        <path d="M-5 12 H5 M-4 16 H4" stroke="#1b1714" strokeWidth="2.2" />
      </g>
      <path d="M76 80 L214 190 L326 80" stroke="#b3261e" strokeWidth="1.5" fill="none" />
    </Frame>
  )
}

function Leave({ id }: { id: string }) {
  return (
    <Frame id={id} sky={['#6b4a2f', '#5a3c26']}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={i} d={`M0 ${20 + i * 42} Q200 ${10 + i * 44} 400 ${24 + i * 40}`} stroke="#4a2e20" strokeWidth="2" opacity=".5" fill="none" />
      ))}
      {[
        [60, 40, -9],
        [120, 60, 5],
        [180, 36, -2],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x + 80} ${y + 110})`}>
          <rect x={x + 3} y={y + 5} width="160" height="220" fill="#000" opacity=".25" />
          <rect x={x} y={y} width="160" height="220" fill={i === 2 ? '#f2ead7' : '#e7d9ba'} />
          <rect x={x + 14} y={y + 14} width="80" height="8" fill="#4a2e20" opacity=".7" />
          {Array.from({ length: 9 }, (_, l) => (
            <rect key={l} x={x + 14} y={y + 36 + l * 16} width={120 - (l % 3) * 20} height="2" fill="#6f6152" opacity=".6" />
          ))}
          {i === 2 && (
            <g transform={`translate(${x + 110} ${y + 170}) rotate(-14)`} opacity=".8">
              <circle r="28" fill="none" stroke="#b3261e" strokeWidth="3" />
              <circle r="21" fill="none" stroke="#b3261e" strokeWidth="1.5" />
              <rect x="-18" y="-4" width="36" height="8" fill="#b3261e" />
            </g>
          )}
        </g>
      ))}
      <g transform="rotate(28 330 200)">
        <rect x="300" y="190" width="110" height="10" rx="5" fill="#1b1714" />
        <rect x="300" y="190" width="30" height="10" rx="3" fill="#c9a24a" />
        <path d="M300 190 L282 195 L300 200 Z" fill="#c9a24a" />
      </g>
      <g transform="translate(340 70)">
        <rect x="-18" y="0" width="36" height="30" rx="4" fill="#4a2e20" />
        <rect x="-8" y="-26" width="16" height="28" rx="6" fill="#6b4a2f" />
        <rect x="-22" y="30" width="44" height="6" fill="#b3261e" />
      </g>
    </Frame>
  )
}

function Classroom({ id }: { id: string }) {
  return (
    <Frame id={id} sky={['#d5c29c', '#c8b28a']}>
      <rect x="40" y="36" width="320" height="130" fill="#2f4a3a" stroke="#6b4a2f" strokeWidth="8" />
      <g stroke="#e9e4d4" strokeWidth="2" fill="none" opacity=".8" strokeLinecap="round">
        <path d="M70 70 q10 -10 20 0 t20 0 M120 66 h30 M160 60 l10 16 l10 -16 M70 100 h60 M140 100 q12 -14 24 0 M200 70 c20 -20 40 20 60 0 M290 70 h40 M210 110 l20 -20 l20 30 l20 -40 l20 30 M70 130 h120 M80 146 h60" />
        <circle cx="315" cy="120" r="18" />
      </g>
      <rect x="40" y="166" width="320" height="6" fill="#8e6d3e" />
      <Person x={300} y={214} s={1.3} shirt="#e7dcc5" pants="#3b4556" skin={SKIN[1]} />
      <rect x="0" y="210" width="400" height="90" fill="#8e6d3e" />
      {[0, 1].map((row) =>
        Array.from({ length: 8 }, (_, i) => (
          <g key={`${row}-${i}`}>
            <circle cx={20 + i * 52 + row * 24} cy={236 + row * 42} r={13 + row * 3} fill={HAIR} />
            <rect x={4 + i * 52 + row * 24} y={248 + row * 42} width={32 + row * 6} height="40" rx="10" fill={SHIRTS[(i + row * 2) % 8]} />
          </g>
        )),
      )}
    </Frame>
  )
}

function Portrait({ id }: { id: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.45" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#7d93a3" />
          <stop offset="0.6" stopColor="#4a5f70" />
          <stop offset="1" stopColor="#253341" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-bg)`} />
      <circle cx="120" cy="90" r="70" fill="#8ea2b0" opacity=".25" />
      <circle cx="300" cy="200" r="90" fill="#1f2c38" opacity=".3" />
      <path d="M90 300 Q100 200 200 196 Q300 200 310 300 Z" fill="#23201e" />
      <path d="M180 200 L200 250 L220 200 Z" fill="#efe8d8" />
      <path d="M196 208 L204 208 L207 250 L200 262 L193 250 Z" fill="#7a2f22" />
      <rect x="186" y="170" width="28" height="32" fill="#a06d49" />
      <ellipse cx="200" cy="130" rx="42" ry="52" fill="#b07a52" />
      <path d="M156 124 Q150 70 200 72 Q252 70 244 124 Q236 94 200 96 Q166 94 156 124 Z" fill={HAIR} />
      <ellipse cx="184" cy="128" rx="4" ry="3" fill="#2a1a12" />
      <ellipse cx="216" cy="128" rx="4" ry="3" fill="#2a1a12" />
      <path d="M176 118 q8 -4 16 0 M208 118 q8 -4 16 0" stroke="#2a1a12" strokeWidth="3" fill="none" />
      <path d="M180 156 q20 -10 40 0 q-20 4 -40 0 Z" fill="#1d1410" />
      <path d="M198 132 q-4 12 2 16" stroke="#8a5a3c" strokeWidth="2" fill="none" />
    </>
  )
}

function Sunset({ id }: { id: string }) {
  return (
    <Frame id={id} sky={['#f0a24a', '#f7d38a']}>
      <circle cx="270" cy="190" r="40" fill="#fff0c4" />
      <circle cx="270" cy="190" r="70" fill="#fff0c4" opacity=".25" />
      <path d="M0 210 L0 170 L40 170 L40 150 L90 150 L90 180 L150 180 L150 160 L210 160 L210 195 L300 195 L300 175 L360 175 L360 160 L400 160 L400 210 Z" fill="#5a2e1c" />
      <g fill="#4a2416">
        <rect x="100" y="126" width="30" height="34" rx="4" />
        <rect x="330" y="140" width="24" height="26" rx="4" />
        <rect x="108" y="160" width="4" height="22" />
        <rect x="120" y="160" width="4" height="22" />
      </g>
      <rect x="60" y="60" width="4" height="150" fill="#3a1c10" />
      <rect x="48" y="70" width="28" height="3" fill="#3a1c10" />
      <path d="M62 72 Q200 110 400 80 M62 72 Q180 130 400 96" stroke="#3a1c10" strokeWidth="1" fill="none" />
      <rect x="0" y="210" width="400" height="90" fill="#6b3520" />
      <rect x="0" y="210" width="400" height="8" fill="#8a4a2c" />
      <Seated x={150} y={262} s={1.6} shirt="#3a1c10" pants="#2a140b" skin="#3a1c10" />
      <rect x="180" y="238" width="30" height="18" rx="3" fill="#2a140b" />
    </Frame>
  )
}

function Street({ id }: { id: string }) {
  return (
    <Frame id={id} sky={['#cfb88f', '#e4d2ac']}>
      <Tree x={40} y={150} r={40} c="#58602f" />
      <rect x="250" y="40" width="150" height="150" fill="#b99c74" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${254 + i * 48} 110 l44 0 l-6 18 l-32 0 Z`} fill={['#a33b2a', '#6d7a4a', '#e0b043'][i]} opacity=".85" />
      ))}
      <rect y="190" width="400" height="110" fill="#8a7d6a" />
      <rect y="186" width="400" height="8" fill="#b8a68a" />
      <g>
        <rect x="30" y="96" width="220" height="100" rx="12" fill="#a8321f" />
        <rect x="30" y="96" width="220" height="30" rx="12" fill="#e7dcc5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={46 + i * 38} y="130" width="30" height="26" fill="#3b4556" opacity=".85" />
        ))}
        <rect x="222" y="130" width="22" height="58" fill="#3b4556" opacity=".85" />
        <rect x="30" y="170" width="220" height="6" fill="#e0b043" />
        <circle cx="72" cy="198" r="14" fill="#1b1714" />
        <circle cx="210" cy="198" r="14" fill="#1b1714" />
      </g>
      {[
        [270, 268, 1.05, 0],
        [300, 276, 1.15, 3],
        [334, 264, 1, 6],
        [366, 280, 1.2, 1],
        [236, 290, 1.25, 4],
      ].map(([x, y, s, c], i) => (
        <Person key={i} x={x} y={y} s={s} shirt={SHIRTS[c]} pants={PANTS[i % 5]} skin={SKIN[i % 4]} bag long={i === 2} />
      ))}
    </Frame>
  )
}

function Gate({ id }: { id: string }) {
  return (
    <Frame id={id} sky={['#d8c9a4', '#ece0c2']}>
      <Tree x={30} y={170} r={46} c="#5b6533" />
      <Tree x={370} y={170} r={50} c="#4f5a2c" />
      <path d="M50 200 L50 60 L350 60 L350 200 L300 200 L300 110 Q200 40 100 110 L100 200 Z" fill="#e6d7b5" />
      <rect x="44" y="50" width="312" height="14" fill="#cbb58c" />
      <rect x="120" y="70" width="160" height="16" fill="#b3a07a" />
      <path d="M100 200 L100 110 Q200 40 300 110 L300 200 Z" fill="#9fb07a" opacity=".6" />
      <Tree x={200} y={170} r={34} c="#6b7a40" />
      <rect y="200" width="400" height="100" fill="#c8ad80" />
      <path d="M130 300 L170 200 L230 200 L270 300 Z" fill="#dbc39a" />
      {[
        [180, 230, 0.55, 2],
        [214, 238, 0.6, 5],
        [150, 262, 0.8, 1],
        [250, 270, 0.85, 3],
        [200, 292, 1, 6],
      ].map(([x, y, s, c], i) => (
        <Person key={i} x={x} y={y} s={s} shirt={SHIRTS[c]} pants={PANTS[i % 5]} skin={SKIN[i % 4]} bag={i % 2 === 1} long={i === 1} />
      ))}
    </Frame>
  )
}

function Camera({ id }: { id: string }) {
  return (
    <Frame id={id} sky={['#6b4a2f', '#4a2e20']}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M0 ${30 + i * 50} Q200 ${20 + i * 52} 400 ${34 + i * 48}`} stroke="#3a2418" strokeWidth="2" fill="none" />
      ))}
      {[
        [20, 200, -12],
        [80, 220, 8],
        [300, 210, -6],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x + 50} ${y + 40})`}>
          <rect x={x} y={y} width="100" height="80" fill="#f2ead7" />
          <rect x={x + 6} y={y + 6} width="88" height="60" fill={['#b8864a', '#6d7a4a', '#a33b2a'][i]} opacity=".75" />
        </g>
      ))}
      <rect x="120" y="96" width="170" height="90" rx="10" fill="#1b1714" />
      <rect x="120" y="96" width="170" height="30" rx="8" fill="#c9c7c0" />
      <rect x="180" y="74" width="50" height="30" rx="4" fill="#1b1714" />
      <rect x="136" y="84" width="22" height="14" rx="3" fill="#c9c7c0" />
      <circle cx="205" cy="148" r="38" fill="#2b2622" stroke="#c9c7c0" strokeWidth="3" />
      <circle cx="205" cy="148" r="26" fill="#0e0c0b" />
      <circle cx="205" cy="148" r="14" fill="#3f5566" opacity=".6" />
      <circle cx="198" cy="141" r="5" fill="#fff" opacity=".4" />
      {[330, 356].map((x) => (
        <g key={x}>
          <rect x={x} y="120" width="22" height="40" rx="3" fill="#1b1714" />
          <rect x={x} y="126" width="22" height="26" fill="#e0b043" />
        </g>
      ))}
    </Frame>
  )
}

function Notebook({ id }: { id: string }) {
  return (
    <Frame id={id} sky={['#6b4a2f', '#5a3c26']}>
      <rect x="40" y="20" width="320" height="260" fill="#f2ead7" transform="rotate(-3 200 150)" />
      <g transform="rotate(-3 200 150)">
        <rect x="198" y="20" width="4" height="260" fill="#cdb993" />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x="50" y={46 + i * 17} width="300" height="1" fill="#8aa3b8" opacity=".6" />
        ))}
        <rect x="70" y="60" width="100" height="60" fill="none" stroke="#2a2a3a" strokeWidth="2" />
        <path d="M80 76 H150 M80 90 H130 M80 104 H140" stroke="#2a2a3a" strokeWidth="1.5" />
        <path d="M120 120 L120 160 L240 160" stroke="#2a2a3a" strokeWidth="2" fill="none" markerEnd="" />
        <path d="M232 154 L242 160 L232 166" stroke="#2a2a3a" strokeWidth="2" fill="none" />
        <circle cx="280" cy="90" r="24" fill="none" stroke="#b3261e" strokeWidth="2.5" />
        <path d="M270 118 h20 M272 124 h16" stroke="#b3261e" strokeWidth="2.5" />
        <rect x="250" y="150" width="80" height="50" fill="none" stroke="#2a2a3a" strokeWidth="2" />
        <path d="M70 210 q30 -20 60 0 t60 0" stroke="#2a2a3a" strokeWidth="2" fill="none" />
      </g>
      <circle cx="350" cy="250" r="30" fill="#e7dcc5" opacity=".9" />
      <circle cx="350" cy="250" r="24" fill="#8a4a24" />
      <circle cx="350" cy="250" r="24" fill="none" stroke="#c98a4a" strokeWidth="3" opacity=".6" />
      <g transform="rotate(-30 110 260)">
        <rect x="40" y="255" width="150" height="10" fill="#e0b043" />
        <path d="M40 255 L22 260 L40 265 Z" fill="#e7c9a0" />
        <rect x="186" y="255" width="12" height="10" fill="#d38a8a" />
      </g>
    </Frame>
  )
}

const MAP: Record<SceneKind, (p: { id: string }) => ReactNode> = {
  campus: Campus,
  students: Students,
  library: Library,
  mess: Mess,
  map: MapScene,
  ideas: Ideas,
  leave: Leave,
  classroom: Classroom,
  portrait: Portrait,
  sunset: Sunset,
  street: Street,
  gate: Gate,
  camera: Camera,
  notebook: Notebook,
}

export const Scene = memo(function Scene({ kind, className }: { kind: SceneKind; className?: string }) {
  const id = useId().replace(/:/g, '')
  const Cmp = MAP[kind]
  return (
    <svg className={className} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <Cmp id={id} />
    </svg>
  )
})
