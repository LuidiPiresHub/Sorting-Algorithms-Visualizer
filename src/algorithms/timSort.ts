import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

interface IRun {
  start: number;
  end: number;
}

let minGallop = 7

const reverse = (array: number[], start: number, end: number): void => {
  while (start < end) {
    recordAlgorithmFrame({ type: 'swap', indexA: start, indexB: end })
    swap(array, start++, end--)
  }
}

const getMinRun = (n: number): number => {
  let hasRemainder = 0

  while (n >= 64) {
    hasRemainder = hasRemainder || n % 2
    n = Math.floor(n / 2)
  }

  return n + hasRemainder
}

const gallopBackward = (array: number[], target: number, start: number, end: number): number => {
  let exp = 1
  while (end - exp > start && array[end - exp] > target) {
    exp *= 2
  }

  let i = Math.max(end - exp, start)
  let j = end - Math.floor(exp / 2)

  while (i <= j) {
    const mid = Math.floor((i + j) / 2)

    if (array[mid] > target) {
      j = mid - 1
    } else {
      i = mid + 1
    }
  }

  return Math.max(i, start)
}

const gallopForward = (array: number[], target: number, start: number, end: number): number => {
  let exp = 1
  while (start + exp < end && array[start + exp] < target) {
    exp *= 2
  }

  let i = start + Math.floor(exp / 2)
  let j = Math.min(start + exp, end - 1)

  while (i <= j) {
    const mid = Math.floor((i + j) / 2)

    if (array[mid] < target) {
      i = mid + 1
    } else {
      j = mid - 1
    }
  }

  return Math.min(i, end)
}

const mergeBackward = (array: number[], aux: number[], leftRun: IRun, rightRun: IRun): void => {
  let i = leftRun.end - 1
  let j = rightRun.end - 1
  let k = rightRun.end - 1

  let leftWins = 0
  let rightWins = 0

  for (let t = rightRun.start; t < rightRun.end; t++) {
    aux[t] = array[t]
  }

  // ========================= Visual =========================

  let iVisual = leftRun.end - 1
  let jVisual = rightRun.end - 1

  while (iVisual >= leftRun.start && jVisual >= rightRun.start) {
    recordAlgorithmFrame({ type: 'compare', indices: [iVisual, jVisual] })
    if (array[iVisual] > aux[jVisual]) iVisual--
    else jVisual--
  }

  // ==========================================================

  while (i >= leftRun.start && j >= rightRun.start) {
    if (array[i] > aux[j]) {
      recordAlgorithmFrame({ type: 'set', index: k, value: array[i] })
      array[k--] = array[i--]
      leftWins++
      rightWins = 0
    } else {
      recordAlgorithmFrame({ type: 'set', index: k, value: aux[j] })
      array[k--] = aux[j--]
      rightWins++
      leftWins = 0
    }

    if (leftWins >= minGallop || rightWins >= minGallop) {
      if (leftWins >= minGallop) {
        const dest = gallopBackward(array, aux[j], leftRun.start, i)
        const copied = i - dest

        while (i >= dest) {
          recordAlgorithmFrame({ type: 'set', index: k, value: array[i] })
          array[k--] = array[i--]
        }

        minGallop += copied > 1 ? -1 : 1
        minGallop = Math.max(minGallop, 1)
      } else {
        const dest = gallopBackward(aux, array[i], rightRun.start, j)
        const copied = j - dest

        while (j >= dest) {
          recordAlgorithmFrame({ type: 'set', index: k, value: aux[j] })
          array[k--] = aux[j--]
        }

        minGallop += copied > 1 ? -1 : 1
        minGallop = Math.max(minGallop, 1)
      }

      leftWins = 0
      rightWins = 0
    }
  }

  while (j >= rightRun.start) {
    recordAlgorithmFrame({ type: 'set', index: k, value: aux[j] })
    array[k--] = aux[j--]
  }
}

const mergeForward = (array: number[], aux: number[], leftRun: IRun, rightRun: IRun): void => {
  let i = leftRun.start
  let j = rightRun.start
  let k = leftRun.start

  let leftWins = 0
  let rightWins = 0

  for (let t = leftRun.start; t < leftRun.end; t++) {
    aux[t] = array[t]
  }

  // ========================= Visual =========================

  let iVisual = leftRun.start
  let jVisual = rightRun.start

  while (iVisual < leftRun.end && jVisual < rightRun.end) {
    recordAlgorithmFrame({ type: 'compare', indices: [iVisual, jVisual] })
    if (aux[iVisual] <= array[jVisual]) iVisual++
    else jVisual++
  }

  // ==========================================================

  while (i < leftRun.end && j < rightRun.end) {
    if (aux[i] <= array[j]) {
      recordAlgorithmFrame({ type: 'set', index: k, value: aux[i] })
      array[k++] = aux[i++]
      leftWins++
      rightWins = 0
    } else {
      recordAlgorithmFrame({ type: 'set', index: k, value: array[j] })
      array[k++] = array[j++]
      rightWins++
      leftWins = 0
    }

    if (leftWins >= minGallop || rightWins >= minGallop) {
      if (leftWins >= minGallop) {
        const dest = gallopForward(aux, array[j], i, leftRun.end)
        const copied = dest - i

        while (i < dest) {
          recordAlgorithmFrame({ type: 'set', index: k, value: aux[i] })
          array[k++] = aux[i++]
        }

        minGallop += copied > 1 ? -1 : 1
        minGallop = Math.max(minGallop, 1)
      } else {
        const dest = gallopForward(array, aux[i], j, rightRun.end)
        const copied = dest - j

        while (j < dest) {
          recordAlgorithmFrame({ type: 'set', index: k, value: array[j] })
          array[k++] = array[j++]
        }

        minGallop += copied > 1 ? -1 : 1
        minGallop = Math.max(minGallop, 1)
      }

      leftWins = 0
      rightWins = 0
    }
  }

  while (i < leftRun.end) {
    recordAlgorithmFrame({ type: 'set', index: k, value: aux[i] })
    array[k++] = aux[i++]
  }
}

const merge = (array: number[], aux: number[], leftRun: IRun, rightRun: IRun): IRun => {
  const lenLeft = leftRun.end - leftRun.start
  const lenRight = rightRun.end - rightRun.start

  if (lenLeft <= lenRight) {
    mergeForward(array, aux, leftRun, rightRun)
  } else {
    mergeBackward(array, aux, leftRun, rightRun)
  }

  return { start: leftRun.start, end: rightRun.end }
}

const fixInvariants = (array: number[], aux: number[], stack: IRun[]): void => {
  while (stack.length >= 2) {
    const n = stack.length

    const Z = stack[n - 1]
    const Y = stack[n - 2]
    const X = stack[n - 3] ?? null

    const lenZ = Z.end - Z.start
    const lenY = Y.end - Y.start
    const lenX = X ? X.end - X.start : Infinity

    const shouldMergeXY = lenX <= lenY + lenZ && lenX < lenZ
    const shouldMerge = lenY <= lenZ || lenX <= lenY + lenZ

    if (!shouldMerge) break

    if (shouldMergeXY && X) {
      stack.splice(n - 3, 2, merge(array, aux, X, Y))
    } else {
      stack.splice(n - 2, 2, merge(array, aux, Y, Z))
    }
  }
}

const insertionSortRange = (array: number[], start: number, end: number): void => {
  for (let i = start + 1; i < end; i++) {
    const value = array[i]
    let j = i - 1

    while (j >= start && array[j] > value) {
      recordAlgorithmFrame({ type: 'set', index: j + 1, value: array[j] })
      array[j + 1] = array[j]
      j--
    }

    array[j + 1] = value
    recordAlgorithmFrame({ type: 'set', index: j + 1, value })
  }
}

const detectRuns = (array: number[], aux: number[], minRun: number): IRun[] => {
  const n = array.length
  const runs: IRun[] = []
  let start = 0

  while (start < n) {
    let end = start + 1

    if (end >= n) {
      runs.push({ start, end });
      break;
    }

    const isAscending = array[start] <= array[end]

    if (isAscending) {
      while (end < n && array[end - 1] <= array[end]) end++
    } else {
      while (end < n && array[end - 1] > array[end]) end++
      reverse(array, start, end - 1)
    }

    const runSize = end - start

    if (runSize <= minRun) {
      const newEnd = Math.min(start + minRun, n)
      insertionSortRange(array, start, newEnd)
      end = newEnd
    }

    runs.push({ start, end })
    fixInvariants(array, aux, runs)
    start = end
  }

  return runs
}

export const timSort = (array: number[]): void => {
  const n = array.length
  const aux = new Array(Math.ceil(n / 2))
  const MIN_RUN = getMinRun(n)
  const MIN_GALLOP = 7
  minGallop = MIN_GALLOP
  const stack = detectRuns(array, aux, MIN_RUN)

  while (stack.length > 1) {
    const rightStack = stack.pop()!
    const leftStack = stack.pop()!
    stack.push(merge(array, aux, leftStack, rightStack))
  }
}
