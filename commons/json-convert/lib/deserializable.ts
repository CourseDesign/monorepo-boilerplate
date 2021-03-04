interface Deserializable<T> {
  from(plain: unknown): T;
}

export default Deserializable;
