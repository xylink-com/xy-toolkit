/**       类型与接口       **/

export type keyType = string;
export type valueType = any;

export interface bucketType {
  content: Map<keyType, valueType> | undefined;
}
