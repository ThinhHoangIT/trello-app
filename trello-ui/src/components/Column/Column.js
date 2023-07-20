import React, { useEffect, useRef, useState } from 'react';
import { Container, Draggable } from '@edorivai/react-smooth-dnd';
import { Button, Dropdown, Form } from 'react-bootstrap';

import './Column.scss';
import Card from '../Card/Card';
import ConfirmModal from '../common/ConfirmModal';
import { MODAL_ACTION_CONFIRM } from '~/utilities/constants';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { mapOrder } from '~/utilities/sorts';
import { selectAllInlineText } from '~/utilities/contentEditable';
import { cloneDeep } from 'lodash';
import { createNewCard, updateColumn } from '~/actions/ApiCall';

function Column(props) {
    const { column, onCardDrop, onUpdateColumnState } = props;
    const cards = mapOrder(column.cards, column.cardOrder, '_id');

    const [showModal, setShowModal] = useState(false);
    const [columnTitle, setColumnTitle] = useState('');
    const [newCardTitle, setNewCardTitle] = useState('');
    const [isOpenAddCard, setIsOpenAddCard] = useState(false);

    const newCardTitleRef = useRef(null);

    useEffect(() => {
        setColumnTitle(column.title);
    }, [column.title]);

    useEffect(() => {
        if (newCardTitleRef.current) {
            newCardTitleRef.current.focus();
            newCardTitleRef.current.select();
        }
    }, [isOpenAddCard]);

    const toggleOpenAddCard = () => {
        setIsOpenAddCard(!isOpenAddCard);
    };

    const onOpenAddCard = () => {
        if (!isOpenAddCard) {
            setIsOpenAddCard(!isOpenAddCard);
        }
    };

    const onChangeCardTitle = (e) => {
        setNewCardTitle(e.target.value);
    };

    const addNewCard = () => {
        if (!newCardTitle || !newCardTitle.trim()) {
            newCardTitleRef.current.focus();
            return;
        }

        const cardToAdd = {
            boardId: column.boardId,
            columnId: column._id,
            title: newCardTitle.trim(),
        };

        createNewCard(cardToAdd).then((card) => {
            let newColumn = cloneDeep(column);
            newColumn.cards.push(card);
            newColumn.cardOrder.push(card._id);

            onUpdateColumnState(newColumn);

            setNewCardTitle('');
            toggleOpenAddCard(!isOpenAddCard);
        });
    };

    const onChangeColumnTitle = (e) => {
        setColumnTitle(e.target.value);
    };

    const onBlurColumnTitle = (e) => {
        e.target.blur();
        if (columnTitle !== column.title) {
            const newColumn = { ...column, title: columnTitle };

            updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
                updatedColumn.cards = newColumn.cards;
                onUpdateColumnState(updatedColumn);
            });
        }
    };

    const toggleShowModal = () => {
        setShowModal(!showModal);
    };

    const onModalAction = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = { ...column, _destroy: true };
            updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
                // updatedColumn.cards = newColumn.cards;
                onUpdateColumnState(updatedColumn);
            });
        }
        toggleShowModal();
    };

    return (
        <div className="column">
            <header className="column-drag-handle">
                <div className="column-title">
                    <Form.Control
                        size="sm"
                        type="text"
                        spellCheck="false"
                        value={columnTitle}
                        onChange={onChangeColumnTitle}
                        onBlur={onBlurColumnTitle}
                        onClick={selectAllInlineText}
                        onMouseDown={(e) => e.preventDefault()}
                        onKeyDown={(e) => e.key === 'Enter' && onBlurColumnTitle(e)}
                        className="content-editable"
                    />
                </div>
                <div className="column-dropdown-action">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={onOpenAddCard}>Add card</Dropdown.Item>
                            <Dropdown.Item onClick={toggleShowModal}>Remove column</Dropdown.Item>
                            <Dropdown.Item>Move all card in this column </Dropdown.Item>
                            <Dropdown.Item>Archive all card in this column </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className="card-list">
                <Container
                    groupName="columns"
                    onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
                    getChildPayload={(index) => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview',
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards?.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>
                    ))}
                </Container>
                {isOpenAddCard && (
                    <div className="add-new-card">
                        <Form.Control
                            value={newCardTitle}
                            ref={newCardTitleRef}
                            onChange={onChangeCardTitle}
                            onKeyDown={(e) => e.key === 'Enter' && addNewCard()}
                            size="sm"
                            as="textarea"
                            rows={3}
                            placeholder="Enter a title for this card..."
                            className="new-card-input"
                            autoFocus
                        />
                    </div>
                )}
            </div>
            <footer>
                {isOpenAddCard && (
                    <div className="df-row">
                        <Button variant="success" size="sm" onClick={addNewCard}>
                            Add card
                        </Button>
                        <span className="cancel-icon" onClick={toggleOpenAddCard}>
                            <i className="fa fa-close icon"></i>
                        </span>
                    </div>
                )}
                {!isOpenAddCard && (
                    <div className="footer-actions" onClick={toggleOpenAddCard}>
                        <i className="fa fa-plus icon" /> Add another card
                    </div>
                )}
            </footer>
            <ConfirmModal
                show={showModal}
                onAction={onModalAction}
                title="Remove column"
                content={`Are you sure you want to remove <strong>${column.title}</strong>!<br/> All related cards will also be remove`}
            />
        </div>
    );
}

export default Column;
