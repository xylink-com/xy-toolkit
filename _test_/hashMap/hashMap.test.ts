import { HashMap } from "../../src";

const hashMap = new HashMap(4);

describe("hashmap functions", () => {
  it("should set/get func work", () => {
    hashMap.set("cat", "animal");
    const dog = hashMap.get("dog");
    const cat = hashMap.get("cat");
    expect(dog).toBe(undefined);
    expect(cat).toBe("animal");
  });

  it("should has and forEach work", () => {
    hashMap.set("cat", "animal");
    hashMap.set("pig", "animal");
    hashMap.set("mouse", "animal");
    hashMap.set("pink", "color");
    expect(hashMap.has("cat")).toBeTruthy();
    expect(hashMap.has("dog")).toBeFalsy();
    hashMap.forEach((k, v) => {
      console.log("==>", `${k}⇒${v}`);
    });
    expect(hashMap.size()).toBe(4);
    console.log("buckets: ", hashMap.countBuckets());
  });

  it("should toArray work", () => {
    hashMap.set("cat", "animal");
    hashMap.set("pig", "animal");
    hashMap.set("mouse", "animal");
    hashMap.set("pink", "color");
    const layout = hashMap.toArray();
    const layout2 = hashMap.toObject();
    console.log("==>", { layout, layout2 });
    hashMap.delete("cat");
    expect(hashMap.has("cat")).toBeFalsy();
  });

  it("should keys, values, entries work", () => {
    hashMap.set("cat", "animal cat");
    hashMap.set("pig", "animal pig");
    hashMap.set("mouse", "animal mouse");
    hashMap.set("pink", "color pink");
    hashMap.set("red", "color red");
    hashMap.set("white", "color white");
    console.log("==>", hashMap.keys());
    console.log("==>", hashMap.values());
    console.log("==>", hashMap.entries());
  });
});
