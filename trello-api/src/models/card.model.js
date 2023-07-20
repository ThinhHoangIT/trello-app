import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '~/config/mongodb';

const cardCollectionName = 'cards';
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(30).trim(),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(cardCollectionName)
            .findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const createNew = async (data) => {
    try {
        const validateValue = await validateSchema(data);
        const insertValue = {
            ...validateValue,
            boardId: new ObjectId(validateValue.boardId),
            columnId: new ObjectId(validateValue.columnId),
        };
        const result = await getDB().collection(cardCollectionName).insertOne(insertValue);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updatedData = { ...data };
        if (data.boardId) updatedData.boardId = new ObjectId(data.boardId);
        if (data.columnId) updatedData.columnId = new ObjectId(data.columnId);
        const result = await getDB()
            .collection(cardCollectionName)
            .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedData }, { returnDocument: 'after' });

        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteMany = async (ids) => {
    try {
        const transformIds = ids.map((i) => new ObjectId(i));
        const result = await getDB()
            .collection(cardCollectionName)
            .updateMany({ _id: { $in: transformIds } }, { $set: { _destroy: true } });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

export const CardModel = { cardCollectionName, createNew, update, deleteMany, findOneById };
