import Delta from 'quill-delta';
import * as t from './utils';
import type { EditEvent, Note, Packet } from './types';
import { SerialSync } from './serial-sync';
import { concatParamsThrottle } from '../utils/func';

export class EffectNote {
    static _id = 0;

    id = EffectNote._id++;
    value = '';
    delta!: Delta;
    serialSync = new SerialSync();

    constructor(public note: Note) {
        this.value = t.packetsToString(note.content);
        this.delta = new Delta().insert(this.value);

        this.serialSync.socket.on(
            'edit',
            ({ version, id, packets }: EditEvent) => {
                if (id === this.note._id) {
                    this.patch(packets, version);
                }
            }
        );

        if (note._id === undefined) {
            this.syncNote();
        } else {
            this.syncPackets(note.content.filter(p => p.version === undefined));
        }
    }

    get title(): string {
        return t.splitHTML(this.value)[0] ?? '新建便签';
    }

    get description(): string {
        return t.splitHTML(this.value)[1] ?? '';
    }

    get image(): string {
        return t.pickImgUrlFromHTML(this.value)[0] ?? '';
    }

    private syncPackets = concatParamsThrottle(
        async (packets: Packet[]) => {
            if (packets.length === 0) {
                return;
            }

            this.serialSync.syncTask(() => [
                'edit',
                {
                    id: this.note._id!,
                    packets,
                    version: this.note.version!,
                },
                ([version, diffPackets]: [number, Packet[]]) => {
                    packets.forEach(packet => (packet.version = version));

                    this.patch(diffPackets, version);
                },
            ]);
        },
        500,
        {
            leading: true,
            trailing: true,
        }
    );

    private syncNote() {
        this.serialSync.syncTask([
            'create',
            this.note,
            (note: Required<Note>) => {
                this.note = {
                    ...note,
                    content: this.note.content,
                };
            },
        ]);
    }

    private patch(packets: Packet[], version: number) {
        this.note.content = t.mergePacketsTo(packets, this.note.content);
        this.value = t.packetsToString(this.note.content);
        this.delta = new Delta().insert(this.value);
        this.note.version = version;

        this.onPatch?.(this.value);
    }

    onPatch: undefined | ((value: string) => void);

    ot(txt: string) {
        const delta = new Delta().insert(txt);
        const { ops } = this.delta.diff(delta);
        const packet = t.packet(ops);

        this.delta = delta;
        this.value = txt;

        this.note.content.push(packet);

        this.syncPackets([packet]);
    }

    clone(): EffectNote {
        return { ...this };
    }
}
