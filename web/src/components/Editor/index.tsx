import React from 'react';
import E from 'wangeditor';
import { CATEGORY_OPTIONS } from '../../page/constans';
import { timeToNearDayStr } from '../../utils/date';
import './index.less';

interface Props {
    value?: string;
    timestamp?: number;
    onChange?: (value: string) => void;
    category?: string;
}

export default class Editor extends React.PureComponent<Props> {
    contentRef = React.createRef<HTMLDivElement>();
    toolRef = React.createRef<HTMLDivElement>();
    editor: E | undefined;
    cacheValue = this.props.value || '';

    componentDidMount() {
        if (this.contentRef.current && this.toolRef.current) {
            const editor = new E(this.toolRef.current, this.contentRef.current);

            editor.config.showFullScreen = false;
            editor.config.menus = ['todo', 'image'];
            editor.txt.html(this.props.value ?? '');
            editor.config.onchange = (v: string) => {
                if (v === this.cacheValue) {
                    return;
                }

                this.props.onChange?.((this.cacheValue = v));
            };

            editor.create();
            this.editor = editor;
        }
    }

    getSnapshotBeforeUpdate(prevProps: Props) {
        if (
            prevProps.value !== this.props.value &&
            this.props.value !== this.cacheValue &&
            this.editor !== undefined
        ) {
            this.editor.txt.html((this.cacheValue = this.props.value || ''));
            this.editor.selection.moveCursor(this.editor.$textElem.elems[0]);
        }

        return null;
    }

    componentDidUpdate() {}

    componentWillUnmount() {
        this.editor?.destroy();
    }

    render() {
        const [tip, date] = timeToNearDayStr(
            this.props.timestamp || Date.now()
        );

        return (
            <>
                <div className="editor__menu">
                    <div className="editor__menu-category">
                        {CATEGORY_OPTIONS.map(item => (
                            <span
                                className="editor__menu-category--item"
                                key={item.color}
                                style={{
                                    background: item.color,
                                    borderColor:
                                        this.props.category ?? 'transparent',
                                }}
                            ></span>
                        ))}
                    </div>

                    <span className="editor__menu-line"></span>

                    <div ref={this.toolRef}></div>

                    <div className="editor__menu-side"></div>
                </div>

                <div className="editor__note-time">
                    <span className="editor__note-time--day-tip">{tip}</span>{' '}
                    <span>{date}</span>
                </div>

                <div
                    ref={this.contentRef}
                    style={{ height: 'calc(100% - 62px)' }}
                ></div>
            </>
        );
    }
}
