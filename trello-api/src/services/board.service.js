import { BoardModel } from '~/models/board.model';

const createNew = async (data) => {
    try {
        const createdBoard = await BoardModel.createNew(data);
        const getNewBoard = await BoardModel.findOneById(createdBoard.insertedId.toString());
        return getNewBoard;
    } catch (error) {
        throw new Error(error);
    }
};

export const BoardService = { createNew };
