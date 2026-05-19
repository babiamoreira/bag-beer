import { useReducer, useEffect } from 'react'

type Suit = '♠' | '♥' | '♦' | '♣'
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | 'J' | 'Q' | 'K'
type Card = { rank: Rank; suit: Suit }

const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', 'J', 'Q', 'K']
const SUITS: Suit[] = ['♠', '♥', '♦', '♣']
const RED_SUITS = new Set<Suit>(['♥', '♦'])

const MEANINGS: Record<Rank, { title: string; detail?: string }> = {
  A:   { title: 'Distribua 1 gole' },
  '2': { title: 'Distribua 2 goles' },
  '3': { title: 'Distribua 3 goles' },
  '4': { title: 'Beba 2 goles' },
  '5': { title: 'Eu nunca' },
  '6': { title: 'Crie uma regra', detail: 'Quem quebrar a regra, bebe' },
  '7': { title: 'Quebra regras', detail: 'Todas as regras ativas são canceladas' },
  '8': { title: 'Mão na mesa!', detail: 'O último a colocar a mão na mesa bebe' },
  J:   { title: 'Todos bebem' },
  Q:   { title: 'Mulheres bebem' },
  K:   { title: 'Homens bebem' },
}

function buildDeck(): Card[] {
  const deck: Card[] = []
  for (const rank of RANKS) {
    for (const suit of SUITS) {
      deck.push({ rank, suit })
      deck.push({ rank, suit })
    }
  }
  return deck
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type State = {
  deck: Card[]
  index: number
  currentCard: Card | null
  cardKey: number
  reshuffled: boolean
}

type Action = 'DRAW' | 'CLEAR_RESHUFFLE'

function init(): State {
  return { deck: shuffle(buildDeck()), index: 0, currentCard: null, cardKey: 0, reshuffled: false }
}

function reducer(state: State, action: Action): State {
  if (action === 'DRAW') {
    let { deck, index } = state
    let reshuffled = false
    if (index >= deck.length) {
      deck = shuffle(buildDeck())
      index = 0
      reshuffled = true
    }
    return { deck, index: index + 1, currentCard: deck[index], cardKey: state.cardKey + 1, reshuffled }
  }
  if (action === 'CLEAR_RESHUFFLE') {
    return { ...state, reshuffled: false }
  }
  return state
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, null, init)
  const { currentCard, cardKey, reshuffled } = state
  const remaining = state.deck.length - state.index

  useEffect(() => {
    if (!reshuffled) return
    const id = setTimeout(() => dispatch('CLEAR_RESHUFFLE'), 2000)
    return () => clearTimeout(id)
  }, [reshuffled])

  const isRed = currentCard ? RED_SUITS.has(currentCard.suit) : false
  const meaning = currentCard ? MEANINGS[currentCard.rank] : null
  const colorClass = isRed ? 'text-red-500' : 'text-gray-900'

  return (
    <div
      className="flex flex-col h-full bg-[#0f0a1a] text-white cursor-pointer"
      onClick={() => dispatch('DRAW')}
    >
      <header className="flex justify-between items-center px-6 py-4 shrink-0">
        <div className="flex items-center gap-2">
          <img src="/icon.svg" alt="" className="w-8 h-8 rounded-lg" />
          <span className="text-amber-400 font-bold text-base tracking-widest uppercase">bag-beer</span>
        </div>
        <span className="text-white/40 text-sm tabular-nums">{remaining} cartas</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-8 overflow-hidden">
        <div className="w-full max-w-[220px]">
          {currentCard === null ? (
            <div className="aspect-[2/3] rounded-2xl bg-[#111111] border border-[#F5C518]/15 flex flex-col items-center justify-center gap-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] py-8">
              <svg viewBox="190 155 360 385" xmlns="http://www.w3.org/2000/svg" className="w-3/4">
                <g transform="translate(340, 340)">
                  <path d="M-110,-130 L-120,150 L100,150 L110,-130 Z" fill="#F5C518"/>
                  <path d="M110,-60 Q185,-60 185,20 Q185,100 110,100" fill="none" stroke="#F5C518" strokeWidth="28" strokeLinecap="round"/>
                  <path d="M110,-22 Q152,-22 152,20 Q152,62 110,62" fill="none" stroke="#111111" strokeWidth="14" strokeLinecap="round"/>
                  <rect x="-120" y="150" width="220" height="16" rx="6" fill="#D4A800"/>
                  <ellipse cx="-20" cy="-130" rx="92" ry="22" fill="#FFFBE6"/>
                  <ellipse cx="-55" cy="-146" rx="32" ry="20" fill="#FFFBE6"/>
                  <ellipse cx="-18" cy="-152" rx="26" ry="18" fill="#FFFBE6"/>
                  <ellipse cx="20" cy="-148" rx="22" ry="16" fill="#FFFBE6"/>
                  <ellipse cx="52" cy="-140" rx="28" ry="17" fill="#FFFBE6"/>
                  <rect x="-80" y="-110" width="18" height="200" rx="9" fill="#FFFFFF" opacity="0.10"/>
                  <circle cx="-30" cy="80" r="5" fill="#D4A800" opacity="0.5"/>
                  <circle cx="10" cy="30" r="4" fill="#D4A800" opacity="0.4"/>
                  <circle cx="-60" cy="10" r="3" fill="#D4A800" opacity="0.35"/>
                  <circle cx="50" cy="70" r="4" fill="#D4A800" opacity="0.4"/>
                </g>
              </svg>
              <div className="text-center">
                <p className="text-white font-black text-xl tracking-tight">
                  bag<span className="text-[#F5C518]">-</span>beer
                </p>
                <p className="text-white/25 text-xs mt-1 tracking-widest uppercase">Toque para iniciar</p>
              </div>
            </div>
          ) : (
            <div
              key={cardKey}
              className="card-flip aspect-[2/3] rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative"
            >
              <div className={`absolute top-3 left-4 leading-none ${colorClass}`}>
                <div className="text-2xl font-bold">{currentCard.rank}</div>
                <div className="text-lg leading-none mt-0.5">{currentCard.suit}</div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-8xl ${colorClass}`}>{currentCard.suit}</span>
              </div>

              <div className={`absolute bottom-3 right-4 leading-none rotate-180 ${colorClass}`}>
                <div className="text-2xl font-bold">{currentCard.rank}</div>
                <div className="text-lg leading-none mt-0.5">{currentCard.suit}</div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center min-h-[72px] flex flex-col items-center justify-center">
          {meaning ? (
            <div key={`m-${cardKey}`} className="meaning-fade">
              <p className="text-2xl font-bold text-white leading-tight">{meaning.title}</p>
              {meaning.detail && (
                <p className="text-white/40 text-sm mt-2 leading-snug">{meaning.detail}</p>
              )}
            </div>
          ) : (
            <p className="text-white/20 text-sm">Toque na tela para virar uma carta</p>
          )}
        </div>
      </main>

      <footer className="shrink-0 pb-8 text-center text-white/20 text-xs tracking-wider">
        {currentCard ? 'toque para a próxima carta' : ''}
      </footer>

      {reshuffled && (
        <div className="toast fixed bottom-24 left-1/2 bg-amber-500 text-black text-sm font-bold px-5 py-2 rounded-full whitespace-nowrap z-50 pointer-events-none">
          Baralho embaralhado!
        </div>
      )}
    </div>
  )
}
