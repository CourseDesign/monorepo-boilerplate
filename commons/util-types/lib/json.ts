type JsonObject = {
  [key: string]: Json;
};

type Json = string | number | null | undefined | JsonObject | Json[];

export default Json;
