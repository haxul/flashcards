/* to find words by prefix

 */

class Trie {
    _root = {"$": false}

    addAll(words) {
        for (let i = 0; i < words.length; i++) {
            this.add(words[i])
        }
    }

    add(word) {
        let cur = this._root
        for (let i = 0; i < word.length; i++) {
            const ch = word[i]
            if (ch === "$") throw new Error("the word cannot contain $ symbol")
            if (!(ch in cur)) {
                cur[ch] = {"$": false}
            }
            cur = cur[ch]
        }

        cur["$"] = true
    }

    findWordsWithPrefix(prefix) {
        const node = this._findNodeWithPrefix(prefix)
        if (!node) return []

        return this._collectWords(node, prefix)
    }

    _collectWords(node, cur, arr = []) {
        if (!node) return arr

        if (Object.keys(node) === 0) return arr

        if (node["$"]) arr.push(cur)

        if (Object.keys(node).length === 1) {
            return arr
        }

        for (let letter in node) {
            if (letter === "$") continue
            const nxtNode = node[letter]
            this._collectWords(nxtNode, cur + letter, arr)
        }

        return arr
    }

    _findNodeWithPrefix(prefix) {
        if (!prefix) return null

        let cur = this._root

        for (let i = 0; i < prefix.length; i++) {
            const ch = prefix[i]
            if (ch in cur) cur = cur[ch]
            else return null
        }

        return cur
    }
}

module.exports = {Trie}