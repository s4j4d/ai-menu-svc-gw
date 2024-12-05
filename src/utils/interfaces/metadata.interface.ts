import Message from "./message.interface";

export interface Metadata {
    version: number;
    timestamp: number;
    requestId: string;
    correlationId: string;
    causationId: string;
    httpHeaders?: Record<string, string>;
    extra?: any; // used to pass any data
    pagination?: {
      limit?: number;
      offset?: number;
      total?: number;
    };
    user?: {
      id: string;
    //   positions: Position[];
    //   permissions?: Permission[];
    //   groups: {
    //     id: string;
    //     isDefault: boolean;
    //     organization?: { id: string };
    //     roles: { id: string; domain: string }[];
    //     extraData?: Record<string, string>;
    //     type?: string;
    //   }[];
    };
    messages?: Message[];
    traceData?: {
      esSpanId: string;
      traceId: string;
    };
  }