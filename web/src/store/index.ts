import { Reducer, useEffect, useReducer } from 'react';
import { EffectNote } from '../core';
import { ActionType, Status, Store, Action, NoteHook } from './types';
import * as t from '../core/utils';
import { request } from '../utils/request';
import { Note } from '../core/types';
import { getSocket } from '../utils/socket';

const store: Store = {
    list: [],
    status: Status.DEFAULT,
    activeId: -1,
    category: 'all',
};

const reducer: Reducer<Store, Action> = (preState, action) => {
    switch (action.type) {
        case ActionType.INIT:
            return {
                ...preState,
                list: action.payload.list,
                activeId:
                    action.payload.list.length > 0
                        ? action.payload.list[0].id
                        : -1,
            };
        case ActionType.NEW:
            return {
                ...preState,
                list: [action.payload.item, ...preState.list],
                activeId: action.payload.item.id,
            };
        case ActionType.ACTIVE:
            return {
                ...preState,
                activeId: action.payload.activeId,
            };
        default:
            return preState;
    }
};

export function useNotesStore(): NoteHook {
    const [state, dispatch] = useReducer(reducer, store);

    useEffect(() => {
        request.get<Required<Note>[]>('/note/all').then(({ code, data }) => {
            // 从本地和远程获取数据
            if (code === 0) {
                dispatch({
                    type: ActionType.INIT,
                    payload: { list: data.map(note => new EffectNote(note)) },
                });
            }
        });

        getSocket().on('create', (note: Note) => {
            dispatch({
                type: ActionType.NEW,
                payload: { item: new EffectNote(note) },
            });
        });
    }, []);

    return [
        state,
        {
            create() {
                dispatch({
                    type: ActionType.NEW,
                    payload: { item: new EffectNote(t.note()) },
                });
            },
            active(id) {
                dispatch({
                    type: ActionType.ACTIVE,
                    payload: { activeId: id },
                });
            },
        },
    ];
}
