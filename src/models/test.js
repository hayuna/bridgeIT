import { Schema, model } from 'mongoose';
import { ensureFieldUniquity } from './utils';
import { Test } from 'mocha';

const TestSchema = new Schema({
    name: { type: String },
    uniqueValuesField: { type: String, required: true, unique: true }
});

TestSchema.pre('save', true, ensureFieldUniquity('uniqueValuesField'));

export default model('Test', TestSchema);