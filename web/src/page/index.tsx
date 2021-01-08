import { Button, Input, List } from 'antd';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    MenuOutlined,
    SearchOutlined,
    FileTextOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import { useNotesStore } from '../store';
import { CATEGORY_OPTIONS } from './constans';
import Editor from '../components/Editor';
import { timeToNormalStr } from '../utils/date';

import './index.less';

export default function NotePanel(): JSX.Element {
    const [inputWidth, setInputWidth] = useState(180);
    const [folder, setFolder] = useState(false);
    const [store, { create: newNote, active }] = useNotesStore();
    const [value, setValue] = useState('');

    const effectNote = store.list.find(item => item.id === store.activeId);

    useEffect(() => {
        if (effectNote) {
            effectNote.onPatch = value => {
                setValue(value);
            };
        }
    }, [effectNote]);

    useEffect(() => {
        setValue(effectNote?.value ?? '');
    }, [store.activeId]);

    return (
        <div className="page">
            <div className="header">
                <div>
                    <MenuOutlined
                        className="folder-icon"
                        onClick={() => setFolder(!folder)}
                    />

                    <span className="filter-name">便签</span>

                    <Button
                        type="primary"
                        size="small"
                        shape="round"
                        className="new-btn"
                        onClick={newNote}
                    >
                        <span style={{ fontWeight: 'bold' }}>+</span>新建
                    </Button>
                </div>

                <Input
                    style={{ width: inputWidth, borderRadius: 20 }}
                    placeholder="搜索便签"
                    onFocus={() => setInputWidth(240)}
                    onBlur={() => setInputWidth(180)}
                    prefix={<SearchOutlined />}
                />
            </div>

            <div className="content">
                <div
                    className="category"
                    style={{
                        width: folder ? 0 : 150,
                    }}
                >
                    <ul className="category-list">
                        <li
                            className={clsx({
                                checked: store.category === 'all',
                            })}
                        >
                            <FileTextOutlined />
                            <span className="category-item__txt">全部便签</span>
                        </li>
                        {CATEGORY_OPTIONS.map(item => (
                            <li key={item.name}>
                                <span
                                    className="circle"
                                    style={{ background: item.color }}
                                ></span>
                                <span className="category-item__txt">
                                    {item.name}
                                </span>
                            </li>
                        ))}
                        <li>
                            <DeleteOutlined />
                            <span className="category-item__txt">回收站</span>
                        </li>
                    </ul>
                </div>

                {effectNote && (
                    <>
                        {/* list */}
                        <div className="note-list">
                            <List
                                itemLayout="vertical"
                                size="default"
                                dataSource={store.list}
                                renderItem={item => (
                                    <List.Item
                                        className="note"
                                        style={{
                                            background:
                                                store.activeId === item.id
                                                    ? item.note.category
                                                    : '',
                                        }}
                                        key={item.id}
                                        extra={
                                            item.image ? (
                                                <div
                                                    className="note__item--extra"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                    }}
                                                ></div>
                                            ) : null
                                        }
                                        onClick={() => active(item.id)}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <span
                                                    className="circle"
                                                    style={{
                                                        background:
                                                            item.note.category,
                                                    }}
                                                ></span>
                                            }
                                            title={
                                                <span className="note-title">
                                                    {item.title}
                                                </span>
                                            }
                                            description={
                                                <p className="note-desc">
                                                    <span>
                                                        {timeToNormalStr(
                                                            item.note.createTime
                                                        )}
                                                    </span>
                                                    <span
                                                        style={{
                                                            marginLeft: '8px',
                                                        }}
                                                    >
                                                        {item.description}
                                                    </span>
                                                </p>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>

                        {/* editor */}
                        <div className="editor">
                            <Editor
                                timestamp={effectNote.note.createTime}
                                value={value}
                                category={effectNote.note.category}
                                onChange={v => {
                                    effectNote.ot(v);
                                    setValue(v);
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
