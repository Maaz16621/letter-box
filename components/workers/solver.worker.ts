
/// <reference lib="webworker" />
export default {} // ← keeps TS happy; actual code is below

if (typeof self !== 'undefined') {
  const ctx: DedicatedWorkerGlobalScope = self as any
self.onmessage = async function (event) {
    const { userLetters, wordLength, dictionary } = event.data;

    // Validate userLetters
    if (!Array.isArray(userLetters)) {
        console.error("Expected userLetters to be an array");
        return;
    }

    const upperUserLetters = userLetters.map(letter => letter.toUpperCase());
    let solutions;

    switch (wordLength) {
        case 1:
            solutions = await findTwelveLetterWords(upperUserLetters, dictionary);
            break;
        case 2:
            solutions = await findTwoWordSolutions(upperUserLetters, dictionary);
            break;
        case 3:
            solutions = await findThreeWordSolutions(upperUserLetters, dictionary);
            break;
        default:
            solutions = await findTwelveLetterWords(upperUserLetters, dictionary);
            return;
    }

    self.postMessage(solutions);
};

const trie = {};

// Build Trie from dictionary
function buildTrie(dictionary) {
    for (const word of dictionary) {
        let node = trie;
        for (const letter of word) {
            if (!node[letter]) node[letter] = {};
            node = node[letter];
        }
        node.isWord = true;
    }
}

function findValidWords(userLetters, dictionary) {
    const validWords = new Set();

    for (const word of dictionary) {
        if (canFormWord(word.toUpperCase(), userLetters)) {
            validWords.add(word);
        }
    }

    return Array.from(validWords);
}
function canFormWord(targetWord, availableLetters) {
    if (typeof targetWord !== 'string' || !Array.isArray(availableLetters)) {
        throw new Error('Invalid input: Target word must be a string, available letters must be an array.');
    }

    const letterPool = new Set(availableLetters);
    return [...targetWord].every(letter => letterPool.has(letter));
}

async function findTwelveLetterWords(userLetters, dictionary) {
    const validTwelveLetterWords = [];

    for (const word of dictionary) {
        if (word.length === 12 && canFormTwelveLetterWord(word.toUpperCase(), userLetters)) {
            validTwelveLetterWords.push(word);
        }
    }

    return validTwelveLetterWords;
}

function canFormTwelveLetterWord(word, userLetters) {
    const letterGroups = groupLetters(userLetters);
    const letterCount = {};
    
    for (const letter of word) {
        if (!userLetters.includes(letter)) return false;
        
        const groupIndex = letterGroups.findIndex(group => group.includes(letter));
        if (groupIndex === -1) return false; // Not found in groups

        letterCount[groupIndex] = (letterCount[groupIndex] || 0) + 1;
        if (letterCount[groupIndex] >= 3) return false;
    }
    return true;
}

const letterGroupsCache = new Map();

function groupLetters(userLetters) {
    const cacheKey = userLetters.join('');
    if (letterGroupsCache.has(cacheKey)) {
        return letterGroupsCache.get(cacheKey);
    }

    const groups = [];
    for (let i = 0; i < userLetters.length; i += 3) {
        groups.push(userLetters.slice(i, i + 3));
    }
    letterGroupsCache.set(cacheKey, groups);
    return groups;
}

function hasNoAdjacentSameGroup(word, letterGroups) {
    const currentGroup = letterGroups.map(() => null);

    for (let i = 0; i < word.length - 1; i++) {
        const currentLetter = word[i].toUpperCase();
        const nextLetter = word[i + 1].toUpperCase();

        const currentGroupIndex = letterGroups.findIndex(group => group.includes(currentLetter));
        const nextGroupIndex = letterGroups.findIndex(group => group.includes(nextLetter));

        if (currentGroupIndex === nextGroupIndex) {
            return false;
        }
    }
    return true;
}

async function findTwoWordSolutions(userLetters, dictionary) {
    const validWords = await findValidWords(userLetters, dictionary);
    const pairedWords = new Set();
    const letterGroups = groupLetters(userLetters);
    
    await Promise.all(
        validWords.map(async (word1) => {
            if (!hasNoAdjacentSameGroup(word1, letterGroups)) return; // Skip if the first word has adjacent issues

            for (const word2 of validWords) {
                if (word1 !== word2 && hasNoAdjacentSameGroup(word2, letterGroups) && canPairWords(word1, word2, userLetters)) {
                    pairedWords.add(`${word1} → ${word2}`);
                }
            }
        })
    );

    return Array.from(pairedWords);
}

function canPairWords(word1, word2, userLetters) {
    if (word1[word1.length - 1] !== word2[0]) return false;

    const userLetterSet = new Set(userLetters.map(letter => letter.toUpperCase()));
    const combinedWord = (word1 + word2).toUpperCase();
    const combinedLetterSet = new Set(combinedWord);

    return [...userLetterSet].every(letter => combinedLetterSet.has(letter));
}

async function findThreeWordSolutions(userLetters, dictionary) {
    const validWords = await findValidWords(userLetters, dictionary);
    const pairedWords = new Set();
    const letterGroups = groupLetters(userLetters);

    for (const word1 of validWords) {
        if (!hasNoAdjacentSameGroup(word1, letterGroups)) continue;

        for (const word2 of validWords) {
            
            if (!hasNoAdjacentSameGroup(word2, letterGroups) || !canPairWords(word1, word2, userLetters)) {
                continue;
            }

            for (const word3 of validWords) {
            
                if (hasNoAdjacentSameGroup(word3, letterGroups) && canTripleWords(word1, word2, word3, userLetters)) {
                    pairedWords.add(`${word1} → ${word2} → ${word3}`);
                }
            }
        }
    }

    return Array.from(pairedWords);
}
function canTripleWords(word1, word2, word3, userLetters) {
    const lastLetterOfWord1 = word1.slice(-1).toUpperCase(); 
    const firstLetterOfWord2 = word2.charAt(0).toUpperCase(); 
    const lastLetterOfWord2 = word2.slice(-1).toUpperCase(); 
    const firstLetterOfWord3 = word3.charAt(0).toUpperCase(); 
    const lastLetterOfWord3 = word3.slice(-1).toUpperCase(); 

    // Ensure the chain rules are followed and check letter inclusion
    return (
        firstLetterOfWord2 === lastLetterOfWord1 &&
        firstLetterOfWord3 === lastLetterOfWord2 &&
        [...word3.toUpperCase()].every(letter => userLetters.includes(letter)) &&
        [...word2.toUpperCase()].every(letter => userLetters.includes(letter)) // Ensure word2 is also checked
    );
}
}