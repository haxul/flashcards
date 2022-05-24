class Node {
    val = null
    next = null
    prev = null

    constructor(val, prev, next) {
        this.val = val
        this.prev = prev
        this.next = next
    }
}

class LinkedList {
    _size = 0
    _head = new Node()
    _tail = new Node()


    addFirst(val) {
        if (this.isEmpty()) {
            const node = new Node(val, null, null)
            this._head = node
            this._tail = node
        } else {
            this._head.prev = new Node<T>(val, null, this._head);
            this._head = this._head.prev;
        }
        this._size++;
    }

    isEmpty() {
        return this._size === 0
    }

    size() {
        return this._size
    }

    removeFirst() {
        if (this.isEmpty()) return null;
        const val = this._head.val;
        this._head = this._head.next;
        --this._size;
        if (this.isEmpty()) this._tail = null;
        else this._head.prev = null;
        return val;
    }

    addLast(val) {
        if (this.isEmpty()) {
            const node = new Node(val, null, null)
            this._tail = node
            this._head = node
        } else {
            this._tail.next = new Node(val, this._tail, null);
            this._tail = this._tail.next;
        }
        this._size++;
    }

    removeLast() {
        if (this.isEmpty()) return null
        const val = this._tail.val;
        this._tail = this._tail.prev;
        --this._size;
        if (this.isEmpty()) this._head = null;
        else this._tail.next = null;
        return val
    }
}

module.exports = {LinkedList}