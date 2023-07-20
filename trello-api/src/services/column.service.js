import { BoardModel } from '~/models/board.model';
import { CardModel } from '~/models/card.model';
import { ColumnModel } from '~/models/column.model';

const createNew = async (data) => {
    try {
        const createdColumn = await ColumnModel.createNew(data);
        const getNewColumn = await ColumnModel.findOneById(createdColumn.insertedId.toString());
        getNewColumn.card = [];

        await BoardModel.pushColumnOrder(getNewColumn.boardId.toString(), getNewColumn._id.toString());

        return getNewColumn;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: Date.now(),
        };

        if (updateData._id) delete updateData._id;
        if (updateData.cards) delete updateData.cards;

        const updatedColumn = await ColumnModel.update(id, updateData);

        if (updateData._destroy) {
            CardModel.deleteMany(updatedColumn.cardOrder);
        }

        return updatedColumn;
    } catch (error) {
        throw new Error(error);
    }
};

export const ColumnService = { createNew, update };
