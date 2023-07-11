import React, { useEffect, useRef, useState } from 'react';
import { Container as BootstrapContainer, Row, Col, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container, Draggable } from '@edorivai/react-smooth-dnd';
import { isEmpty } from 'lodash';

import 'bootstrap/dist/css/bootstrap.min.css';
import './BoardContent.scss';
import Column from '../Column/Column';

import { initialData } from '~/actions/initialData';
import { mapOrder } from '~/utilities/sorts';
import { applyDrag } from '~/utilities/dragDrop';

function BoardContent() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState({});
    const [columnTitle, setColumnTitle] = useState('');
    const [isOpenAddColumn, setIsOpenAddColumn] = useState(false);

    const toggleOpenAddColumn = () => {
        setIsOpenAddColumn(!isOpenAddColumn);
    };

    const columnInputRef = useRef();

    useEffect(() => {
        if (columnInputRef && columnInputRef.current) {
            columnInputRef.current.focus();
            columnInputRef.current.select();
        }
    }, [isOpenAddColumn]);

    useEffect(() => {
        const boardFromDB = initialData.boards.find((b) => b.id === 'board-1');
        if (boardFromDB) {
            setBoard(boardFromDB);

            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
        }
    }, []);

    if (isEmpty(board)) {
        return (
            <div className="not-found" style={{ color: 'white' }}>
                Board not found!
            </div>
        );
    }

    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns, dropResult);

        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map((c) => c.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    };

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns];
            let currentColumn = newColumns.find((c) => c.id === columnId);

            currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
            currentColumn.cardOrder = currentColumn.cards.map((c) => c.id);

            setColumns(newColumns);
        }
    };

    const onChangeAddColumn = (e) => {
        setColumnTitle(e.target.value);
    };

    const addColumn = (e) => {
        if (!columnTitle) {
            columnInputRef.current.focus();
            return;
        }

        const columnToAdd = {
            id: Math.random().toString(36).substring(2, 5),
            boardId: board.id,
            title: columnTitle.trim(),
            cardOrder: [],
            cards: [],
        };

        const newColumns = [...columns];
        newColumns.push(columnToAdd);

        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map((c) => c.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
        setColumnTitle('');
        toggleOpenAddColumn();
    };

    const onUpdateColumn = (column) => {
        const columnId = column.id;
        const newColumns = [...columns];
        const columnIndex = newColumns.findIndex((i) => i.id === columnId);

        if (column._destroy) {
            newColumns.splice(columnIndex, 1);
        } else {
            newColumns.splice(columnIndex, 1, column);
        }

        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map((c) => c.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    };

    return (
        <div className="board-content">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={(index) => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview',
                }}
            >
                {columns?.map((column, index) => (
                    <Draggable key={index}>
                        <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
                    </Draggable>
                ))}
            </Container>
            <BootstrapContainer>
                {!isOpenAddColumn && (
                    <Row>
                        <Col className="add-new-column" onClick={toggleOpenAddColumn}>
                            <i className="fa fa-plus icon" /> Add another column
                        </Col>
                    </Row>
                )}
                {isOpenAddColumn && (
                    <Row>
                        <Col className="add-column">
                            <Form.Control
                                value={columnTitle}
                                onChange={onChangeAddColumn}
                                onKeyDown={(e) => e.key === 'Enter' && addColumn()}
                                ref={columnInputRef}
                                size="sm"
                                type="text"
                                placeholder="Enter column title..."
                                className="add-column-input"
                                autoFocus
                            />
                            <div className="df-row">
                                <Button variant="success" size="sm" onClick={addColumn}>
                                    Add column
                                </Button>
                                <span className="cancel-icon">
                                    <i className="fa fa-close icon" onClick={toggleOpenAddColumn}></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                )}
            </BootstrapContainer>
        </div>
    );
}

export default BoardContent;
