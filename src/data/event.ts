/* ==========================================================================
   CAMPUS CATALYST 2K26 — SINGLE SOURCE OF TRUTH
   --------------------------------------------------------------------------
   Every date, link, prize, rule and problem statement on the site is read
   from this file. Edit here; the whole site updates.
   ========================================================================== */

/* ---------- LINKS ------------------------------------------------------- */

/** Paste the Unstop registration link here. Until you do, every Register
 *  button shows a "registration opening soon" state instead of a dead link. */
export const REGISTRATION_URL = 'PASTE_UNSTOP_URL_HERE'

export const LINKS = {
  registration: REGISTRATION_URL,
  cidc: 'https://www.cidc.dev/',
  instagram: 'https://www.instagram.com/cidc.ait',
  linkedin:
    'https://www.linkedin.com/search/results/all/?keywords=college%20innovation%20%26%20development%20club&origin=RICH_QUERY_TYPEAHEAD_HISTORY&spellCorrectionEnabled=true&heroEntityKey=urn%3Ali%3Aorganization%3A116164080&position=0',
} as const

export const isRegistrationOpen = () =>
  /^https?:\/\//.test(LINKS.registration) && !LINKS.registration.includes('PASTE_')

/* ---------- EVENT ------------------------------------------------------- */

export const EVENT = {
  name: 'Campus Catalyst',
  edition: '2K26',
  tagline: 'Build what matters.',
  slogan: ['9 hours.', 'One campus.', 'Infinite ideas.'],
  organizer: 'College Innovation & Development Club',
  organizerShort: 'CIDC',
  institute: 'Army Institute of Technology',
  instituteShort: 'AIT',
  city: 'Pune',
  /** ISO start/end in IST — used for the countdown and the camera date stamp */
  startISO: '2026-10-17T09:00:00+05:30',
  endISO: '2026-10-17T18:00:00+05:30',
  dateLabel: '17 October 2026',
  dateShort: '17 OCT 2026',
  stamp: '17 10 ’26',
  timeLabel: '09:00 — 18:00',
  timeLabelLong: '09:00 AM – 06:00 PM IST',
  durationHours: 9,
  format: 'Offline · Physical event',
  teamSize: '2–4 members',
  eligibility: 'FE and SE students currently enrolled at AIT, Pune',
  techStack: 'Open to any tech stack',
  prizePool: 30000,
  prizePoolLabel: '₹30,000+',
} as const

/* ---------- PRIZES ------------------------------------------------------ */

export type Prize = {
  place: string
  amount: number
  extra?: string
  note?: string
  tone: 'gold' | 'silver' | 'bronze' | 'plain'
}

export const PRIZES: Prize[] = [
  { place: '1st Prize', amount: 5000, extra: '+ Merchandise', tone: 'gold' },
  { place: '2nd Prize', amount: 3000, extra: '+ Merchandise', tone: 'silver' },
  { place: '3rd Prize', amount: 2000, extra: '+ Merchandise', tone: 'bronze' },
  { place: '4th – 10th', amount: 500, note: 'each', tone: 'plain' },
]

/* ---------- PROBLEM STATEMENTS ----------------------------------------- */

export type Problem = {
  id: string
  no: string
  title: string
  short: string
  description: string
  tags: string[]
  image: ImageKey
}

export const PROBLEMS: Problem[] = [
  {
    id: 'idea-portal',
    no: '01',
    title: 'Student Idea Submission & Innovation Portal',
    short: 'A home for every idea that currently dies in a notebook.',
    description:
      'Build an online platform where students can submit innovative ideas, research proposals, or project concepts.',
    tags: ['Ideas', 'Research', 'Proposals'],
    image: 'problem-ideas',
  },
  {
    id: 'campus-navigation',
    no: '02',
    title: 'Campus Navigation',
    short: 'No fresher should get lost on day one.',
    description:
      'Build an interactive map of the entire AIT campus helping freshers and parents instantly locate departments, hostels, canteens, administrative offices and other important locations.',
    tags: ['Maps', 'Freshers', 'Parents'],
    image: 'problem-navigation',
  },
  {
    id: 'mess-crowd',
    no: '03',
    title: 'Real-Time Mess Crowd Management System',
    short: 'Know the queue before you join it.',
    description:
      'Create a digital platform showing live mess occupancy so students can decide the best time to visit and avoid long queues.',
    tags: ['Real-time', 'Occupancy', 'Hostel life'],
    image: 'problem-mess',
  },
  {
    id: 'digital-library',
    no: '04',
    title: 'Digital Library Portal',
    short: 'Every project ever made here, one search away.',
    description:
      'Build a searchable online repository centralizing departmental projects, research work and seminar reports where students and faculty can upload, browse and reference previous work.',
    tags: ['Search', 'Archive', 'Faculty'],
    image: 'problem-library',
  },
  {
    id: 'leave-management',
    no: '05',
    title: 'Smart Leave Management System',
    short: 'Retire the paper outpass.',
    description:
      'Develop a centralized digital portal for hostel leave and academic outpass applications. The system should replace manual paper tracking with an automated approval workflow involving wardens and faculty, providing quick, transparent and trackable status updates.',
    tags: ['Workflow', 'Wardens', 'Approvals'],
    image: 'problem-leave',
  },
]

export const OPEN_INNOVATION = {
  label: 'Option 02',
  title: 'Open Innovation',
  hook: 'Bring your own problem.',
  body: 'Seen something on campus that should work better? Pitch your own idea instead of a provided problem.',
  constraint:
    'The idea must strictly relate to college development, campus innovation or improving the AIT college ecosystem.',
}

/* ---------- TIMELINE (suggested flow — NOT the official schedule) ------ */

export const TIMELINE_IS_OFFICIAL = false

export const TIMELINE = [
  { time: '09:00', title: 'Check-in + Problem Brief', note: 'Teams arrive, briefs handed out.' },
  { time: '10:00', title: 'Ideation', note: 'Pick a problem. Argue. Sketch.' },
  { time: '11:00', title: 'Build Begins', note: 'Laptops open. Clock running.' },
  { time: '13:00', title: 'Midday Check', note: 'Where are you? Where should you be?' },
  { time: '15:00', title: 'Prototype Sprint', note: 'Make the core thing work.' },
  { time: '17:00', title: 'Final Polish', note: 'Fix, rehearse, cut what doesn’t matter.' },
  { time: '18:00', title: 'Live Showdown', note: 'Show what you built.' },
]

/* ---------- RULES ------------------------------------------------------- */

export const RULES = [
  { no: '01', title: 'Team Size', body: '2–4 members.' },
  { no: '02', title: 'Eligibility', body: 'FE and SE students currently enrolled at AIT, Pune.' },
  { no: '03', title: 'Duration', body: '09:00–18:00, 17 October 2026.' },
  { no: '04', title: 'Tech Stack', body: 'Open to any tech stack.' },
  { no: '05', title: 'AI', body: 'AI tools and LLMs are permitted. Vibecoding is allowed.', stamp: 'Allowed' },
  { no: '06', title: 'Build Requirement', body: 'The prototype must be built during the live 9-hour event.' },
  {
    no: '07',
    title: 'Pre-built Projects',
    body: 'Submitting a pre-built full project is strictly prohibited.',
    stamp: 'Prohibited',
  },
  { no: '08', title: 'Judging', body: 'Originality, Feasibility, Impact and Presentation.' },
] as { no: string; title: string; body: string; stamp?: string }[]

/* ---------- JUDGING ----------------------------------------------------- */

export const JUDGING = [
  { key: 'originality', title: 'Originality', line: 'Has anyone on this campus thought of it this way before?' },
  { key: 'feasibility', title: 'Feasibility', line: 'Could it actually run here, next semester, with real users?' },
  { key: 'impact', title: 'Impact', line: 'How many students, staff or visitors does it help — and how much?' },
  { key: 'presentation', title: 'Presentation', line: 'Can you make the room understand it in minutes?' },
] as const

/* ---------- CIDC -------------------------------------------------------- */

export const CIDC = {
  motto: 'Innovation through development',
  about:
    'A student-driven development community at AIT, Pune that builds real-world systems for the college ecosystem.',
  approach:
    'Project-based learning: juniors work on live, production systems alongside senior peer developers — learning, building, deploying and contributing to actual campus software.',
  pillars: ['Learn', 'Build', 'Deploy', 'Contribute'],
  domains: ['Web Development', 'App Development', 'AI / ML', 'Cloud Infrastructure'],
}

/* ---------- IMAGES -----------------------------------------------------
   Drop real photographs into /public/images using EXACTLY these filenames.
   If a file is missing, the site draws an illustrated vintage placeholder
   ("scene") in its place — so the site always looks finished.
   Recommended: .webp, ~1600px on the long edge for hero, ~1000px others.
   ---------------------------------------------------------------------- */

export type SceneKind =
  | 'campus'
  | 'students'
  | 'library'
  | 'mess'
  | 'map'
  | 'ideas'
  | 'leave'
  | 'classroom'
  | 'portrait'
  | 'sunset'
  | 'street'
  | 'gate'
  | 'camera'
  | 'notebook'

export type ImageSpec = {
  file: string
  alt: string
  caption: string
  scene: SceneKind
  /** prompt you can paste into an image generator to create this photo */
  prompt: string
}

const P = '1980s Indian film photograph, 35mm Kodak film, faded warm colours, film grain, dust, soft flash, slight light leak, candid, no text'

export const IMAGES = {
  'hero-campus': {
    file: 'hero-campus.webp',
    alt: 'Faded photograph of a colonial-style college building framed by palm trees, students walking in front',
    caption: 'Main building, morning assembly',
    scene: 'campus',
    prompt: `${P}. Wide shot of a cream colonial college building in Pune with palm trees, students with satchels walking in front, morning light.`,
  },
  'students-discuss': {
    file: 'students-discuss.webp',
    alt: 'Group of students sitting on stone steps discussing ideas over a notebook',
    caption: 'Steps outside the workshop',
    scene: 'students',
    prompt: `${P}. Five Indian college students in 1980s clothes sitting on stone steps, arguing over an open notebook, laughing.`,
  },
  'classroom': {
    file: 'classroom.webp',
    alt: 'Lecture hall with a chalkboard full of equations and rows of wooden desks',
    caption: 'Lecture hall B, second period',
    scene: 'classroom',
    prompt: `${P}. Engineering lecture hall with green chalkboard full of equations, wooden benches, tube lights.`,
  },
  'library-reader': {
    file: 'library-reader.webp',
    alt: 'Student reading between tall wooden library shelves',
    caption: 'Reading room, exam week',
    scene: 'library',
    prompt: `${P}. Young Indian woman in a printed kurta reading between tall wooden library shelves, window light.`,
  },
  'canteen': {
    file: 'canteen.webp',
    alt: 'Students eating and talking at long tables in a college mess',
    caption: 'Mess, 1:05 pm. The queue.',
    scene: 'mess',
    prompt: `${P}. Busy Indian college mess hall, steel plates, long tables, students talking, warm tungsten light.`,
  },
  'gate': {
    file: 'gate.webp',
    alt: 'Arched college gate with students walking through',
    caption: 'The front gate',
    scene: 'gate',
    prompt: `${P}. Arched stone entrance gate of an Indian engineering college, students walking through, trees.`,
  },
  'street': {
    file: 'street.webp',
    alt: 'Busy street with a red city bus and students waiting',
    caption: 'Bus stop, after class',
    scene: 'street',
    prompt: `${P}. Red and cream city bus in Pune, students with bags boarding, busy street.`,
  },
  'portrait-studio': {
    file: 'portrait-studio.webp',
    alt: 'Formal studio portrait against a mottled blue backdrop',
    caption: 'Studio portrait, ID card day',
    scene: 'portrait',
    prompt: `${P}. Formal studio portrait of a fictional young man with moustache in suit, mottled blue backdrop. Not a real person.`,
  },
  'sunset-roof': {
    file: 'sunset-roof.webp',
    alt: 'Sunset over hostel rooftops and water tanks',
    caption: 'Hostel roof, 6:40 pm',
    scene: 'sunset',
    prompt: `${P}. Orange sunset over hostel rooftops, water tanks and electric poles, silhouette of a student with a radio.`,
  },
  'camera-desk': {
    file: 'camera-desk.webp',
    alt: 'Film camera, film canisters and printed photographs on a desk',
    caption: 'Roll 02, before developing',
    scene: 'camera',
    prompt: `${P}. Close up of a vintage SLR film camera with film canisters and scattered printed photographs on a wooden desk.`,
  },
  'notebook': {
    file: 'notebook.webp',
    alt: 'Open notebook with sketches of ideas and circuit diagrams',
    caption: 'Someone’s idea, 2 am',
    scene: 'notebook',
    prompt: `${P}. Top-down view of an open ruled notebook with pencil sketches of an app idea and circuit diagrams, chai cup.`,
  },
  'friends-walk': {
    file: 'friends-walk.webp',
    alt: 'Three friends walking across campus holding notebooks',
    caption: 'Between labs',
    scene: 'students',
    prompt: `${P}. Three Indian college friends walking and laughing, holding notebooks, trees, 1980s fashion.`,
  },
  'problem-ideas': {
    file: 'problem-ideas.webp',
    alt: 'Students pinning handwritten idea cards onto a notice board',
    caption: 'The notice board nobody reads',
    scene: 'ideas',
    prompt: `${P}. Students pinning handwritten idea cards on a college corkboard notice board.`,
  },
  'problem-navigation': {
    file: 'problem-navigation.webp',
    alt: 'Hand-drawn campus map with paths and landmarks',
    caption: 'Which way to the workshop?',
    scene: 'map',
    prompt: `${P}. A fresher and parent looking at a painted campus map signboard, confused, college buildings behind.`,
  },
  'problem-mess': {
    file: 'problem-mess.webp',
    alt: 'Long queue of students with steel plates in a mess hall',
    caption: 'Queue at the mess counter',
    scene: 'mess',
    prompt: `${P}. Long queue of students holding steel thalis at a hostel mess counter, clock on the wall.`,
  },
  'problem-library': {
    file: 'problem-library.webp',
    alt: 'Stacks of bound project reports on library shelves',
    caption: 'Bound reports, 1979 — 1988',
    scene: 'library',
    prompt: `${P}. Dusty library shelves with stacks of bound engineering project reports, student searching.`,
  },
  'problem-leave': {
    file: 'problem-leave.webp',
    alt: 'Paper leave forms with rubber stamps and signatures piled on a desk',
    caption: 'Form 7B, in triplicate',
    scene: 'leave',
    prompt: `${P}. Pile of paper outpass forms with rubber stamps and signatures on a warden's desk, fountain pen.`,
  },
} satisfies Record<string, ImageSpec>

export type ImageKey = keyof typeof IMAGES

/* ---------- ARCHIVE (photo wall + film roll) ---------------------------- */

export const ARCHIVE: { image: ImageKey; label: string; frame: string }[] = [
  { image: 'students-discuss', label: 'SHOT 01', frame: '01A' },
  { image: 'gate', label: 'AIT / 1986', frame: '04' },
  { image: 'library-reader', label: 'ROLL 02', frame: '07' },
  { image: 'canteen', label: 'FRAME 17', frame: '17' },
  { image: 'portrait-studio', label: 'ID DAY', frame: '12A' },
  { image: 'classroom', label: 'SHOT 09', frame: '09' },
  { image: 'sunset-roof', label: 'LAST LIGHT', frame: '22' },
  { image: 'street', label: 'ROLL 03', frame: '28' },
  { image: 'friends-walk', label: 'FRAME 31', frame: '31' },
  { image: 'camera-desk', label: 'UNDEVELOPED', frame: '36' },
  { image: 'notebook', label: '2 AM', frame: '33A' },
  { image: 'hero-campus', label: 'AIT / 1986', frame: '00' },
]

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'challenge', label: 'The Challenge' },
  { id: 'problems', label: 'Problems' },
  { id: 'rules', label: 'Rules' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'cidc', label: 'About CIDC' },
  { id: 'register', label: 'Register' },
] as const
