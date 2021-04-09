<!-- ---
order: 2
nav:
  title: 文档3
  order: 2
--- -->

# Sign

sign is a method to get the SDK signature.

## example

```ts
const obj = {
  method: string,
  url: string,
  token: string,
  body: string,
};

const signature = sign(obj);
```

## API

### method

#### 1. sign(obj)

get the SDk signature
