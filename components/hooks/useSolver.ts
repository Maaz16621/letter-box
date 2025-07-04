// /* hooks/useSolver.ts */
// import { useEffect, useRef, useState } from 'react'
// import SolverWorker from '../workers/solver.worker'

// export function useSolver() {
//   const workerRef = useRef<Worker>()
//   const [solutions, setSolutions] = useState<string[]>([])
//   const [loading,   setLoading]   = useState(false)

//   useEffect(() => {
//     workerRef.current = new SolverWorker()

//     workerRef.current.onmessage = (e) => {
//       setSolutions(e.data)
//       setLoading(false)
//     }

//     return () => workerRef.current?.terminate()
//   }, [])

//   const solve = (payload: {
//     userLetters: string[]
//     wordLength: number
//     dictionary: string[]
//   }) => {
//     setLoading(true)
//     setSolutions([])
//     workerRef.current?.postMessage(payload)
//   }

//   return { solutions, loading, solve }
// }
