import { List } from "lodash";


export interface Message {
    idMessage?: string;
    idEmmetteur: string;
    Message: string;
    Like: [string];
    }
    