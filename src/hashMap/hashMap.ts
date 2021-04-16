import config from "./hashMap.config";
import { keyType, valueType, bucketType } from "./hashMap.type";

// note: Simple hashMap that implements by Array and Map.

const { initConfig } = config;

class HashMap {
  // buckets stores key-values.
  protected buckets: null | Array<bucketType>;
  // collisions means one buckets with more than 1 key-values.
  protected collisions: number = 0;
  protected opacity: number = 0;

  constructor(opacity: number = initConfig.opacity) {
    this.opacity = opacity;
    this.buckets = new Array(opacity);
  }

  private hash(key: keyType) {
    let hval = initConfig.hashSeed;
    for (let i = 0; i < key.length; i++) {
      hval ^= key.charCodeAt(i);
      hval +=
        (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    return hval >>> 0;
  }

  private indexOf(key: keyType) {
    const hash: number = Number(this.hash(key));
    return hash % this.opacity;
  }

  set(key: keyType, value: valueType) {
    // find the bucket that key belongs to.
    const index: number = this.indexOf(key);
    // add key-values to the buckets, init a new Map for that bucket if the bucket is empty.
    if (!this.valueOf(index)) {
      this.buckets[index] = {
        content: new Map(),
      };
    }
    this.buckets[index]["content"].set(key, value);
    // increases collisions count
    if (this.isCollisions(index)) {
      this.collisions++;
    }
    // for linked conference
    return this;
  }

  get(key: keyType): valueType {
    const index: number = this.indexOf(key);
    const bucketContent = this.valueOf(index);
    return bucketContent?.get(key);
  }

  has(key: keyType): boolean {
    const index: number = this.indexOf(key);
    const bucketContent = this.valueOf(index);
    return bucketContent.has(key);
  }

  // count k-vs for all buckets.
  size() {
    // loop buckets and count keys in bucket content
    let count = 0;
    this.forEach(() => count++);
    return count;
  }

  // count buckets that are not empty
  countBuckets() {
    let count = 0;
    for (let i = 0; i < this.opacity; i++) {
      if (!this.isEmpty(i)) count++;
    }
    return count;
  }

  // if a bucket is empty
  private isEmpty(index: number) {
    const content = this.valueOf(index);
    if (!content || content.size === 0) return true;
    else return false;
  }

  // if the buckets collisions
  private isCollisions(index: number) {
    return this.valueOf(index).size > 1;
  }

  // bucket content
  private valueOf(index: number) {
    return this.buckets[index]?.content;
  }

  keys() {
    let keys = [];
    this.forEach((k) => {
      keys.push(k);
    });
    return keys;
  }

  values() {
    let values = [];
    this.forEach((_, v) => {
      values.push(v);
    });
    return values;
  }

  entries() {
    let entries = [];
    this.forEach((key, value) => {
      entries.push({ key, value });
    });
    return entries;
  }

  // loop for k-vs
  forEach(cb: (key: keyType, value: valueType) => void): void {
    for (let i = 0; i < this.opacity; i++) {
      if (!this.isEmpty(i)) {
        const content = this.valueOf(i);
        content.forEach((v, k) => cb(k, v));
      }
    }
  }

  delete(key: keyType) {
    const index: number = this.indexOf(key);
    if (!this.isEmpty(index)) {
      const content = this.valueOf(index);
      if (content.has(key)) {
        content.delete(key);
        return this;
      }
    }
    return undefined;
  }

  clear() {
    this.buckets = new Array(this.opacity);
  }

  // keys layout in object
  toObject() {
    let layout = {};
    for (let i = 0; i < this.opacity; i++) {
      if (this.isEmpty(i)) {
        layout[i] = [];
      } else {
        const content = this.valueOf(i);
        layout[i] = Array.from(content.keys());
      }
    }
    return layout;
  }

  // keys layout in array
  toArray() {
    let layout = [];
    for (let i = 0; i < this.opacity; i++) {
      if (this.isEmpty(i)) {
        layout.push([]);
      } else {
        const content = this.valueOf(i);
        layout.push(Array.from(content.keys()));
      }
    }
    return layout;
  }
}

const hashMap: HashMap = new HashMap();

export { hashMap };
export default HashMap;
