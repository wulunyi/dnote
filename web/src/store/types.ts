import { EffectNote } from '../core';

export enum Status {
    DEFAULT,
    LOADING,
    ERROR,
}

export interface Store {
    status: Status;
    list: EffectNote[];
    activeId: number;
    category: string;
}

export enum ActionType {
    INIT,
    NEW,
    INSERT,
    DELETE,
    ACTIVE,
}

export interface BaseAction {
    type: Action['type'];
}

export interface InitAction extends BaseAction {
    type: ActionType.INIT;
    payload: {
        list: EffectNote[];
    };
}

export interface NewAction extends BaseAction {
    type: ActionType.NEW;
    payload: {
        item: EffectNote;
    };
}

export interface ActiveAction extends BaseAction {
    type: ActionType.ACTIVE;
    payload: {
        activeId: number;
    };
}

export type Action = InitAction | NewAction | ActiveAction;

export type NoteHook = [
    Store,
    {
        create: () => void;
        active: (id: number) => void;
    }
];
