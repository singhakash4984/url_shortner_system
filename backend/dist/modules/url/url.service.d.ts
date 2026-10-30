import type { CreateUrlInput } from "./url.schema.js";
import type { urlRow } from "../../shared/types/url.type.js";
export declare const createUrl: (data: CreateUrlInput, userId: string) => Promise<urlRow>;
export declare const getUrl: (alias: string) => Promise<any>;
export declare const deleteUrl: (alias: string) => Promise<any>;
//# sourceMappingURL=url.service.d.ts.map